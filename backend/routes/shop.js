const express = require("express");
const router = express.Router();
const Shops = require("../models/ShopOwner");
const MenuItems = require("../models/MenuItems");
const mongoose = require("mongoose");
const { storage } = require("../middleware/cloudinaryConfig");
const multer  = require('multer')
const upload = multer({storage: storage});
const {validateOwner} = require('../middleware/manageTocken')

// get all shops
router.get("/", async (req, res, next) => {
    const shops = await Shops.find();
    res.status(200).json({ shops });
})

// get a shop items
router.get("/shop/:id", async (req, res, next) => {
    const shopItemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(shopItemId)) {
        return res.status(400).json({staus : false,  error: 'Invalid shop ID format' });
      }
    const items = await MenuItems.find({ shopId: shopItemId });
    if(items.length === 0) {
        return res.status(404).json({ message: "No items found" });
    }
    res.status(200).json({ items });
})

router.post("/api/shop/add-shop", validateOwner, upload.single('shopImage'), async (req, res, next) => {
    try {

        const shop = await Shops.findById(req.body.id);
        console.log(shop);
        if(!shop) {
           return res.status(400).json({message : "something went wrong"});
        }

        if(shop.ph != req.user.userId) {
            return res.status(401).json({sucess : false, message : "Unauthorized"});
        }
        
        shop.name = req.body.name;
        shop.shopName = req.body.shopName;
        shop.shopAddress = req.body.shopAddress;
        shop.shopImage.url = req.file.path;
        shop.shopImage.fileName = req.file.filename;

        const savedShop = await shop.save();
        console.log(savedShop);
        res.json({success : true, shopDetails : savedShop});
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.put('/api/shop/update-shop', validateOwner, upload.single('shopImage'), async (req, res, next) => {
    try {
        const shop = await Shops.findById(req.body.id);
        if (!shop) {
            return res.status(404).json({ success: false, message: "Shop not found" });
        }

        if(shop.ph != req.user.userId) {
            return res.status(401).json({sucess : false, message : "Unauthorized"});
        }

        // Update shop details
        shop.name = req.body.name || shop.name;
        shop.shopName = req.body.shopName || shop.shopName;
        shop.shopAddress = req.body.shopAddress || shop.shopAddress;

        // If there's a new image
        if (req.file) {
            shop.shopImage.url = req.file.path;
            shop.shopImage.fileName = req.file.filename;
        }

        const updatedShop = await shop.save();
        console.log(updatedShop);
        res.status(200).json({ success: true, shopDetails: updatedShop });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating shop" });
    }
});

module.exports = router;