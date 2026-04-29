export default function Menu({ cart, setCart, isCartOpen, setIsCartOpen, showNotification }) {
  const menuItems = [
    { name: "Chicken Over Rice Platter", price: 10.99, img: "chicken over rice platter.png" },
    { name: "Mix Combo Over Rice Platter", price: 10.99, img: "combo platter.png" },
    { name: "Crispy Chicken Sandwhich", price: 6.99, img: "chicken cheese burger.png" },
    { name: "Garden Salad", price: 7.99, img: "Garden salad.png" },
    { name: "Shahi Kulfi Icecream", price: 2.50, img: "icecream.png", h: "210px" },
    { name: "Chicken Gyro", price: 7.99, img: "chicken gyro.png" },
    { name: "Chicken Sandwhich & Fries", price: 9.99, img: "chicken sandwhich combo.jpeg" },
    { name: "Red Velvet Cake", price: 4.99, img: "red velvet.jpeg", h: "210px" },
    { name: "5 Pieces Tenders", price: 9.99, img: "tenders.png" },
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) return prev.map(i => i.name === item.name ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, {...item, quantity: 1}];
    });
    showNotification(`${item.name} added!`);
  };

  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <main className="mt-[100px] p-4">
      <h1 className="text-center text-4xl font-bold mb-10">Menu</h1>
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {menuItems.map((item, idx) => (
          <div key={idx} className="w-[310px] p-6 shadow-lg border border-gray-100 rounded-xl text-center hover:-translate-y-2 transition-transform bg-white">
            <img src={`/image/${item.img}`} style={{ height: item.h || 'auto' }} className="w-full object-contain mb-4 mx-auto" />
            <h4 className="font-bold text-lg min-h-[50px] flex items-center justify-center text-black-700">{item.name}</h4>
            <p className="text-xl font-bold my-2 text-black-700">${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)} className="border-2 border-[#f07f13] px-6 py-2 font-bold rounded-lg hover:bg-[#f07f13] transition-colors">Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[2000] shadow-2xl transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-gradient-to-r from-[#f07f13] to-[#ff9a2f] p-4 flex justify-between items-center border-2 border-black">
          <h2 className="font-halal font-bold">ORDER SUMMARY</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-2xl font-bold">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? <p className="text-center text-[#1f7a3b] text-2xl mt-10 font-halal">Your cart is empty</p> : 
            cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-[#1f7a3a]/30 p-4 rounded-xl">
                <div><p className="font-bold">{item.name}</p><p className="text-sm">Qty: {item.quantity}</p></div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          }
        </div>
        <div className="p-6 border-t bg-gray-50 text-center">
          <p className="text-2xl font-bold mb-4 text-left">Total: ${total.toFixed(2)}</p>
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-[#f07f13] hover:text-black transition-all">Proceed to Checkout</button>
          <button onClick={() => setCart([])} className="mt-2 text-sm text-red-700 underline">Clear Cart</button>
        </div>
      </div>
      {isCartOpen && <div className="fixed inset-0 bg-black/50 z-[1500]" onClick={() => setIsCartOpen(false)}></div>}
    </main>
  );
}