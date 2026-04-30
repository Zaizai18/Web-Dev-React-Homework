import { useState, useEffect, useRef } from 'react';

import gallery1 from '../assets/image/gallery 1.webp';
import gallery2 from '../assets/image/gallery 2.jpg';
import gallery3 from '../assets/image/gallery 3.jpg';
import gallery4 from '../assets/image/gallery 4.jpg';
import gallery5 from '../assets/image/gallery 5.jpeg';
import gallery6 from '../assets/image/gallery 6.avif';

export default function Gallery() {
  const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  const [index, setIndex] = useState(images.length); 
  const [visible, setVisible] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slidesRef = useRef(null);

  const allImages = [...images, ...images, ...images];

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

  const handleTransitionEnd = () => {
    setIsTransitioning(false); 
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
  const goToSlide = (dotIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex(images.length + dotIndex);
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10 uppercase tracking-widest text-black"> Our Gallery</h2>
      
      <div className="relative max-w-6xl mx-auto px-5">
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-[#f07f13] p-3 rounded-full w-12 h-12 hover:bg-black/80 transition-colors">
          &#10094;
        </button>
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-[#f07f13] p-3 rounded-full w-12 h-12 hover:bg-black/80 transition-colors">
          &#10095;
        </button>

        <div className="overflow-hidden">
          <div 
            ref={slidesRef}
            onTransitionEnd={handleTransitionEnd}
            className="flex"
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
                <div className="h-80 w-full overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                (index % images.length) === i 
                  ? "bg-[#f07f13] w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}