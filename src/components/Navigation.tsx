'use client';

import Link from 'next/link';
import { useCart } from './CartContext';

export default function Navigation() {
  const { itemCount } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-green-600">Sweet & Healthy</Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
              Inicio
            </Link>
            <Link href="/productos" className="text-gray-700 hover:text-green-600 font-medium">
              Productos
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-green-600 font-medium">
              Contacto
            </Link>
          </div>
          <Link 
            href="/carrito"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            🛒 Carrito ({itemCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}