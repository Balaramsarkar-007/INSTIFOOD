const menuItemsData = [
    // Detox Juice Category
    {
      name: "Flush Detox ",
      price: 50,
      image_url: "https://cdn.pixabay.com/photo/2016/08/23/15/52/fresh-juice-1614822_1280.jpg",
      category: "Detox Juice",
    },
    {
      name: "Skin Glow",
      price: 50,
      image_url: "https://cdn.pixabay.com/photo/2017/04/23/09/44/smoothie-2253423_1280.jpg",
      category: "Detox Juice",
    },
    {
      name: "Detox 1 (Fat Killer)",
      price: 50,
      image_url: "https://cdn.pixabay.com/photo/2018/02/23/19/23/smoothie-3176371_1280.jpg",
      category: "Detox Juice",
    },
    {
      name: "Detox 2 (Skin Detox)",
      price: 50,
      image_url: "https://cdn.pixabay.com/photo/2018/01/31/09/57/smoothie-3120355_1280.jpg",
      category: "Detox Juice",
    },
    {
      name: "Detox 3 (Vegetable Juice)",
      price: 50,
      image_url: "https://cdn.pixabay.com/photo/2020/06/08/16/49/juice-5275821_1280.jpg",
      category: "Detox Juice",
    },
  
    // Shot Juice Category
    {
      name: "Jamun Shot",
      price: 30,
      image_url: "https://cdn.pixabay.com/photo/2015/11/07/11/55/juice-1031271_1280.jpg",
      category: "Shot Juice"
    },
    {
      name: "Strawberry Shot",
      price: 30,
      image_url: "https://cdn.pixabay.com/photo/2018/05/07/00/34/drink-3379671_1280.jpg",
      category: "Shot Juice"
    },
    {
      name: "Guava Shot",
      price: 30,
      image_url: "https://cdn.pixabay.com/photo/2015/03/30/12/35/smoothie-698466_1280.jpg",
      category: "Shot Juice"
    },
    {
      name: "Special Guava Shot",
      price: 60,
      image_url: "https://cdn.pixabay.com/photo/2016/08/26/20/40/smoothie-1623079_1280.jpg",
      category: "Shot Juice"
    },
  
    // Fresh Juice Category
    {
      name: "Amla Juice",
      price: 35,
      image_url: "https://cdn.pixabay.com/photo/2016/10/09/14/00/vegetable-juice-1725835_1280.jpg",
      category: "Fresh Juice"
    },
    {
      name: "Apple Juice",
      price: 40,
      image_url: "https://cdn.pixabay.com/photo/2016/11/28/22/07/apple-juice-1866103_1280.jpg",
      category: "Fresh Juice"
    },
    {
      name: "Watermelon",
      price: 35,
      image_url: "https://cdn.pixabay.com/photo/2020/06/15/18/21/watermelon-juice-5302524_1280.jpg",
      category: "Fresh Juice"
    },
    {
      name: "Kiwi Orange",
      price: 60,
      image_url: "https://cdn.pixabay.com/photo/2018/03/07/08/07/juice-3205814_1280.jpg",
      category: "Fresh Juice"
    },
  
    // Continuing with representative selections for brevity - you can add more items following the same pattern
  
    // Milkshake Category
    {
      name: "Chocolate",
      price: 65,
      image_url: "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
      category: "Milkshake"
    },
    {
      name: "Strawberry",
      price: 65,
      image_url: "https://cdn.pixabay.com/photo/2020/05/12/16/59/smoothie-5163954_1280.jpg",
      category: "Milkshake"
    },
  
    // Falooda Category
    {
      name: "Rose Falooda",
      price: 70,
      image_url: "https://cdn.pixabay.com/photo/2019/11/09/17/02/falooda-4614450_1280.jpg",
      category: "Falooda"
    },
  
    // Mojito Category
    {
      name: "Virgin Mojito",
      price: 45,
      image_url: "https://cdn.pixabay.com/photo/2015/03/30/12/35/mojito-698499_1280.jpg",
      category: "Mojito"
    },
  
    // Summer Relief Category
    {
      name: "Nimbu Pani",
      price: 15,
      image_url: "https://cdn.pixabay.com/photo/2016/10/09/14/00/lemonade-1725834_1280.jpg",
      category: "Summer Relief"
    }
  ];

  const shopData = [
    {
      name: "John Smith",
      ph: "+91 9876543210",
      shopName: "Spice Paradise",
      shopAddress: "H1",
      shopImage: "https://cdn.pixabay.com/photo/2015/04/20/13/25/restaurant-731196_1280.jpg"
    },
    {
      name: "Priya Patel",
      ph: "+91 8765432109",
      shopName: "The Grand Thali",
      shopAddress: "H2",
      shopImage: "https://cdn.pixabay.com/photo/2017/09/23/12/40/india-2778840_1280.jpg"
    },
    {
      name: "Mohammed Khan",
      ph: "+91 7654321098",
      shopName: "Biryani House",
      shopAddress: "H3",
      shopImage: "https://cdn.pixabay.com/photo/2019/11/14/11/10/biryani-4625496_1280.jpg"
    },
    {
      name: "Rajesh Kumar",
      ph: "+91 6543210987",
      shopName: "South Indian Delight",
      shopAddress: "H4",
      shopImage: "https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_1280.jpg"
    },
    {
      name: "David Chen",
      ph: "+91 5432109876",
      shopName: "Chinese Wok",
      shopAddress: "H5",
      shopImage: "https://cdn.pixabay.com/photo/2020/04/29/03/30/chinese-food-5107130_1280.jpg"
    },
    {
      name: "Amit Shah",
      ph: "+91 4321098765",
      shopName: "Gujarati Kitchen",
      shopAddress: "H6",
      shopImage: "https://cdn.pixabay.com/photo/2017/09/09/12/09/india-2731812_1280.jpg"
    },
    {
      name: "Sarah Wilson",
      ph: "+91 3210987654",
      shopName: "Continental Corner",
      shopAddress: "H7",
      shopImage: "https://cdn.pixabay.com/photo/2015/03/26/09/39/restaurant-690569_1280.jpg"
    },
    {
      name: "Ravi Verma",
      ph: "+91 2109876543",
      shopName: "Punjab Dhaba",
      shopAddress: "H8",
      shopImage: "https://cdn.pixabay.com/photo/2020/06/08/16/49/foods-5275181_1280.jpg"
    },
    {
      name: "Anita Desai",
      ph: "+91 1098765432",
      shopName: "Sweet Bengal",
      shopAddress: "H9",
      shopImage: "https://cdn.pixabay.com/photo/2017/08/07/07/06/food-2602726_1280.jpg"
    },
    {
      name: "Michael Ross",
      ph: "+91 9087654321",
      shopName: "Pizza Plaza",
      shopAddress: "H10",
      shopImage: "https://cdn.pixabay.com/photo/2017/09/30/15/10/plate-2802332_1280.jpg"
    },
    {
      name: "Sanjay Gupta",
      ph: "+91 8976543210",
      shopName: "Kebab Kingdom",
      shopAddress: "H11",
      shopImage: "https://cdn.pixabay.com/photo/2016/03/05/19/02/kebab-1238437_1280.jpg"
    },
    {
      name: "Lisa Pinto",
      ph: "+91 7865432109",
      shopName: "Goan Fish Curry",
      shopAddress: "H12",
      shopImage: "https://cdn.pixabay.com/photo/2015/04/07/07/51/prawns-710747_1280.jpg"
    }
  ];
  
module.exports = { menuItemsData, shopData };