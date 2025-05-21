const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopOwner',
    },
    timeStamps: {
        type: Date,
        default: Date.now,
    }
});

const MenuItems = mongoose.model('MenuItems', menuItemsSchema);
module.exports = MenuItems;