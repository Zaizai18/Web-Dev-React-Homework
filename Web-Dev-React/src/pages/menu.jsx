import { useEffect } from 'react';
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

export default function Menu({ cart, setCart, isCartOpen, setIsCartOpen, showNotification }) {
  const menuItems = [
    { name: "Chicken Over Rice Platter", price: 10.99, img: chickenPlatter },
    { name: "Mix Combo Over Rice Platter", price: 10.99, img: comboPlatter },
    { name: "Crispy Chicken Sandwhich", price: 6.99, img: cheeseBurger },
    { name: "Garden Salad", price: 7.99, img: gardenSalad },
    { name: "Shahi Kulfi Icecream", price: 2.50, img: iceCream, h: "210px" },
    { name: "Chicken Gyro", price: 7.99, img: chickenGyro },
    { name: "Chicken Sandwhich & Fries", price: 9.99, img: chickenCombo },
    { name: "Red Velvet Cake", price: 4.99, img: redVelvet, h: "210px" },
    { name: "5 Pieces Tenders", price: 9.99, img: tenders },
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) return prev.map(i => i.name === item.name ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, {...item, quantity: 1}];
    });
    showNotification(`${item.name} added!`);
  };

  const updateQuantity = (name, delta) => {
    setCart(prev => prev.map(item => 
      item.name === name ? { ...item, quantity: item.quantity + delta } 
      : item )
      .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <main className="mt-[100px] p-4">
      <h1 className="text-center text-4xl font-bold mb-10">Menu</h1>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {menuItems.map((item, idx) => (
          <MenuCard key={idx} item={item} onAdd={addToCart} />
        ))}
      </div>
     {/* Cart */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        total={total}
        clearCart={() => setCart([])}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </main>
  );
}