const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(

    {
        userProfile: [{
            userName: {
                type: String,
                required: true,

            },
            userLastName: {
                type: String,
                required: true,
            }
        }]
    },
    {
        timestamps: true

    }

);

const userReviews = mongoose.model('userReviews', UserSchema);

module.exports = userReviews;