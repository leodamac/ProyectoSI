'use client';

import Link from 'next/link';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-bold mb-4 text-emerald-400">🥑 Alkadami Keto</h4>
            <p className="text-gray-300 mb-6">
              Tu asistente inteligente de nutrición keto. Transformando vidas a través de
              tecnología IA y respaldo profesional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                🐦
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-emerald-400">Servicios</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/chat-ia" className="hover:text-emerald-400 transition-colors">Chat con IA</Link></li>
              <li><Link href="/nutricionistas" className="hover:text-emerald-400 transition-colors">Nutricionistas</Link></li>
              <li><Link href="/personalizados" className="hover:text-emerald-400 transition-colors">Planes Personalizados</Link></li>
              <li><Link href="/foro" className="hover:text-emerald-400 transition-colors">Foro Comunitario</Link></li>
              <li><Link href="/productos" className="hover:text-emerald-400 transition-colors">Productos Keto</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-emerald-400">Enlaces</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">Nosotros</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
              <li><Link href="/contacto" className="hover:text-emerald-400 transition-colors">Contacto</Link></li>
              <li><Link href="/instalar" className="hover:text-emerald-400 transition-colors">Instalar App</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-emerald-400">Contacto</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@alkadamiketo.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +593 97 122 7655
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                Samborondón, Ecuador
              </li>
              <li>
                <a
                  href="https://wa.me/593971227655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              &copy; 2025 Alkadami Keto. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Términos de Uso</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Aviso Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
