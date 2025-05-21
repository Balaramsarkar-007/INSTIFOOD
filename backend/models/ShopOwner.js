const mongoose = require('mongoose');

const shopOwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    ph : {
        type: String,
        unique: true,
        required : true,
    },
    shopName: {
        type: String,
        // required: true,
    },
    shopAddress: {
        type: String,
        // required: true,
    },  
    shopImage: {
        url : String,
        fileName : String,
    },
    orders : [
        {
            // orderId : {
            //     type: String,
            // }
            type: String,
        },
    ],
    timeStamps: {
        type: Date,
        default: Date.now,
    }
});

const ShopOwner = mongoose.model('ShopOwner', shopOwnerSchema);
module.exports = ShopOwner;