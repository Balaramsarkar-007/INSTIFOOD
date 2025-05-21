const mongoose = require('mongoose');
const Order = require('./Order');

const userSchema = new mongoose.Schema({
    ph : {
        type: String,
        required: true,
        unique: true,
    },
    addresses : [
        {
            name : {
                type: String,
                required: true,
            },
            phone : {
                type: String,
                required: true,
            },
            email : {
                type: String,
            },
            address : {
                type: String,
                required: true,
            },
            hostelNo : {
                type: String,
                // required: true,
            },
            roomNo : {
                type: String,
                // required: true,
            },
            pin : {
                type: String,
                required: true,
            },
            city : {
                type: String,
                required: true,
            },
            state : {
                type: String,
                required: true,
            },
        },
    ],
   orders : [
        {
           // orderId : {
            //     type: String,
            // }
            type: String,
        }
    ],
    timeStamps: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;