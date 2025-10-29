'use client';

import Navigation from '@/components/Navigation';
import WeeklyMealPlan from '@/components/personalized/WeeklyMealPlan';
import SmartRecipes from '@/components/personalized/SmartRecipes';
import ShoppingLists from '@/components/personalized/ShoppingLists';
import { PersonalizedProvider } from '@/context/PersonalizedContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function PersonalizedPage() {
  return (
    <PersonalizedProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Herramientas Personalizadas
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Apartados <span className="text-emerald-600">Personalizados</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Organiza tu alimentación con nuestras herramientas inteligentes. 
              Aumenta el valor percibido y fomenta la fidelización con una experiencia personal única.
            </p>
          </motion.div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Meal Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <WeeklyMealPlan />
            </motion.div>

            {/* Smart Recipes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SmartRecipes />
            </motion.div>

            {/* Shopping Lists */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ShoppingLists />
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Organiza tu experiencia alimentaria
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Con estas herramientas personalizadas, creas una experiencia organizacional y mucho más personal 
              relacionada a la alimentación del cliente, aumentando el valor percibido de nuestro producto 
              y fomentando la fidelización.
            </p>
          </motion.div>
        </div>
      </div>
    </PersonalizedProvider>
  );
}
