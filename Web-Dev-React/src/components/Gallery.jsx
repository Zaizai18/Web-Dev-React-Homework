import { useState, useEffect, useRef } from 'react';

export default function Gallery() {
  const images = ["food 2.jpg", "food 3.jpeg", "food.avif", "img1-432w.webp", "interior.jpg", "images.jpg"];
  const [index, setIndex] = useState(images.length); 
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
    setIsTransitioning(false);n
    if (index >= images.length * 2) {
      setIndex(images.length);
    } else if (index < images.length) {
      setIndex(images.length * 2 - 1);
    }
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
    <section className="py-16 bg-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10 uppercase tracking-widest">Gallery</h2>
      
      <div className="relative max-w-6xl mx-auto px-10">
        {/* Navigation Buttons */}
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black transition-colors">
          &#10094;
        </button>
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black transition-colors">
          &#10095;
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div 
            ref={slidesRef}
            onTransitionEnd={handleTransitionEnd}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${index * (100 / visible)}%)`,
              transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none'
            }}
          >
            {allImages.map((img, i) => (
              <div 
                key={i} 
                className="px-2 shrink-0" 
                style={{ width: `${100 / visible}%` }}
              >
                <div className="h-64 w-full overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={`/image/${img}`} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}