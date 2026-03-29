import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export default function Cart({ items, onClose, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 border border-gray-300 rounded hover:border-gray-400 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-300 rounded hover:border-gray-400 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
