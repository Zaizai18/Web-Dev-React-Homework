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
    fetch('https://halal-munchies-backend.onrender.com/api/menu')
      .then((res) => {
        if (!res.ok) throw new Error("Server responded with error");
        return res.json();
      })
      .then((data) => {
        // SAFETY CHECK: Only map if data is an array
        if (Array.isArray(data)) {
          const localizedMenu = data.map(item => ({
            ...item,
            img: imageMap[item.img] || chickenPlatter
          }));
          setMenuItems(localizedMenu);
        } else {
          console.error("Data received is not an array:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error connecting to database API server:", err);
        setLoading(false);
      });
  }, []);
  
  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i._id === item._id);
      if (exists) return prev.map(i => i._id === item._id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, {...item, quantity: 1}];
    });
    showNotification(`${item.name} added!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => 
      item._id === id ? { ...item, quantity: item.quantity + delta } : item 
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
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