import '../App.css';

export default function Cart({ isOpen, onClose, cart, total, clearCart, updateQuantity, removeFromCart }) {
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const orderData = {
      items: cart.map(item => ({
        menuItemId: item._id, 
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: total
    };

    try {
      const response = await fetch('https://halal-munchies-backend.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        for (const item of cart) {
          await fetch(`https://halal-munchies-backend.onrender.com/api/cart/${item._id}`, {
            method: 'DELETE'
          });
        }
        
        alert('Order placed successfully! Cart has been cleared.');
        clearCart(); 
        onClose();
      } else {
        alert('There was an issue recording your order.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <>
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[350px] bg-white z-[2000] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-black flex flex-col cart-container-custom`}>
        <div className="cart-header-orange p-[25px] flex justify-between items-center text-black">
          <h2 className="text-[22px] font-bold uppercase m-0">ORDER SUMMARY</h2>
          <button onClick={onClose} className="text-[35px] font-light cursor-pointer hover:opacity-60 transition-opacity border-none bg-transparent">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-[10px] flex flex-col gap-2">
          {cart.length === 0 ? (
            <p className="text-[#1f7a3b] font-bold text-[25px] text-center mt-[40px]">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="bg-[#76ab86] p-[12px] rounded-[10px] flex justify-between items-center text-white">
                <div className="flex-1 pr-2">
                  <p className="font-bold text-[14px] uppercase m-0 text-black">{item.name}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-black font-bold text-[15px]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="flex items-center bg-[#f28e2c] rounded-[5px] overflow-hidden border border-black/20 h-[28px]">
                    <button onClick={() => updateQuantity(item._id, -1)} className="px-2.5 text-black font-bold hover:bg-black/10 transition-colors border-none bg-transparent cursor-pointer">−</button>
                    <span className="px-3 text-black font-bold text-[12px]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} className="px-2.5 text-black font-bold hover:bg-black/10 transition-colors border-none bg-transparent cursor-pointer">+</button>
                  </div>

                  <button onClick={() => removeFromCart(item._id)} className="bg-black text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors border-none cursor-pointer">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-[20px] border-t border-black bg-white">
          <div className="flex justify-between items-center mb-[15px] font-bold text-[18px] uppercase text-black">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
          
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/40 z-[1500]" onClick={onClose}></div>}
    </>
  );
}