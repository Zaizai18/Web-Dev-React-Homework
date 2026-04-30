import logo from '../assets/image/Halal munchies logo.png';

export default function Header({ page, setPage, isNavOpen, setIsNavOpen, cartCount, setIsCartOpen }) {
  const navItems = ['home', 'menu', 'about', 'contact'];

  return (
    <header className="bg-black text-white px-5 py-12 flex justify-between items-center fixed top-0 left-0 w-full z-[1000] h-[75px]">
      <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
        <h1 className="font-halal text-[25px] text-[#1f7a3b] halal-shadow ml-1">HALAL</h1>
        <img src={logo} alt="Logo" className="h-[40px] md:h-[50px] mx-0" />
        <h1 className="font-munchies text-[25px] text-[#f07f13] mt-2">Munchies</h1>
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex mt-1">
          {navItems.map((p) => (
            <a 
              key={p} 
              onClick={() => setPage(p)}
              className={`px-4 py-2 mt-1 font-bold uppercase cursor-pointer transition-colors hover:text-[#f07f13] ${page === p ? 'text-[#f07f13]' : 'text-white'}`}
            >
              {p}
            </a>
          ))}
        </nav>

        {page === 'menu' && (
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 border border-white/60 px-3 py-1.5 mt-3 rounded-md font-bold hover:border-[#f07f13] relative transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span className="hidden sm:inline">CART</span>
            <span className={`${cartCount > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} absolute -top-2 -right-2 bg-[#1f7a3a] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-white transition-all`}>
              {cartCount}
            </span>
          </button>
        )}

        <button className="md:hidden text-4xl mt-2" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? '✕' : '☰'}
        </button>
      </div>

      <nav className={`${isNavOpen ? 'max-h-[300px]' : 'max-h-0'} md:hidden absolute top-full left-0 w-full bg-black flex flex-col overflow-hidden transition-all duration-300 border-t border-gray-800`}>
        {navItems.map((p) => (
          <a key={p} onClick={() => { setPage(p); setIsNavOpen(false); }} className="p-4 text-center font-bold uppercase border-b border-gray-900 cursor-pointer">
            {p}
          </a>
        ))}
      </nav>
    </header>
  );
}