export default function MenuCard({ item, onAdd }) {
  return (
    <div className="w-[310px] p-6 shadow-lg border border-gray-100 rounded-xl text-center hover:-translate-y-2 transition-transform bg-white">
      <img 
        src={item.img} 
        style={{ height: item.h || 'auto' }} 
        className="w-full object-contain mb-4 mx-auto" 
        alt={item.name} 
      />
      
      <h4 className="font-bold text-lg min-h-[50px] flex items-center justify-center text-black-700">
        {item.name}
      </h4>
      <p className="text-xl font-bold my-2 text-black-700">
        ${item.price.toFixed(2)}
      </p>
      
      <button 
        onClick={() => onAdd(item)} 
        className="border-2 border-[#f07f13] px-6 py-2 font-bold rounded-lg hover:bg-[#f07f13] transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}