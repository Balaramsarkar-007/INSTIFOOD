const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { use } = require('./shop');

// add address
router.post('/user/account/add-address', async (req, res, next) => {
    try {
        const {userId, userAddress} = req.body;
        console.log(req.body);

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.addresses.push(userAddress);
        const updatedUser = await user.save();
        console.log(updatedUser);
        res.status(200).json({status : true, message : "Address save sucessfully", user: updatedUser });    
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }

});

// delete address
router.delete('/user/account/delete-address', async (req, res, next) => {
    try {
        const { userId, addressId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
        const updatedUser = await user.save();
        res.status(200).json({ status: true, message: "Address deleted successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }
})


module.exports = router;