const mongoose = require('mongoose');
const DoctorProfile = require('../models/doctorProfile.model')



const getDoctors = async (req, res) => {
    //controller function:
    try {
        const { doctorName, speciality, subSpeciality, diseaseSpecialist, region, comuna, page = 1, limit = 10 } = req.query;

        //Filter object (query Object in MongoDB)
        const filter = {};

        //Add each parameter to the filter if it exists in the req.
        if(doctorName) filter.doctorName = {$regex: doctorName, $options: 'i'} //regex: operator in MDB, allow partial matching. $options: makes case sensitive.
        if(speciality) filter.speciality = {$regex: speciality, $options:'i'};
        if(subSpeciality) filter.subSpeciality ={$regex: subSpeciality, $options:'i'};
        if(diseaseSpecialist) filter.diseaseSpecialist = {$regex: diseaseSpecialist, $options:'i'};
        if(region) filter.region = region;
        if(comuna) filter.comuna = comuna;
        
        const skip = (page - 1) * limit; 
        const limitValue = parseInt(limit); //parseInt ensure the limit is a number, not string.

        const total = await DoctorProfile.countDocuments(filter);

        const doctors = await DoctorProfile.find(filter).skip(skip).limit(limitValue);
 
        res.status(200).json(
            {
                doctors,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total/limitValue)
                }

               
            });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getQueryInputData = async (req, res) => {

    try {

        //Main filter using monsoose settings
        const doctors = await DoctorProfile.find({}, 'doctorName speciality subSpeciality diseaseSpecialist');


        // Helper functions

        //Delete duplicate words with accents, left the word with it.
        const normalizeForComparison = (text) => {
            if (typeof text !== 'string') return '';
            return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        };

        //Capitalize speciality, subSpeciality and diseaseSpecialist.
        const capitalizeFirstLetter = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        //Capitalize Names
        const capitalizeEachWord = (str) => {
            return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
        };

        // Function to filter duplicates keeping accented versions.
        const filterDuplicatesKeepingAccents = (items) => {
            const seen = new Map();


            // First pass: store all items with their normalized versions
            items.forEach(item => {
                const normalized = normalizeForComparison(item);
                if (!seen.has(normalized) || item.match(/[\u0300-\u036f]/)) {
                    seen.set(normalized, item);
                }
            });

            return Array.from(seen.values());
        };



        // Extract unique values from each field across all doctors
        const uniqueDoctorNames = filterDuplicatesKeepingAccents(
            doctors.map(doc => capitalizeEachWord(doc.doctorName || ''))
        );

        const uniqueSpecialities = filterDuplicatesKeepingAccents(
            doctors.flatMap(doc =>
                Array.isArray(doc.speciality)
                    ? doc.speciality.map(s => capitalizeFirstLetter(s || ''))
                    : capitalizeFirstLetter(doc.speciality || '')
            )
        );

        const uniqueSubSpecialities = filterDuplicatesKeepingAccents(
            doctors.flatMap(doc =>
                Array.isArray(doc.subSpeciality)
                    ? doc.subSpeciality.map(s => capitalizeFirstLetter(s || ''))
                    : capitalizeFirstLetter(doc.subSpeciality || '')
            )
        );

        const uniqueDiseaseSpecialists = filterDuplicatesKeepingAccents(
            doctors.flatMap(doc =>
                Array.isArray(doc.diseaseSpecialist)
                    ? doc.diseaseSpecialist.map(s => capitalizeFirstLetter(s || ''))
                    : capitalizeFirstLetter(doc.diseaseSpecialist || '')
            )
        );

        // Combine all unique values
        const allUniqueData = {
            doctorNames: uniqueDoctorNames.filter(Boolean),
            specialities: uniqueSpecialities.filter(Boolean),
            subSpecialities: uniqueSubSpecialities.filter(Boolean),
            diseaseSpecialists: uniqueDiseaseSpecialists.filter(Boolean)

            /* Note:
             1. "doctorNames:", "specialities:.,..." are keys (property name).
             2. "uniqueDoctorNames.filter(Boolean)" are values.

            allUniqueData have all categorized.

            //Verbosely written:

            op1:
            uniqueDoctorNames.filter(name => Boolean(name))
            
            op2:
            uniqueDoctorNames.filter(name => name !== "" && name !== null && name !== undefine
            
            */

        };

        res.status(200).json(
            {
                allUniqueData
            })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


const getSingleDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await DoctorProfile.findById(id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
const createDoctorProfile = async (req, res) => {
    try {
        //Status
        console.log('MONGO DB connection state:', mongoose.connection.readyState)
        console.log('Received data:', JSON.stringify(req.body, null, 2));


        /*  if(!req.body.doctor || !req.body.doctor.doctorName) {
             console.log('Missing required fields');
             return res.status(400).json({
                 status: 'error',
                 message: 'Missing required fields in resquest'
             })
         }
  */
        console.log('Request body:', req.body); // Log incoming data

        const newDoctor = new DoctorProfile(req.body);
        const saveDoctor = await newDoctor.save();
        console.log('Saved Doctor:', saveDoctor); // Log saved data

        res.status(201).json(saveDoctor);


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const updateDoctorProfile = async (req, res) => {
    try {
        //destructuración
        const { id } = req.params;

        const doctor = await DoctorProfile.findByIdAndUpdate(id, req.body);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" })
        }

        //check if was edited
        const updatedDoctorProfile = await DoctorProfile.findById(id);
        res.status(200).json(updatedDoctorProfile);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
const deleteDoctorProfile = async (req, res) => {
    try {
        //destructuración
        const { id } = req.params;

        const doctor = await DoctorProfile.findByIdAndDelete(id);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" })
        }
        res.status(200).json({ message: "Doctor profile deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}




module.exports = {
    getDoctors, getSingleDoctor, createDoctorProfile, updateDoctorProfile, deleteDoctorProfile, getQueryInputData
}