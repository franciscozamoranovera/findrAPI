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

            phoneNumberOp1: {
                type: String,
                required: false,
            },
            phoneNumberOp2: {
                type: String,
                required: false,
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
            },
            isaprePrice: {
                type: Number,
                required: false,
            },
            particularPrevisionPrice: {
                type: Number,
                required: false,
            },
            note: {
                type: String,
                required: false
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
            type: {
                type: String,
                enum: ['investigation', 'project', 'No informado'],
                required: false,
                default: "No informado"
            },
            initDate: {
                type: Date,
                default: null
            },
            endDate: {
                type: Date,
                default: null
            },
            title: {
                type: String
            },
            body: {
                type: String
            }
        }],

        awardsAndDistinctions: [{
            type: {
                type: String,
                enum: ['award', 'distinction', 'No informado'],
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
                enum: ['experience', 'other', 'No informado'],
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