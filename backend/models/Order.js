const mongoose = require('mongoose');
const ShopOwner = require('./ShopOwner');

const orderSchema = new mongoose.Schema({
    orderId : {
        type: String,
        required: true,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ShopOwner,
    },
    orderStatus : [
        {
            statusType : {
                type : String,
                required : true,
            },
            status : {
                type : String,
                required : true,
            },
            updatedAt : {
                type : Date,
            },   
        },
    ],
    items : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'MenuItems',
            },
            quantity : {
                type : Number,
                required : true,
            },
            price : {
                type : Number,
                required : true,
            },
            name : {
                type : String,
                required : true,
            },
            image_url : {
                type : String,
            },
            timeStamp : {
                type : Date,
                default : Date.now,
            }
        }
    ],
    amount : {
        type : Number,
        required : true,
    },
    paymentMethod : {
        type : String,
        required : true,
    },
    transationId : {
        type : String,
    },
    orderAddress : {
        name : {
            type : String,
            required : true,
        },
        phone : {
            type : String,
            required : true,    
        },
        address : {
            type : String,
            required : true,
        },
        email : {
            type : String,
        },
        hostelNo : {
            type : String,
        },
        roomNo : {
            type : String,
        },
        pin : {
            type : Number,
            required : true,
        },
        city : {
            type : String,
            required : true,
        },
        state : {
            type : String,
            required : true,
        },
    },
    deliveryType : {
        type : String,
        required : true,
    },
    timeStamp : {
        type : Date,
        default : Date.now,
    }
});

const Order = mongoose.model('Order', orderSchema); 
module.exports = Order;