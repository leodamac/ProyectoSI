'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { Sparkles, Users, LayoutGrid, MessageSquare, Menu, X, Download } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-emerald-600">
            🥑 Alkadami Keto
          </Link>
          
          {/* Desktop Navigation */}
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
              href="/foro" 
              className="flex items-center gap-2 text-purple-700 hover:text-purple-800 font-semibold bg-purple-50 px-4 py-2 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Foro
            </Link>
            <Link 
              href="/nutricionistas" 
              className="flex items-center gap-2 text-teal-700 hover:text-teal-800 font-semibold bg-teal-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              Nutricionistas
            </Link>
            <Link 
              href="/personalizados" 
              className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold bg-blue-50 px-4 py-2 rounded-lg transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              Personalizados
            </Link>
            <Link href="/productos" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Productos
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Contacto
            </Link>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link 
              href="/carrito"
              className="bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
            >
              🛒 ({itemCount})
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Cart */}
          <Link 
            href="/carrito"
            className="hidden md:block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            🛒 Carrito ({itemCount})
          </Link>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/chat-ia" 
                className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="w-5 h-5" />
                Chat IA
              </Link>
              <Link 
                href="/foro" 
                className="flex items-center gap-2 text-purple-700 hover:text-purple-800 font-semibold bg-purple-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="w-5 h-5" />
                Foro
              </Link>
              <Link 
                href="/nutricionistas" 
                className="flex items-center gap-2 text-teal-700 hover:text-teal-800 font-semibold bg-teal-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5" />
                Nutricionistas
              </Link>
              <Link 
                href="/personalizados" 
                className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold bg-blue-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutGrid className="w-5 h-5" />
                Personalizados
              </Link>
              <Link 
                href="/productos" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                href="/contacto" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link 
                href="/instalar" 
                className="flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 font-semibold px-4 py-3 rounded-lg transition-colors mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download className="w-5 h-5" />
                Instalar App
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}