import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { products } from './data/products';
import { Product, CartItem } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredByCategory = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const filteredProducts = showWishlistOnly
    ? products.filter((p) => wishlistItems.includes(p.id))
    : filteredByCategory;

  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { product, quantity, size, color }]);
    }
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity;
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowWishlistOnly(false);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        cartItemsCount={totalCartItems}
        wishlistItemsCount={wishlistItems.length}
        isWishlistActive={showWishlistOnly}
        onWishlistClick={() => setShowWishlistOnly((prev) => !prev)}
        onCartClick={() => setShowCart(true)}
        onCategoryClick={handleCategoryClick}
      />

      {!showWishlistOnly && <Hero />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {showWishlistOnly
              ? 'My Wishlist'
              : (selectedCategory === 'All' ? 'All Products' : selectedCategory)}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} items</p>
        </div>

        {showWishlistOnly && filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600">Tap the heart icon on any product to save it here.</p>
            <button
              type="button"
              onClick={() => setShowWishlistOnly(false)}
              className="mt-4 inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
                isWishlisted={wishlistItems.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FASHION</h3>
              <p className="text-gray-400">
                Premium clothing for the modern individual.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Sale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Shipping Info</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FASHION. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      )}
    </div>
  );
}

export default App;
