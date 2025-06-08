require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');

const products = [
  // Electronics (5)
  {
    name: "Samsung Galaxy A14",
    category: "Electronics",
    price: 491,
    description: "Affordable Samsung smartphone with great features",
    imageUrl: "https://cdn.pixabay.com/photo/2017/04/03/15/52/mobile-phone-2198770_1280.png",
    stockQuantity: 10,
    rating: 4
  },
  {
    name: "Apple iPhone 13",
    category: "Electronics",
    price: 999,
    description: "Latest iPhone model with A15 chip",
    imageUrl: "https://images.pexels.com/photos/6373218/pexels-photo-6373218.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 8,
    rating: 5
  },
  {
    name: "Sony WH-1000XM4 Headphones",
    category: "Electronics",
    price: 349,
    description: "Noise-cancelling over-ear headphones",
    imageUrl: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 15,
    rating: 5
  },
  {
    name: "Dell XPS 13 Laptop",
    category: "Electronics",
    price: 1200,
    description: "Compact and powerful ultrabook",
    imageUrl: "https://images.pexels.com/photos/574089/pexels-photo-574089.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 5,
    rating: 4
  },
  {
    name: "Amazon Echo Dot",
    category: "Electronics",
    price: 49,
    description: "Smart speaker with Alexa",
    imageUrl: "https://images.pexels.com/photos/4145355/pexels-photo-4145355.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 20,
    rating: 4
  },

  // Fashion (5)
  {
    name: "Levi's 501 Jeans",
    category: "Fashion",
    price: 60,
    description: "Classic straight-leg jeans",
    imageUrl: "https://cdn.pixabay.com/photo/2015/06/19/09/39/lonely-814631_1280.jpg",
    stockQuantity: 25,
    rating: 4
  },
  {
    name: "Nike Air Max Sneakers",
    category: "Fashion",
    price: 120,
    description: "Comfortable and stylish sneakers",
    imageUrl: "https://cdn.pixabay.com/photo/2016/03/27/22/05/necktie-1284463_1280.jpg",
    stockQuantity: 30,
    rating: 5
  },
  {
    name: "Ray-Ban Wayfarer Sunglasses",
    category: "Fashion",
    price: 150,
    description: "Classic stylish sunglasses",
    imageUrl: "https://cdn.pixabay.com/photo/2024/06/13/05/31/men-8826710_1280.jpg",
    stockQuantity: 12,
    rating: 4
  },
  {
    name: "Adidas Hoodie",
    category: "Fashion",
    price: 70,
    description: "Warm and comfortable hoodie",
    imageUrl: "https://cdn.pixabay.com/photo/2017/10/06/04/32/jacket-2821961_1280.jpg",
    stockQuantity: 18,
    rating: 4
  },
  {
    name: "Fossil Leather Wallet",
    category: "Fashion",
    price: 45,
    description: "Durable leather wallet",
    imageUrl: "https://cdn.pixabay.com/photo/2017/03/20/17/44/wrist-watch-2159785_1280.jpg",
    stockQuantity: 40,
    rating: 4
  },

  // Home (5)
  {
    name: "Dyson V11 Vacuum Cleaner",
    category: "Home",
    price: 599,
    description: "Powerful cordless vacuum cleaner",
    imageUrl: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 7,
    rating: 5
  },
  {
    name: "Instant Pot Duo 7-in-1",
    category: "Home",
    price: 99,
    description: "Multi-use programmable pressure cooker",
    imageUrl: "https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 20,
    rating: 4
  },
  {
    name: "Philips Hue Smart Bulb",
    category: "Home",
    price: 30,
    description: "Smart LED bulb with color control",
    imageUrl: "https://images.pexels.com/photos/32439203/pexels-photo-32439203/free-photo-of-close-up-of-a-burlap-table-lamp-shade.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 50,
    rating: 4
  },
  {
    name: "Nespresso Coffee Machine",
    category: "Home",
    price: 250,
    description: "Compact espresso maker",
    imageUrl: "https://images.pexels.com/photos/1827131/pexels-photo-1827131.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 15,
    rating: 5
  },
  {
    name: "Simplehuman Sensor Trash Can",
    category: "Home",
    price: 150,
    description: "Touchless stainless steel trash can",
    imageUrl: "https://images.pexels.com/photos/4112290/pexels-photo-4112290.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 10,
    rating: 4
  },

  // Sports (5)
  {
    name: "Wilson Tennis Racket",
    category: "Sports",
    price: 120,
    description: "Lightweight tennis racket for all levels",
    imageUrl: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 22,
    rating: 4
  },
  {
    name: "Nike Dri-FIT T-Shirt",
    category: "Sports",
    price: 25,
    description: "Breathable workout shirt",
    imageUrl: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 40,
    rating: 4
  },
  {
    name: "Under Armour Running Shoes",
    category: "Sports",
    price: 85,
    description: "Comfortable running shoes",
    imageUrl: "https://images.pexels.com/photos/34514/spot-runs-start-la.jpg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 35,
    rating: 5
  },
  {
    name: "Fitbit Charge 5",
    category: "Sports",
    price: 150,
    description: "Advanced fitness tracker",
    imageUrl: "https://images.pexels.com/photos/1415810/pexels-photo-1415810.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 30,
    rating: 4
  },
  {
    name: "Spalding Basketball",
    category: "Sports",
    price: 30,
    description: "Official size and weight basketball",
    imageUrl: "https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 25,
    rating: 4
  },

  // Books (5)
  {
    name: "The Alchemist by Paulo Coelho",
    category: "Books",
    price: 15,
    description: "Inspirational novel about following dreams",
    imageUrl: "https://images.pexels.com/photos/922100/pexels-photo-922100.png?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 60,
    rating: 5
  },
  {
    name: "https://www.pexels.com/photo/a-same-sex-couple-reading-a-book-while-lying-on-the-bed-5331074/",
    category: "Books",
    price: 18,
    description: "Guide to building good habits",
    imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 50,
    rating: 5
  },
  {
    name: "Educated by Tara Westover",
    category: "Books",
    price: 20,
    description: "Memoir about a woman’s quest for knowledge",
    imageUrl: "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 40,
    rating: 5
  },
  {
    name: "Becoming by Michelle Obama",
    category: "Books",
    price: 22,
    description: "Memoir by former First Lady",
    imageUrl: "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 55,
    rating: 5
  },
  {
    name: "Sapiens by Yuval Noah Harari",
    category: "Books",
    price: 25,
    description: "A brief history of humankind",
    imageUrl: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 45,
    rating: 5
  },

  // Beauty (5)
  {
    name: "L'Oréal Paris Mascara",
    category: "Beauty",
    price: 12,
    description: "Volumizing mascara for dramatic lashes",
    imageUrl: "https://images.pexels.com/photos/1377034/pexels-photo-1377034.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 30,
    rating: 4
  },
  {
    name: "Neutrogena Face Wash",
    category: "Beauty",
    price: 10,
    description: "Gentle cleansing face wash",
    imageUrl: "https://images.pexels.com/photos/208052/pexels-photo-208052.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 40,
    rating: 4
  },
  {
    name: "Clinique Moisturizer",
    category: "Beauty",
    price: 25,
    description: "Hydrating daily moisturizer",
    imageUrl: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 20,
    rating: 5
  },
  {
    name: "MAC Lipstick",
    category: "Beauty",
    price: 18,
    description: "Long-lasting lipstick",
    imageUrl: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 25,
    rating: 4
  },
  {
    name: "Olay Regenerist Cream",
    category: "Beauty",
    price: 30,
    description: "Anti-aging moisturizer",
    imageUrl: "https://images.pexels.com/photos/354962/pexels-photo-354962.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 15,
    rating: 4
  },

  // Toys (5)
  {
    name: "LEGO City Fire Station",
    category: "Toys",
    price: 50,
    description: "Fun fire station building set",
    imageUrl: "https://images.pexels.com/photos/168866/pexels-photo-168866.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 35,
    rating: 5
  },
  {
    name: "NERF Elite Blaster",
    category: "Toys",
    price: 25,
    description: "Foam dart blaster toy",
    imageUrl: "https://images.pexels.com/photos/255514/pexels-photo-255514.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 40,
    rating: 4
  },
  {
    name: "Barbie Dreamhouse",
    category: "Toys",
    price: 150,
    description: "Barbie's deluxe dreamhouse playset",
    imageUrl: "https://images.pexels.com/photos/191360/pexels-photo-191360.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 20,
    rating: 5
  },
  {
    name: "Hot Wheels Track Set",
    category: "Toys",
    price: 35,
    description: "Race car track set",
    imageUrl: "https://images.pexels.com/photos/163696/toy-car-toy-box-mini-163696.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 30,
    rating: 4
  },
  {
    name: "Play-Doh Creative Set",
    category: "Toys",
    price: 20,
    description: "Colorful modeling clay",
    imageUrl: "https://images.pexels.com/photos/3068579/pexels-photo-3068579.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 45,
    rating: 4
  },

  // Grocery (5)
  {
    name: "Organic Bananas (1kg)",
    category: "Grocery",
    price: 2,
    description: "Fresh organic bananas",
    imageUrl: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 100,
    rating: 4
  },
  {
    name: "Almond Milk (1L)",
    category: "Grocery",
    price: 3,
    description: "Dairy-free almond milk",
    imageUrl: "https://images.pexels.com/photos/3167310/pexels-photo-3167310.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 60,
    rating: 4
  },
  {
    name: "Whole Wheat Bread",
    category: "Grocery",
    price: 2.5,
    description: "Freshly baked bread",
    imageUrl: "https://images.pexels.com/photos/3423860/pexels-photo-3423860.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 80,
    rating: 4
  },
  {
    name: "Free-range Eggs (12 pack)",
    category: "Grocery",
    price: 4,
    description: "Organic free-range eggs",
    imageUrl: "https://images.pexels.com/photos/4110226/pexels-photo-4110226.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 70,
    rating: 5
  },
  {
    name: "Organic Honey (500g)",
    category: "Grocery",
    price: 6,
    description: "Pure organic honey",
    imageUrl: "https://images.pexels.com/photos/3962287/pexels-photo-3962287.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 50,
    rating: 5
  },

  // Automotive (5)
  {
    name: "Bosch Car Battery",
    category: "Automotive",
    price: 120,
    description: "Reliable car battery",
    imageUrl: "https://images.pexels.com/photos/159293/car-engine-motor-clean-customized-159293.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 12,
    rating: 4
  },
  {
    name: "Michelin All-Season Tires (Set of 4)",
    category: "Automotive",
    price: 400,
    description: "Durable tires for all seasons",
    imageUrl: "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 10,
    rating: 5
  },
  {
    name: "Car Vacuum Cleaner",
    category: "Automotive",
    price: 50,
    description: "Portable car vacuum",
    imageUrl: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 20,
    rating: 4
  },
  {
    name: "Rain-X Windshield Washer Fluid",
    category: "Automotive",
    price: 10,
    description: "Water repellent windshield treatment",
    imageUrl: "https://images.pexels.com/photos/65623/vehicle-chrome-technology-automobile-65623.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 35,
    rating: 4
  },
  {
    name: "LED Car Headlights",
    category: "Automotive",
    price: 80,
    description: "Bright LED headlights",
    imageUrl: "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 18,
    rating: 5
  },

  // Jewelry (5)
  {
    name: "Sterling Silver Necklace",
    category: "Jewelry",
    price: 120,
    description: "Elegant silver necklace",
    imageUrl: "https://images.pexels.com/photos/6662322/pexels-photo-6662322.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 25,
    rating: 4
  },
  {
    name: "Gold Plated Hoop Earrings",
    category: "Jewelry",
    price: 75,
    description: "Classic hoop earrings",
    imageUrl: "https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 30,
    rating: 4
  },
  {
    name: "Men's Stainless Steel Watch",
    category: "Jewelry",
    price: 250,
    description: "Water-resistant watch",
    imageUrl: "https://images.pexels.com/photos/6019185/pexels-photo-6019185.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 20,
    rating: 5
  },
  {
    name: "Diamond Engagement Ring",
    category: "Jewelry",
    price: 5000,
    description: "Beautiful diamond ring",
    imageUrl: "https://images.pexels.com/photos/94843/pexels-photo-94843.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 5,
    rating: 5
  },
  {
    name: "Pearl Bracelet",
    category: "Jewelry",
    price: 150,
    description: "Classic pearl bracelet",
    imageUrl: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=600",
    stockQuantity: 15,
    rating: 4
  }
];

module.exports = products;

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your-db-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected');

    await Product.deleteMany({});
    console.log('Existing products deleted');

    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products inserted`);

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
}

seedDB();