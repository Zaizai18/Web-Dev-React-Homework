import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Gallery from './components/gallery';
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

      {/* Toast  */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/90 text-[#f07f13] px-8 py-3 rounded-full border-2 border-[#f07f13]/70 font-halal shadow-2xl z-[3000] animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}