'use client';

import Link from "next/link";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Navigation />

      <section className="py-20 px-4 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-emerald-700 mb-4">Blog de Salud</h1>
          <p className="text-xl text-gray-700">
            Consejos, recetas y artículos para una vida más saludable y dulce.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Ejemplo de artículo 1 */}
          <motion.article
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-emerald-600 mb-2">
              5 Beneficios de Reducir el Azúcar Refinada
            </h2>
            <p className="text-gray-600 mb-4">
              Descubre cómo disminuir el consumo de azúcar puede mejorar tu energía, salud metabólica y bienestar general.
            </p>
            <Link href="#" className="text-emerald-700 font-semibold hover:underline">
              Leer más →
            </Link>
          </motion.article>

          {/* Ejemplo de artículo 2 */}
          <motion.article
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-emerald-600 mb-2">
              Receta: Brownies Keto Sin Gluten
            </h2>
            <p className="text-gray-600 mb-4">
              Aprende a preparar brownies deliciosos, bajos en carbohidratos y aptos para diabéticos.
            </p>
            <Link href="#" className="text-emerald-700 font-semibold hover:underline">
              Leer más →
            </Link>
          </motion.article>
        </div>

        <div className="text-center mt-16">
          <Link href="/" className="text-emerald-600 hover:underline font-semibold">
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}