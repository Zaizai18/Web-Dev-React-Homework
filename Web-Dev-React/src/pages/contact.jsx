export default function Contact() {
  return (
    <main className="mt-32 md:mt-40 mb-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Map */}
          <section className="w-full text-center">
            <h3 className="text-xl font-bold mb-6 text-black">
              Find a location near you
            </h3>
            <div className="border border-[#ccc] h-[300px] md:h-[350px]">
              <iframe 
                className="w-full h-full border-0" 
                src="https://maps.google.com/maps?q=halal%20munchies%20new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </section>

          {/* Contact Form */}
          <section className="w-full text-center">
            <h3 className="text-xl font-bold mb-6 text-black">
              Contact Our Team
            </h3>
            <form className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="p-3 border border-[#ccc] rounded-[4px] focus:outline-none focus:border-black text-sm" 
                required 
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="p-3 border border-[#ccc] rounded-[4px] focus:outline-none focus:border-black text-sm" 
                required 
              />
              <textarea 
                placeholder="Message" 
                className="p-3 border border-[#ccc] rounded-[4px] h-32 focus:outline-none focus:border-black text-sm resize-none"
              ></textarea>
              
              <button className="bg-black text-white py-3 rounded-[6px] font-bold text-base hover:bg-[#f07f13] transition-colors border border-white/20">
                Send
              </button>
            </form>
          </section>
          
        </div>
      </div>
    </main>
  );
}