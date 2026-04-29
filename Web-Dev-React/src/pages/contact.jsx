export default function Contact() {
  return (
    <div className="bg-white">
      <main className="mt-[100px] max-w-4xl mx-auto p-6 flex flex-row items-center gap-12">
        
        <section className="w-full text-center">
          <h3 className="text-xl font-bold mb-6">Find a location near you</h3>
          <div className="rounded-2xl overflow-hidden h-[350px] max-w-2xl mx-auto">
            <iframe 
              className="w-full h-full" 
              src="https://maps.google.com/maps?q=halal%20munchies%20new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed">
            </iframe>
          </div>
        </section>

        <section className="w-full max-w-xl">
          <h3 className="text-xl font-bold mb-6 text-center">Contact Our Team</h3>
          <form className="flex flex-col gap-5">
            <input type="text" placeholder="Name" className="p-3 border border-gray-300 rounded focus:outline-none focus:border-black" required />
            <input type="email" placeholder="Email" className="p-3 border border-gray-300 rounded focus:outline-none focus:border-black" required />
            <textarea placeholder="Message" className="p-3 border border-gray-300 rounded h-24 focus:outline-none focus:border-black"></textarea>
            <button className="bg-black text-white py-3 rounded font-bold hover:bg-[#f07f13] transition-all uppercase tracking-widest text-sm">
              Send
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}