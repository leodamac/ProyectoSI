'use client';

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { sampleProducts } from "@/data/products";
import { motion } from "framer-motion";
import { Heart, Leaf, Shield, Star, Users, Sparkles, MessageCircle, Phone } from "lucide-react";

export default function Home() {
  const { addToCart } = useCart();

  const featuredProducts = sampleProducts.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-teal-100/30"></div>
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              <Leaf className="w-4 h-4 mr-2" />
              Servicio Freemium • IA Personalizada • Nutricionistas Certificados
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Tu <span className="text-emerald-600">Asistente Keto</span>
            <br />
            con <span className="text-teal-600">IA Inteligente</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Conversa con nuestra IA especializada en nutrición keto. Recibe recetas personalizadas,
            planes nutricionales y acceso a nutricionistas certificados. ¡Empieza gratis hoy!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link
              href="/chat-ia"
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Chatear con IA Gratis
            </Link>
            <Link
              href="/nutricionistas"
              className="group border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Ver Nutricionistas
            </Link>
          </motion.div>

          <motion.p
            className="mt-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            ✨ Versión gratuita disponible • 🎯 Consultas premium con profesionales
          </motion.p>
        </motion.div>

        {/* Floating elements for visual appeal */}
        <motion.div
          className="absolute top-20 left-10 text-4xl opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🥑
        </motion.div>
        <motion.div
          className="absolute top-32 right-16 text-3xl opacity-20"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 1 }}
        >
          🥗
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-5xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5, delay: 2 }}
        >
          🤖
        </motion.div>
      </section>

      {/* AI Services Section - NEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Servicios <span className="text-emerald-600">Inteligentes</span> para tu Estilo Keto
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnología de IA combinada con experiencia profesional para tu bienestar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* AI Chat Service */}
            <motion.div
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Chat con IA Keto</h3>
                  <p className="text-emerald-600 font-semibold">Gratis • Ilimitado</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Conversa con nuestra IA especializada que aprende de tus preferencias y necesidades.
                Obtén recetas personalizadas, consejos nutricionales y recomendaciones de productos.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Recetas keto personalizadas en segundos</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Chat por texto o comando de voz</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Recomendaciones inteligentes de productos</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>Disponible 24/7 sin costo</span>
                </li>
              </ul>

              <Link
                href="/chat-ia"
                className="block text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                Iniciar Chat Gratis →
              </Link>
            </motion.div>

            {/* Nutritionist Service */}
            <motion.div
              className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Nutricionistas Premium</h3>
                  <p className="text-teal-600 font-semibold">Profesionales Certificados</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Accede a consultas personalizadas con nutricionistas certificados especializados en dieta keto.
                Planes nutricionales diseñados específicamente para ti.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Consultas individuales con expertos</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Planes nutricionales personalizados</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Seguimiento profesional continuo</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Especialistas en diabetes, deporte, pérdida de peso</span>
                </li>
              </ul>

              <Link
                href="/nutricionistas"
                className="block text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Ver Nutricionistas →
              </Link>
            </motion.div>
          </div>

          {/* Value Proposition */}
          <motion.div
            className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              ¿Por qué elegir Alkadami Keto?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-emerald-50">
              <div>
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold mb-2">Empieza Gratis</h4>
                <p className="text-sm">Chat con IA sin costo, recetas ilimitadas y consejos personalizados</p>
              </div>
              <div>
                <div className="text-3xl mb-2">👨‍⚕️</div>
                <h4 className="font-semibold mb-2">Respaldo Profesional</h4>
                <p className="text-sm">Acceso a nutricionistas certificados cuando lo necesites</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Resultados Reales</h4>
                <p className="text-sm">Plan integral que combina tecnología y experiencia humana</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalized Features Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Herramientas <span className="text-purple-600">Personalizadas</span> para tu Éxito
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Organiza tu alimentación con nuestras herramientas inteligentes y aumenta tu fidelización
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Weekly Meal Plan */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-green-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4 text-center">📅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Tu plan semanal</h3>
              <p className="text-gray-600 mb-4 text-center">
                Diseñados para perder grasa o ganar músculo
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Planificación de comidas por día</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Seguimiento de calorías y macros</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Personalizado según tus objetivos</span>
                </li>
              </ul>
            </motion.div>

            {/* Smart Recipes */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-teal-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4 text-center">🥗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Recetas Inteligentes</h3>
              <p className="text-gray-600 mb-4 text-center">
                Miles de recetas para cumplir tus macros
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span>Filtrado por macronutrientes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span>Información nutricional completa</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  <span>Agregar directamente a tu plan</span>
                </li>
              </ul>
            </motion.div>

            {/* Shopping Lists */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-blue-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4 text-center">🛒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Listas de compras</h3>
              <p className="text-gray-600 mb-4 text-center">
                Tu plan convertido en una lista para el súper
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>Generación automática desde plan</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>Organización por categorías</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>Marca artículos comprados</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* CTA for Personalized Section */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/personalizados"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              Explorar Herramientas Personalizadas →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Cansado de elegir entre <span className="text-red-500">sabor</span> y <span className="text-emerald-600">salud</span>?
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="text-left"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-red-500 mr-3">⚠️</span>
                    El Problema
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Los postres tradicionales están llenos de azúcar refinada
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Ingredientes artificiales y conservantes dañinos
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Picos de glucosa que afectan tu energía y bienestar
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Sensación de culpa después de cada indulgencia
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="text-left"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-emerald-500 mr-3">✨</span>
                    Nuestra Solución
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      Endulzantes naturales como stevia y monk fruit
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      Ingredientes orgánicos de la más alta calidad
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      Niveles estables de energía sin crashes
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      Disfruta sin culpa, cuidando tu salud
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Sweet & Healthy?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada postre está diseñado pensando en tu bienestar integral
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Sin Azúcar Refinada</h4>
              <p className="text-gray-600">
                Endulzamos con stevia, monk fruit y frutas naturales para cuidar tu salud.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Sin Gluten</h4>
              <p className="text-gray-600">
                Perfectos para personas con intolerancia al gluten o enfermedad celíaca.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Ingredientes Naturales</h4>
              <p className="text-gray-600">
                Solo utilizamos ingredientes orgánicos premium sin conservantes artificiales.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Apto para Diabéticos</h4>
              <p className="text-gray-600">
                Formulaciones especiales que no afectan los niveles de glucosa en sangre.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Catálogo Destacado
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros postres más populares, perfectos para cualquier ocasión
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="h-64 bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center text-8xl relative overflow-hidden">
                  {typeof product.image === "string" && product.image.startsWith("/images/") ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    product.image
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-2xl font-bold text-gray-900">{product.name}</h4>
                    <div className="flex gap-1">
                      {product.isVegan && (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                          🌱 Vegano
                        </span>
                      )}
                      {product.isGlutenFree && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          🚫 Sin Gluten
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <span className="text-3xl font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                      <p className="text-sm text-gray-500">Porción individual</p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/productos"
              className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Catálogo Completo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h3>
            <p className="text-xl text-gray-600">
              Miles de personas ya disfrutan de nuestros postres saludables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &ldquo;Increíble cómo pueden ser tan deliciosos y saludables a la vez. Mi diabetes está controlada y puedo disfrutar de postres nuevamente.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">María González</p>
                  <p className="text-gray-500">Cliente desde 2023</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &ldquo;Perfectos para mi dieta keto. El sabor es espectacular y no me generan ansiedad por azúcar como otros postres.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Dr. Carlos Ruiz</p>
                  <p className="text-gray-500">Nutricionista</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &ldquo;Toda mi familia los ama. Incluso mis hijos piensan que son postres &lsquo;normales&rsquo;. ¡Es genial poder darles algo tan nutritivo!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Ana Martínez</p>
                  <p className="text-gray-500">Madre de familia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-white mb-6">
              ¿Listo para transformar tu relación con los postres?
            </h3>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
              Únete a miles de personas que ya disfrutan de postres deliciosos sin comprometer su salud
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/productos"
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🛍️ Ver Catálogo Completo
              </Link>

              <a
                href="https://wa.me/1234567890?text=¡Hola! Me interesa conocer más sobre sus postres saludables."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-900 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>

            <motion.div
              className="mt-12 grid md:grid-cols-3 gap-8 text-emerald-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                <span>+593 97 122 7655</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span>Respuesta en menos de 1 hora</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-6 h-6" />
                <span>Envío gratuito en pedidos +$50</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
}
