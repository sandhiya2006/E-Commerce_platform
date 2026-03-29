import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
}

export default function ProductCard({
  product,
  onClick,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-square">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 left-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
          />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-gray-900">${product.price}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-300 uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-200 line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
}
