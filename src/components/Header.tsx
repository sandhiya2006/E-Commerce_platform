import { ShoppingCart, Heart, Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemsCount: number;
  wishlistItemsCount: number;
  isWishlistActive: boolean;
  onWishlistClick: () => void;
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
}

export default function Header({
  cartItemsCount,
  wishlistItemsCount,
  isWishlistActive,
  onWishlistClick,
  onCartClick,
  onCategoryClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setUserName(email.split('@')[0]);
      setShowLogin(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const categories = ['All', 'T-Shirts', 'Jackets', 'Dresses', 'Pants', 'Sweaters', 'Hoodies', 'Shirts', 'Skirts', 'Shorts'];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onCategoryClick('All')}
            className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            FASHION
          </button>

          <nav className="hidden md:flex space-x-8">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onWishlistClick}
              className={`relative p-2 rounded-full transition-colors ${isWishlistActive ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Wishlist"
            >
              <Heart className={`h-5 w-5 ${isWishlistActive ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center font-bold">
                  {wishlistItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700 font-medium">
                  {userName}
                </button>
                <div className="absolute right-0 mt-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-40">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                aria-label="Login"
              >
                <LogIn className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="px-4 py-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryClick(category);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowLogin(false)}>
          <div className="bg-white rounded-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-4">
              Demo: Use any email and password to login
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
