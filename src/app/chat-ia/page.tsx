'use client';

import Navigation from '@/components/Navigation';
import AIChat from '@/components/AIChat';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Mic, Zap } from 'lucide-react';

export default function ChatIAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AIChat />
            </motion.div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Tu Asistente Keto</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Chatea con nuestra IA especializada en nutrición ketogénica. Obtén recetas personalizadas,
                recomendaciones de productos y consejos nutricionales.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Chat por Texto</h4>
                    <p className="text-sm text-gray-600">
                      Escribe tus preguntas y recibe respuestas personalizadas al instante
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mic className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Comando de Voz</h4>
                    <p className="text-sm text-gray-600">
                      Usa el micrófono para hablar naturalmente con la IA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Respuestas Inteligentes</h4>
                    <p className="text-sm text-gray-600">
                      La IA aprende de tu conversación para ofrecer mejores recomendaciones
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-3">🎯 Qué Puedo Hacer</h3>
              <ul className="space-y-2 text-emerald-50">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Crear recetas keto personalizadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Recomendar productos de la tienda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Responder dudas sobre la dieta keto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Sugerir planes de alimentación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Conectarte con nutricionistas</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-amber-900 mb-2">💡 Ejemplo de Preguntas</h3>
              <div className="space-y-2 text-sm text-amber-800">
                <p className="bg-white px-3 py-2 rounded-lg">
                  &quot;Quiero una receta de desayuno keto rápida&quot;
                </p>
                <p className="bg-white px-3 py-2 rounded-lg">
                  &quot;¿Qué snacks keto me recomiendas?&quot;
                </p>
                <p className="bg-white px-3 py-2 rounded-lg">
                  &quot;Necesito ayuda para bajar de peso&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
