export default function Footer() {
  return (
    <footer className="bg-black text-white text-center py-8 px-4 mt-auto">
      <p className="mb-2">Hours: 11:00 AM to 3:00 AM (Vary by Location)</p>
      <p className="opacity-70 text-sm">Check your local Halal Munchies to confirm</p>
      <div className="flex justify-center gap-6 mt-4 font-bold no-underline">
        <a href="https://www.facebook.com/halalmunchiesny/" target="_blank" className="hover:text-[#f07f13] ">Facebook</a>
        <a href="https://www.instagram.com/halalmunchies786/?hl=en" target="_blank" className="hover:text-[#f07f13] ">Instagram</a>
      </div>
    </footer>
  );
}