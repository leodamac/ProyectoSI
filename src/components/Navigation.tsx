'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { Sparkles, Users } from 'lucide-react';

export default function Navigation() {
  const { itemCount } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            🥑 Alkadami Keto
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link 
              href="/chat-ia" 
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Chat IA
            </Link>
            <Link 
              href="/nutricionistas" 
              className="flex items-center gap-2 text-teal-700 hover:text-teal-800 font-semibold bg-teal-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              Nutricionistas
            </Link>
            <Link href="/productos" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Productos
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Contacto
            </Link>
          </div>
          <Link 
            href="/carrito"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            🛒 Carrito ({itemCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}