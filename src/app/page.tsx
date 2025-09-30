'use client';

import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useCart } from "@/components/CartContext";
import { sampleProducts } from "@/data/products";

export default function Home() {
  const { addToCart } = useCart();
  
  const featuredProducts = sampleProducts.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Postres <span className="text-green-600">Saludables</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Disfruta de deliciosos postres sin culpa. Todos nuestros productos están hechos con 
            ingredientes naturales y sin azúcar refinada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/productos"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ver Productos
            </Link>
            <Link 
              href="/about"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Conoce más
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegir Sweet & Healthy?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">100% Natural</h4>
              <p className="text-gray-600">
                Solo utilizamos ingredientes orgánicos y naturales en todos nuestros postres.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚫</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Sin Azúcar Refinada</h4>
              <p className="text-gray-600">
                Endulzamos con stevia, miel y frutas naturales para cuidar tu salud.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">❤️</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Delicioso & Saludable</h4>
              <p className="text-gray-600">
                El sabor increíble que amas, pero con todos los beneficios para tu bienestar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Productos Destacados
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-100 to-pink-100 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/productos"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Sweet & Healthy</h4>
              <p className="text-gray-300">
                Postres deliciosos y saludables para toda la familia.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/productos" className="hover:text-white">Productos</Link></li>
                <li><Link href="/about" className="hover:text-white">Nosotros</Link></li>
                <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📧 info@sweethealthy.com</li>
                <li>📱 +1 (555) 123-4567</li>
                <li>📍 Ciudad, País</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <span className="text-2xl cursor-pointer hover:text-green-400">📘</span>
                <span className="text-2xl cursor-pointer hover:text-green-400">📷</span>
                <span className="text-2xl cursor-pointer hover:text-green-400">🐦</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Sweet & Healthy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
