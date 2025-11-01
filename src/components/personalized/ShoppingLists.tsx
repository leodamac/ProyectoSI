'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Calendar, Plus, Copy, Check } from 'lucide-react';
import { usePersonalized } from '@/context/PersonalizedContext';

export default function ShoppingLists() {
  const { currentShoppingList, currentMealPlan, generateShoppingListFromMealPlan, toggleShoppingItem } = usePersonalized();
  const [copied, setCopied] = useState(false);

  const handleGenerateList = () => {
    if (currentMealPlan) {
      generateShoppingListFromMealPlan(currentMealPlan.id);
    }
  };

  const categorizedItems = currentShoppingList
    ? currentShoppingList.items.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {} as Record<string, typeof currentShoppingList.items>)
    : {};

  const categoryLabels = {
    meats: 'Carnes, Aves y Pescados',
    fruits: 'Frutas',
    vegetables: 'Verduras',
    dairy: 'Lácteos',
    pantry: 'Despensa',
    other: 'Otros',
  };

  const handleCopyList = async () => {
    if (!currentShoppingList) return;

    // Format shopping list text with emojis
    let text = '🛒 LISTA DE COMPRAS\n\n';
    
    // Add date range
    text += `📅 ${currentShoppingList.startDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })} - ${currentShoppingList.endDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}\n\n`;

    // Add items by category
    Object.entries(categorizedItems).forEach(([category, items]) => {
      const categoryLabel = categoryLabels[category as keyof typeof categoryLabels] || category;
      text += `\n${categoryLabel}:\n`;
      items.forEach((item) => {
        const emoji = item.emoji || '📦';
        const checked = item.checked ? '✅' : '';
        text += `${emoji} ${item.name} - ${item.quantity} ${item.unit} ${checked}\n`;
      });
    });

    // Add progress
    const checkedCount = currentShoppingList.items.filter(i => i.checked).length;
    const totalCount = currentShoppingList.items.length;
    text += `\n\n📊 Progreso: ${checkedCount}/${totalCount} artículos`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Listas de compras</h2>
            <p className="text-sm text-gray-600">
              {currentShoppingList
                ? 'Tu plan convertido en una lista para el súper'
                : 'Genera tu lista de compras desde tu plan semanal'}
            </p>
          </div>
          <ShoppingCart className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!currentShoppingList ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Genera tu lista de compras</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              {currentMealPlan
                ? 'Convierte tu plan semanal en una lista organizada para el supermercado'
                : 'Primero crea un plan semanal para generar tu lista de compras'}
            </p>
            
            {currentMealPlan && (
              <button
                onClick={handleGenerateList}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Generar Lista de Compras
              </button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Date Range */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span>
                <span className="font-medium">Fecha inicial</span> {currentShoppingList.startDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
              </span>
              <span className="mx-2">•</span>
              <span>
                <span className="font-medium">Fecha final</span> {currentShoppingList.endDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            {/* Shopping Items by Category */}
            <div className="space-y-4">
              {Object.entries(categorizedItems).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    {categoryLabels[category as keyof typeof categoryLabels] || category}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <button
                          onClick={() => toggleShoppingItem(currentShoppingList.id, item.id)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            item.checked
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-gray-300 hover:border-emerald-500'
                          }`}
                        >
                          {item.checked && (
                            <svg className="w-3 h-3 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                        <div className="text-2xl flex-shrink-0">{item.emoji || '📦'}</div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium transition-all ${
                            item.checked ? 'line-through text-gray-400' : 'text-gray-900'
                          }`}>
                            {item.name}
                          </div>
                        </div>
                        <div className={`text-sm font-semibold whitespace-nowrap transition-all ${
                          item.checked ? 'text-gray-400' : 'text-gray-700'
                        }`}>
                          {item.quantity} {item.unit}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            
            {/* Copy Button */}
            <div className="pt-1 border-t border-gray-200">
            <button
                onClick={handleCopyList}
                className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar lista de compra
                  </>
                )}
              </button>
            </div>
            
              {/* Progress */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progreso</span>
                <span className="font-semibold text-gray-900">
                  {currentShoppingList.items.filter(i => i.checked).length}/{currentShoppingList.items.length} artículos
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentShoppingList.items.filter(i => i.checked).length / currentShoppingList.items.length) * 100}%`
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                />
              </div>
              
              
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
