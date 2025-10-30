'use client';

import Navigation from '@/components/Navigation';
import VoiceFirstChat from '@/components/chat/VoiceFirstChat';
import { ChatProvider } from '@/context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Zap, TrendingUp, Users, Calendar, CheckCircle2, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ChatIAPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
    {
      icon: <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />,
      text: "Para mejores resultados en keto, mantén un ayuno intermitente de 16:8 y asegúrate de consumir suficientes electrolitos."
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />,
      text: "Mantén tus carbohidratos por debajo de 50g diarios para entrar y mantener la cetosis óptima."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />,
      text: "Incorpora grasas saludables como aguacate, aceite de oliva y nueces para mantener tus niveles de energía."
    }
  ];

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className={`grid gap-4 transition-all duration-300 ${showSidebar ? 'lg:grid-cols-[1fr_320px]' : 'lg:grid-cols-1'}`}>
            {/* Chat Interface - Takes more space, centered when sidebar is hidden */}
            <div className={`relative ${!showSidebar ? 'mx-auto max-w-4xl w-full' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <VoiceFirstChat />
              </motion.div>
              
              {/* Toggle Sidebar Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowSidebar(!showSidebar)}
                className="absolute -right-3 top-4 z-10 w-8 h-8 bg-white border-2 border-gray-200 rounded-full shadow-lg hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all flex items-center justify-center lg:flex hidden"
                title={showSidebar ? "Ocultar barra lateral" : "Mostrar barra lateral"}
              >
                {showSidebar ? <ChevronRight className="w-4 h-4 text-gray-600" /> : <ChevronLeft className="w-4 h-4 text-gray-600" />}
              </motion.button>
            </div>

          {/* Streamlined Sidebar - Professional & Clean - Collapsible */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 lg:block hidden"
              >
            {/* Key Features - Clean Widget */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-4">Funciones Principales</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Chat Inteligente</h4>
                    <p className="text-xs text-gray-600">
                      Conversaciones naturales con IA especializada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Aprendizaje Continuo</h4>
                    <p className="text-xs text-gray-600">
                      Se adapta a tus necesidades y preferencias
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What We Can Do */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-4">¿Qué Puedo Hacer?</h3>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Crear recetas keto personalizadas</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Recomendar productos de la tienda</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Responder dudas sobre dieta keto</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Sugerir planes de alimentación</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Conectarte con nutricionistas</span>
                </li>
              </ul>
            </motion.div>

            {/* Live Stats - Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-4">Comunidad Activa</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-gray-600">Usuarios</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">2,340+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-gray-600">Conversaciones</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">15,820+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-gray-600">Satisfacción</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">94%</span>
                </div>
              </div>
            </motion.div>

            {/* Nutritionists CTA - Clean Design */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-gray-900">Expertos Certificados</h3>
              </div>
              <p className="text-xs text-gray-700 mb-4">
                Conecta con nutricionistas especializados en dieta keto y alcanza tus objetivos
              </p>
              <Link
                href="/nutricionistas"
                className="block w-full text-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm"
              >
                Ver nutricionistas
              </Link>
            </motion.div>

            {/* Quick Tips Carousel Widget */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">💡 Consejos Keto</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevTip}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Consejo anterior"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-xs text-gray-500">{currentTipIndex + 1}/{tips.length}</span>
                  <button
                    onClick={nextTip}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Siguiente consejo"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTipIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  {tips[currentTipIndex].icon}
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {tips[currentTipIndex].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Personalized Sections CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-gray-900">Herramientas Personalizadas</h3>
              </div>
              <p className="text-xs text-gray-700 mb-4">
                Planifica tus comidas semanales, descubre recetas inteligentes y genera listas de compras
              </p>
              <Link
                href="/personalizados"
                className="block w-full text-center px-4 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-sm font-semibold shadow-sm"
              >
                Ver herramientas
              </Link>
            </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
          
          {/* Mobile Sidebar - Compact version */}
          <div className="lg:hidden mt-4 space-y-3">
            {/* Compact What Can I Do */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              <h3 className="text-sm font-bold text-gray-900 mb-3">¿Qué Puedo Hacer?</h3>
              <ul className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Recetas keto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Productos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Dudas dieta</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Planes</span>
                </li>
              </ul>
            </motion.div>

            {/* Compact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">Expertos Certificados</h3>
              </div>
              <Link
                href="/nutricionistas"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold shadow-sm"
              >
                Ver nutricionistas
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
