export default function MenuCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <img src={`/image/${item.img}`} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h4 className="font-bold text-lg">{item.name}</h4>
        <p className="text-[#1f7a3b] font-bold my-2">${item.price.toFixed(2)}</p>
        <button onClick={() => onAdd(item)} className="w-full bg-[#f07f13] text-white py-2 rounded-lg font-bold hover:brightness-110 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}