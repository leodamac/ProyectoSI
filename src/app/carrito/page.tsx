'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useCart } from '@/components/CartContext';

export default function CarritoPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">¡Explora nuestros deliciosos postres saludables!</p>
            <Link 
              href="/productos"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tu Carrito</h1>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-pink-100 rounded-lg flex items-center justify-center text-3xl">
                      {item.product.image}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">{item.product.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.product.isVegan && <span className="text-green-600 text-sm">🌱 Vegano</span>}
                        {item.product.isGlutenFree && <span className="text-blue-600 text-sm">🚫🌾 Sin gluten</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} c/u
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen del Pedido</h2>
              
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4">
                Proceder al Pago
              </button>
              
              <Link 
                href="/productos"
                className="block w-full text-center bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Seguir Comprando
              </Link>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🚚 Envío Gratis</h3>
                <p className="text-green-700 text-sm">
                  En pedidos mayores a $50. Tu pedido califica para envío gratuito.
                </p>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🏆 Garantía de Frescura</h3>
                <p className="text-blue-700 text-sm">
                  Todos nuestros postres se preparan frescos el día del envío.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}