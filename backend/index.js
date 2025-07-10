const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


require('dotenv').config();

const app = express();
const port = 8000;

const User = require('./models/User.js');
const userAuthRoute = require('./auth/userAuth.js');
const shopRoutes = require('./routes/shop.js');
const userRoutes = require('./routes/user.js');
const orderRouetes = require('./routes/order.js');
const ownerAuthRoute = require('./auth/ownerAuth.js');
 
// Middleware
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
const mongo_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/instifood';
main()
.then( () => {
    console.log("connection is sucessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

app.use('/', userAuthRoute);
app.use('/', shopRoutes);
app.use('/', userRoutes);
app.use('/', orderRouetes);
app.use('/', ownerAuthRoute);

// Routes
app.get('/', async (req, res) => {
    // const ph = 1234567898;
    // let user = new User({ph});
    // let newUser = await user.save();
    // console.log(newUser);
    res.send('Welcome to the API');
});

app.get('/users',  (req, res) => {
    res.cookie('userData', JSON.stringify({
        name: "balaram",
        role: "developer",
    }), {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict'
    });
    res.json("sending cookies");
});

app.get("/cok", (req, res) => {
    console.log(req.cookies.userData);
    res.send("sucess");
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});