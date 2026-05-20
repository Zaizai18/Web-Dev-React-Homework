const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://halal-munchies-backend.onrender.com"]
}));
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("Error: MONGODB_URI is undefined.");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected successfully to MongoDB Atlas.'))
  .catch(err => console.error('Database connection error:', err));

const Menu = mongoose.model('Menu', new mongoose.Schema({ 
  name: String, 
  price: Number, 
  img: String 
}), 'menus');

const Order = mongoose.model('Order', new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
}), 'orders');

app.get('/api/menu', async (req, res) => {
  try {
    const dishes = await Menu.find({});
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Database fetch error' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order processed successfully.', newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Database save error' });
  }
});

const Cart = mongoose.model('Cart', new mongoose.Schema({ 
  name: String, 
  price: Number, 
  quantity: Number 
}), 'carts');

app.put('/api/cart/:id', async (req, res) => {
  try {
    const updated = await Cart.findByIdAndUpdate(
      req.params.id, 
      { quantity: req.body.quantity }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) { res.status(500).json(err); }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Item removed from database");
  } catch (err) { res.status(500).json(err); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});