const DoctorProfile = require('../models/doctorProfile.model')



const getDoctors = async (req = request, res = response) => {
    //controller function:
    try {
        const { q, nombre, apikey, page = 1, limit } = req.query; //http://localhost:8000/api/doctors?q=hola&limit=1&page=1

        const doctors = await DoctorProfile.find({});
        res.status(200).json(
            {
            doctors, //revisar doctor
            q,
            nombre,
            apikey,
            page,
            limit
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
        const doctor = await DoctorProfile.create(req.body);
        res.status(200).json(doctor);
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
    getDoctors, getSingleDoctor, createDoctorProfile, updateDoctorProfile, deleteDoctorProfile
}