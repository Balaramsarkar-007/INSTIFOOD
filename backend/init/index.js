const mongoose = require('mongoose');
const {menuItemsData, shopData} = require('./sampleData');
const MenuItems = require('../models/MenuItems');
const ShopOwner = require('../models/ShopOwner');

main()
.then( () => {
    console.log("connection is sucessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/instifood');
}

let initDB = async () => {
    await MenuItems.deleteMany({});
    const data = menuItemsData.map( (obj) => ({ ...obj, shopId : "679ce3487d6443c00c654e6b"}));
    await MenuItems.insertMany(data);
    console.log("inser data in DB is sucessfull");
}

// let initDB = async () => {
//   await ShopOwner.deleteMany({});
//   const data = shopData.map( (obj) => ({ ...obj}));
//   await ShopOwner.insertMany(data);
//   console.log("inser data in DB is sucessfull");
// }



initDB();