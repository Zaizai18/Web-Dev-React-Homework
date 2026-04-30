import Gallery from '../components/Gallery'; 
import heroImage from '../assets/image/hero.jpeg'; 

export default function Home({ setPage }) {
  return (
    <main className="mt-[75px]">
      {/* Hero */}
      <div 
        className="h-[530px] bg-cover bg-center relative flex items-center justify-center md:justify-start"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${heroImage})` 
        }}
      >
        <div className="md:ml-[15%] text-center md:text-left text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">HALAL MUNCHIES</h1>
          <p className="text-xl md:text-2xl mb-8">The Best Halal Food in the City</p>
          <button 
            onClick={() => setPage('menu')} 
            className="bg-black border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-[#f07f13] transition-all"
          >
            ORDER ONLINE
          </button>
        </div>
      </div>

      {/* GALLERY import*/}
      <Gallery /> 
    </main>
  );
}