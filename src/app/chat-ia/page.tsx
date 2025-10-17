'use client';

import Navigation from '@/components/Navigation';
import ImprovedAIChat from '@/components/ImprovedAIChat';
import { motion } from 'framer-motion';
import { MessageCircle, Mic, Zap, TrendingUp, Users, Calendar, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ChatIAPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface - Takes more space */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ImprovedAIChat />
            </motion.div>
          </div>

          {/* Streamlined Sidebar - Professional & Clean */}
          <div className="space-y-4">
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
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mic className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Comando de Voz</h4>
                    <p className="text-xs text-gray-600">
                      Interactúa con tu voz, sin escribir
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

            {/* Quick Tips Widget */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-4">💡 Consejo del Día</h3>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">
                  Para mejores resultados en keto, mantén un ayuno intermitente de 16:8 y asegúrate de consumir suficientes electrolitos.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
