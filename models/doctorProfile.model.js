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
            private: {
                name: {
                    type: String,
                    required: false
                },
                address: {
                    type: String,
                    required: false
                },
                comuna: {
                    type: String,
                    required: false
                },
                fonasa: {
                    type: Boolean,
                    require: false
                },
                isapre: {
                    type: Boolean,
                    require: false
                },
                fonasaPrice: {
                    type: Number,
                    require: false
                },
                isaprePrice: {
                    type: Number,
                    require: false
                }
            },
            nonPrivate: {
                name: {
                    type: String,
                    required: false
                },
                address: {
                    type: String,
                    required: false
                },
                comuna: {
                    type: String,
                    required: false
                },
                fonasa: {
                    type: Boolean,
                    require: false
                },
                fonasaPrice: {
                    type: Number,
                    require: false
                },
                isaprePrice: {
                    type: Number,
                    require: false
                }
            }


        }],
        region: {
            type: String,
            required: false
        },
        comuna: {
            type: String,
            required: false
        },
        idNumber: {
            type: Number,
            required: true,
            unique: true
        },
        prevision: [{
            type: String,
            required: false
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
        }]

    },
    {
        timestamps: true

    }

);

const DoctorProfile = mongoose.model('DoctorProfile', DoctorSchema);

module.exports = DoctorProfile;