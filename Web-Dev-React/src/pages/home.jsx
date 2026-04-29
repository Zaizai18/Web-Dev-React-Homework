import { useState, useEffect, useRef } from 'react';

export default function Home({ setPage }) {
  const images = ["food 2.jpg", "food 3.jpeg", "food.avif", "img1-432w.webp", "interior.jpg", "images.jpg"];
  const [index, setIndex] = useState(3);
  const [visible, setVisible] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slidesRef = useRef(null);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth <= 600) setVisible(1);
      else if (window.innerWidth <= 900) setVisible(2);
      else setVisible(3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const allImages = [...images, ...images, ...images];

  const handleTransitionEnd = () => {
    if (index >= images.length * 2) {
      setIndex(images.length);
    } else if (index < images.length) {
      setIndex(images.length);
    }
    setIsTransitioning(false);
  };

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex(prev => prev + 1);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex(prev => prev - 1);
  };

  return (
    <main className="mt-[75px]">
      <div className="h-[500px] bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/image/imagess.jpeg')] bg-cover bg-center relative flex items-center justify-center md:justify-start">
        <div className="md:ml-[15%] text-center md:text-left text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">HALAL MUNCHIES</h1>
          <p className="text-xl md:text-2xl mb-8">The Best Halal Food in the City</p>
          <button onClick={() => setPage('menu')} className="bg-black border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-[#f07f13] transition-all">
            ORDER ONLINE
          </button>
        </div>
      </div>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Gallery</h2>
        <div className="relative w-[90%] mx-auto overflow-hidden">
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black text-[#f07f13] rounded-full text-2xl">❮</button>
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * (100 / visible)}%)` }}>
            {[...images, ...images].map((img, i) => (
              <div key={i} className="px-2" style={{ minWidth: `${100 / visible}%` }}>
                <img src={`/image/${img}`} className="w-full h-64 object-cover rounded-2xl shadow-md" alt="Gallery" />
              </div>
            ))}
          </div>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black text-[#f07f13] rounded-full text-2xl">❯</button>
        </div>
      </section>
    </main>
  );
}