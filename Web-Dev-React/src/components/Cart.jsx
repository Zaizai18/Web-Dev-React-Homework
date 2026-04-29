export default function Cart({ isOpen, onClose, cart, total, clearCart, updateQuantity, removeFromCart }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[2000] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-black`}>
      
  
      <div className="bg-[#f28e2c] p-6 flex justify-between items-center text-black border-b border-black">
        <h2 className="text-3xl font-black tracking-tight">ORDER SUMMARY</h2>
        <button onClick={onClose} className="text-5xl font-light leading-none">X</button>
      </div>

  
      <div className="p-4 overflow-y-auto h-[calc(100%-300px)] flex flex-col gap-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 font-bold text-xl text-center mt-10">Your cart is empty</p>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="bg-[#76ab86] p-5 rounded-[15px] flex flex-col relative">
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-xl leading-tight max-w-[70%]">{item.name}</p>
                <p className="font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <div className="flex flex-col items-end gap-2 mt-2">
                <div className="flex items-center bg-[#f28e2c] rounded-md overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.name, -1)}
                    className="px-2 py-1 text-black font-bold border-r border-black/20 hover:bg-[#e07d20]"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-white/20 font-bold text-black">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.name, 1)}
                    className="px-2 py-1 text-black font-bold border-l border-black/20 hover:bg-[#e07d20]"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.name)}
                  className="bg-black text-white text-[12px] font-bold px-4 py-1.5 rounded-md uppercase"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="absolute bottom-0 w-full p-6 bg-white border-t-2 border-gray-100">
        <p className="text-2xl font-black text-black mb-6">Total: ${total.toFixed(2)}</p>
        
        <button className="w-full bg-black text-white py-4 rounded-md font-bold text-xl mb-4 uppercase tracking-wide">
          Proceed to Checkout
        </button>
        
        <button 
          onClick={clearCart} 
          className="w-full bg-[#d69393] text-white py-4 rounded-md font-bold text-xl uppercase tracking-wide"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}