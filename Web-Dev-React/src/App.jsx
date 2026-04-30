import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Gallery from './components/Gallery';
import MenuCard from './components/MenuCard';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        page={page} setPage={setPage} 
        isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
      />

      {page === 'home' && <Home setPage={setPage} />}
      {page === 'menu' && (
        <Menu 
          cart={cart} setCart={setCart} 
          isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}
          showNotification={showNotification}
        />
      )}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}

      <Footer />

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[5000] w-max max-w-[90vw]">
          <div 
            className="bg-black/95 text-[#f07f13] px-6 py-2 rounded-full border-2 border-[#f07f13]/50 font-bold shadow-2xl animate-toast-spring flex items-center gap-3"
          >
          <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
              {toast}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}