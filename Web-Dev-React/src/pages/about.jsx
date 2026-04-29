export default function About() {
  return (
    <main className="mt-[100px] max-w-4xl mx-auto px-4 pb-20 text-center">
      <h1 className="text-4xl font-bold mb-8 font-brand-halal text-black-800 mt-10">About Munchies</h1>

      <p className="text-lg leading-relaxed text-black-700 mb-12 px-2 md:px-10">
        Halal Munchies is a popular halal restaurant in New York City known for
        its flavorful comfort food with exceptional service. We have multiple locations in NYC serving many classics like
        halal platters and gyros, burgers, seasoned fries, and salads. Every dish is made with quality ingredients perfect for any occasion. 
        Whether you're grabbing a quick meal with friends, enjoying a late-night bite, or ordering for the whole family, 
        Halal Munchies offers something for everyone. Our goal is to exceed your expectations and leave you craving more!
      </p>

      <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white inline-block">
        <img 
          src="/image/halal munchies.webp" 
          alt="Halal Munchies Store Front"
          className="max-w-full h-auto block"
        />
      </div>
    </main>
  );
}