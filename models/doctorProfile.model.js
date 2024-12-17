const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema(

    {
        profilePhoto: {
            type: String,
            required: false,

        },
        title: {
            type: String,
            required: true,

        },
        speciality: {
            type: String,
            required: false,

        },
        subSpeciality: {
            type: String,
            required: false,

        },
        diseaseSpecialist: [{
            type: String,
            required: true,

        }],
        attentionType: [{
            type: String,
            required: true
        }],
        background: {
            type: String,
            required: true

        },
        healthCareCenter: [{
            type: String,
            required: true
        }],
        region: {
            type: String,
            required: true
        },
        comuna: {
            type: String,
            required: true
        },
        idNumber: {
            type: Number,
            required: true
        },
        prevision: [{
            type: String,
            required: true
        }],

        doctor: {
            doctorName: {
                type: String,
                required: true

            }, doctorLastName: {
                type: String,
                required: true

            },
            age: {
                type: Number,
                required: false
            }

        },

        about: {
            body: {
                type: String,
                required: false
            }
        },

        investigationAndProjects: [{
            investigations: {
                date: Date,
                title: String,
                body: String,

            },
            projects: {
                date: Date,
                title: String,
                body: String,
            }
        }]

    },
    {
        timestamps: true

    }

);

const DoctorProfile = mongoose.model('DoctorProfile', DoctorSchema);

module.exports = DoctorProfile;