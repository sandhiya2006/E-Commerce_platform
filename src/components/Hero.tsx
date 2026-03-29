export default function Hero() {
  return (
    <div className="relative h-[500px] bg-gradient-to-r from-slate-900 to-slate-700 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Fashion"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Elevate Your Style
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover the latest trends in fashion. Premium quality clothing that defines your unique style.
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Shop Collection
          </button>
        </div>
      </div>
    </div>
  );
}
