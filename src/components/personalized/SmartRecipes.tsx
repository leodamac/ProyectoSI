'use client';

import { motion } from 'framer-motion';
import { ChefHat, Clock, Flame, Plus } from 'lucide-react';
import { ketoRecipes } from '@/data/recipes';
import { useState } from 'react';
import { usePersonalized } from '@/context/PersonalizedContext';

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export default function SmartRecipes() {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('lunch');
  const { currentMealPlan, addMealToWeek } = usePersonalized();

  const recipe = selectedRecipe ? ketoRecipes.find(r => r.id === selectedRecipe) : ketoRecipes[0];

  const handleAddToMealPlan = () => {
    if (!recipe || !currentMealPlan) return;
    
    // Calculate the date based on selected day index
    const startDate = new Date(currentMealPlan.startDate);
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + selectedDayIndex);
    
    addMealToWeek(currentMealPlan.id, {
      date: targetDate,
      mealType: selectedMealType,
      recipeId: recipe.id,
      calories: recipe.nutritionInfo.calories,
      protein: recipe.nutritionInfo.protein,
      carbs: recipe.nutritionInfo.netCarbs,
      fat: recipe.nutritionInfo.fat,
    });
  };

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  const mealTypes: { value: MealType; label: string; emoji: string }[] = [
    { value: 'breakfast', label: 'Desayuno', emoji: '🍳' },
    { value: 'lunch', label: 'Almuerzo', emoji: '🥗' },
    { value: 'dinner', label: 'Cena', emoji: '🍽️' },
    { value: 'snack', label: 'Snack', emoji: '🥜' },
  ];

  const selectedMealLabel = mealTypes.find(m => m.value === selectedMealType)?.label || 'Almuerzo';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Recetas Inteligentes</h2>
            <p className="text-sm text-gray-600">Miles de recetas para cumplir tus macros</p>
          </div>
          <ChefHat className="w-5 h-5 text-teal-600" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {recipe && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Recipe Image Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-amber-100 via-orange-50 to-red-50 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🥗</div>
                  <div className="text-sm font-medium text-gray-700">{recipe.name}</div>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                  <Clock className="w-3 h-3" />
                  {recipe.prepTime + recipe.cookTime} min
                </div>
              </div>
            </div>

            {/* Recipe Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{recipe.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>

              {/* Macros */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-gray-900">{recipe.nutritionInfo.calories} kcal</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{recipe.nutritionInfo.protein}P</span> |{' '}
                  <span className="font-semibold">{recipe.nutritionInfo.netCarbs}C</span> |{' '}
                  <span className="font-semibold">{recipe.nutritionInfo.fat}F</span>
                </div>
              </div>

              {/* Day and Meal Type Selection */}
              {currentMealPlan && (
                <div className="space-y-3">
                  {/* Day Selection */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Seleccionar Día
                    </label>
                    <div className="grid grid-cols-7 gap-1">
                      {daysOfWeek.map((day, index) => (
                        <button
                          key={day}
                          onClick={() => setSelectedDayIndex(index)}
                          className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                            selectedDayIndex === index
                              ? 'bg-emerald-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meal Type Selection */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Tipo de Comida
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {mealTypes.map((meal) => (
                        <button
                          key={meal.value}
                          onClick={() => setSelectedMealType(meal.value)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                            selectedMealType === meal.value
                              ? 'bg-teal-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <span>{meal.emoji}</span>
                          <span>{meal.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Meal Plan Button */}
                  <button
                    onClick={handleAddToMealPlan}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar a {selectedMealLabel} - {daysOfWeek[selectedDayIndex]}
                  </button>
                </div>
              )}
            </div>

            {/* Recipe Navigation */}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 mb-3">MÁS RECETAS</div>
              <div className="grid grid-cols-3 gap-2">
                {ketoRecipes.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRecipe(r.id)}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      selectedRecipe === r.id || (!selectedRecipe && r.id === ketoRecipes[0].id)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {r.category === 'Desayuno' && '🍳'}
                      {r.category === 'Almuerzo' && '🥗'}
                      {r.category === 'Cena' && '🍽️'}
                      {r.category === 'Snack' && '🥜'}
                    </div>
                    <div className="text-xs font-medium text-gray-900 truncate">
                      {r.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {r.nutritionInfo.calories} kcal
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
