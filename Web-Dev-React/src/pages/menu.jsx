import { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard'; 
import Cart from '../components/Cart';

import chickenPlatter from '../assets/image/chicken over rice platter.png';
import comboPlatter from '../assets/image/combo platter.png';
import cheeseBurger from '../assets/image/chicken cheese burger.png';
import gardenSalad from '../assets/image/Garden salad.png';
import iceCream from '../assets/image/icecream.png';
import chickenGyro from '../assets/image/chicken gyro.png';
import chickenCombo from '../assets/image/chicken sandwhich combo.jpeg';
import redVelvet from '../assets/image/red velvet.jpeg';
import tenders from '../assets/image/tenders.png';

const API_BASE_URL = 'https://halal-munchies-backend.onrender.com';

const imageMap = {
  "chicken-platter": chickenPlatter,
  "combo-platter": comboPlatter,
  "cheese-burger": cheeseBurger,
  "garden-salad": gardenSalad,
  "ice-cream": iceCream,
  "chicken-gyro": chickenGyro,
  "chicken-combo": chickenCombo,
  "red-velvet": redVelvet,
  "tenders": tenders
};

export default function Menu({ cart, setCart, isCartOpen, setIsCartOpen, showNotification }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        const localizedMenu = data.map(item => ({
          ...item,
          img: imageMap[item.img] || chickenPlatter
        }));
        setMenuItems(localizedMenu);
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });

    fetch(`${API_BASE_URL}/api/cart`)
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error("Error loading cart:", err));
  }, []);

  const addToCart = async (item) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: item.name, price: item.price, quantity: 1 })
      });
      
      const savedItem = await res.json();

      setCart(prev => {
        const exists = prev.find(i => i.name === savedItem.name);
        if (exists) {
          return prev.map(i => i.name === savedItem.name ? savedItem : i);
        }
        return [...prev, savedItem];
      });
      
      showNotification(`${item.name} added!`);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const updateQuantity = async (id, delta) => {
    const item = cart.find(i => i._id === id);
    const newQty = item.quantity + delta;

    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }

    await fetch(`${API_BASE_URL}/api/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQty })
    });
    setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: newQty } : i));
  };

  const removeFromCart = async (id) => {
    await fetch(`${API_BASE_URL}/api/cart/${id}`, { method: 'DELETE' });
    setCart(prev => prev.filter(item => item._id !== id));
    showNotification("Item removed!");
  };

  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  if (loading) {
    return <main className="mt-[100px] text-center p-12 font-bold text-gray-600 animate-pulse">Loading menu items...</main>;
  }

  return (
    <main className="mt-[100px] p-4">
      <h1 className="text-center text-4xl font-bold mb-10">Menu</h1>
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {menuItems.map((item) => (
          <MenuCard key={item._id} item={item} onAdd={addToCart} />
        ))}
      </div>
      <Cart 
        isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} 
        cart={cart} total={total} clearCart={() => setCart([])}
        updateQuantity={updateQuantity} removeFromCart={removeFromCart}
      />
    </main>
  );
}