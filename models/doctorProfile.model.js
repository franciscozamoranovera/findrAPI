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
        speciality: [{
            type: String,
            required: false,

        }],
        subSpeciality: [{
            type: String,
            required: false,

        }],
        diseaseSpecialist: [{
            type: String,
            required: true

        }],
        specialityAndBackground: [{
            type: String,
            required: false,

        }],
        attentionType: [{
            type: String,
            required: false
        }],
        background: {
            type: String,
            required: true

        },
        healthCareCenter: [{
            type: {
                type: String,
                enum: ['private', 'nonPrivate'],
                required: true,
                default: "No informado"
            },
            name: {
                type: String,
                required: false,
                default: "No informado"
            },
            address: {
                type: String,
                required: false,
                default: "No informado"
            },
            comuna: {
                type: String,
                required: false,
                default: "No informado"
            },
            fonasa: {
                type: Boolean,
                required: false,
                default: "No informado"
            },
            isapre: {
                type: Boolean,
                required: false,
                default: "No informado"

            },
            fonasaPrice: {
                type: Number,
                required: false,
                default: "No informado"
            },
            isaprePrice: {
                type: Number,
                required: false,
                default: "No informado"
            }
        }],
        region: {
            type: String,
            required: false
        },
        comuna: [{
            type: String,
            required: false
        }],
        idNumber: {
            type: Number,
            required: true,
            unique: true
        },
        prevision: [{
            type: String,
            required: false,
            default: "No informado"
        }],


        doctorName: {
            type: String,
            required: true

        },

        doctorLastName: {
            type: String,
            required: false

        },

        run: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: false
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
        }],

        awardsAndDistinctions: [{
            type: {
                type: String,
                enum: ['award', 'distinction'],
                required: false,
                default: "No informado"
            },
            date: Date,
            title: String,
            body: String,
        }],

        languages: [{
            type: String
        }],

        jobExperience: [{
            type: {
                type: String,
                enum: ['experience', 'other'],
                required: false,
                default: "No informado"
            },
            initDate: {
                type: Date,
            },
            endDate: {
                type: Date,
            },
            title: {
                type: String
            },
            body: {
                type: String
            }
        }]

    },
    {
        timestamps: true

    }

);

const DoctorProfile = mongoose.model('DoctorProfile', DoctorSchema);

module.exports = DoctorProfile;