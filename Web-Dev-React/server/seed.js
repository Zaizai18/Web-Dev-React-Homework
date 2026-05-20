const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("Error: MONGODB_URI is undefined.");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected successfully to MongoDB Atlas.'))
  .catch(err => console.error('Connection error:', err));

const Menu = mongoose.model('Menu', new mongoose.Schema({ 
  name: String, 
  price: Number, 
  img: String 
}), 'menus');

const initialMenu = [
  { name: "Chicken Over Rice Platter", price: 11.99, img: "chicken-platter" },
  { name: "Combo Over Rice Platter", price: 12.99, img: "combo-platter" },
  { name: "Chicken Cheese Burger", price: 8.99, img: "cheese-burger" },
  { name: "Garden Salad", price: 6.99, img: "garden-salad" },
  { name: "Ice Cream", price: 3.99, img: "ice-cream" },
  { name: "Chicken Gyro", price: 8.49, img: "chicken-gyro" },
  { name: "Chicken Sandwich Combo", price: 10.99, img: "chicken-combo" },
  { name: "Red Velvet Cake Slice", price: 4.50, img: "red-velvet" },
  { name: "Chicken Tenders", price: 7.99, img: "tenders" }
];

async function seedDatabase() {
  try {
    await Menu.deleteMany({});
    await Menu.insertMany(initialMenu);
    console.log('Success: Menu items successfully updated in the database.');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding process:', error);
    process.exit(1);
  }
}

seedDatabase();