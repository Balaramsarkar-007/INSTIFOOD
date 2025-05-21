const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
const ShopOwner = require('../models/ShopOwner');
const { validateUser} = require('../middleware/manageTocken');
const {generateReadableOrderId} = require('../heplerFun.js/orderidGen');

router.post('/api/user/order', validateUser,  async (req, res) => {
  try {
    const userDetails = await User.findById(req.body.userId);
    const shopOwner = await ShopOwner.findById(req.body.ownerId);
    const currentTime = new Date();
    if(userDetails.ph != req.user.userId) {
      return res.status(401).json({sucess : false, message : "Unauthorized"});
    }
    
    req.body.items = req.body.items.map((item) => ({
      ...item,
      productId: item._id
    }));
    const order = new Order(
      {...req.body, 
        orderId : generateReadableOrderId(),
        timeStamp : currentTime,
        orderStatus : [{
          statusType: "ORDER ACCEPTED",
          status: "PENDING",
          updatedAt : currentTime,
        }]
       });
    const savedOrder = await order.save();

    userDetails.orders.push(savedOrder.orderId);
    shopOwner.orders.push(savedOrder.orderId);

    await userDetails.save();
    await shopOwner.save();
    res.status(200).json({success : true, order : savedOrder});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Get all order lists
router.get("/api/user/order/orderlist", validateUser, async (req, res, next) => {
    try {
      const user = await User.findOne({ph: req.user.userId});
      const orders = await Order.find({orderId : { $in : user.orders}}).populate('ownerId', 'shopName shopImage');
      if(!orders) {
      return res.status(404).json({success : false, message : "No orders found"});
       }
       const orderList = orders.reverse();
    res.status(200).json({success : true, orderList : orderList});
    } catch (error) {
      next(error);
    }
})


// Get order history
router.get('/api/user/order/:id', validateUser, async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const order = await Order.findById(id).populate('ownerId', 'shopName shopImage');
    if(!order) {
      return res.status(404).json({success : false, message : "No order found"});
    }
    res.status(200).json({success : true, orderedData : order});
  } catch (error) {
    next(error);
  }
})


// update order status
router.put('/api/user/order/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    order.orderStatus.push(status);
    const updatedOrder = await order.save();
    console.log(updatedOrder);
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status
  }
});
module.exports = router;