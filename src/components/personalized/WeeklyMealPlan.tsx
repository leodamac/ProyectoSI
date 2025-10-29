'use client';

import { motion } from 'framer-motion';
import { Calendar, Plus, Target, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { usePersonalized } from '@/context/PersonalizedContext';
import { ketoRecipes } from '@/data/recipes';
import { useState } from 'react';

export default function WeeklyMealPlan() {
  const { currentMealPlan, createMealPlan, addMealToWeek } = usePersonalized();
  const [selectedGoal, setSelectedGoal] = useState<'lose-fat' | 'gain-muscle' | 'maintain'>('lose-fat');

  const handleCreatePlan = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

    createMealPlan({
      startDate: startOfWeek,
      endDate: endOfWeek,
      goal: selectedGoal,
      dailyCalorieTarget: selectedGoal === 'lose-fat' ? 2000 : selectedGoal === 'gain-muscle' ? 2500 : 2200,
      meals: [],
    });
  };

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const getCaloriesForWeek = () => {
    if (!currentMealPlan) return { current: 0, target: 0 };
    
    const totalCalories = currentMealPlan.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const daysInPlan = Math.ceil((currentMealPlan.endDate.getTime() - currentMealPlan.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const targetCalories = currentMealPlan.dailyCalorieTarget * daysInPlan;
    
    return {
      current: totalCalories,
      target: targetCalories,
    };
  };

  const getMealsForDay = (dayIndex: number) => {
    if (!currentMealPlan) return [];
    
    const startDate = new Date(currentMealPlan.startDate);
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + dayIndex);
    
    return currentMealPlan.meals.filter(meal => {
      const mealDate = new Date(meal.date);
      return mealDate.toDateString() === targetDate.toDateString();
    });
  };

  const calories = getCaloriesForWeek();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Tu plan semanal</h2>
            <p className="text-sm text-gray-600">
              {currentMealPlan 
                ? `Diseñado para ${currentMealPlan.goal === 'lose-fat' ? 'perder grasa' : currentMealPlan.goal === 'gain-muscle' ? 'ganar músculo' : 'mantener peso'}`
                : 'Diseñados para perder grasa o ganar músculo'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {currentMealPlan?.goal === 'lose-fat' && <TrendingDown className="w-5 h-5 text-green-600" />}
            {currentMealPlan?.goal === 'gain-muscle' && <TrendingUp className="w-5 h-5 text-blue-600" />}
            {currentMealPlan?.goal === 'maintain' && <Activity className="w-5 h-5 text-gray-600" />}
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!currentMealPlan ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crea tu primer plan semanal</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                Selecciona tu objetivo y te ayudaremos a planificar tus comidas de la semana
              </p>
              
              {/* Goal Selection */}
              <div className="flex gap-3 justify-center mb-6">
                <button
                  onClick={() => setSelectedGoal('lose-fat')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGoal === 'lose-fat'
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  <TrendingDown className="w-4 h-4 inline mr-1" />
                  Perder Grasa
                </button>
                <button
                  onClick={() => setSelectedGoal('gain-muscle')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGoal === 'gain-muscle'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Ganar Músculo
                </button>
                <button
                  onClick={() => setSelectedGoal('maintain')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGoal === 'maintain'
                      ? 'bg-gray-100 text-gray-700 border-2 border-gray-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  <Activity className="w-4 h-4 inline mr-1" />
                  Mantener
                </button>
              </div>
            </div>
            
            <button
              onClick={handleCreatePlan}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Crear Plan Semanal
            </button>
          </div>
        ) : (
          <>
            {/* Calories Progress */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Calorías Planeadas</span>
                <span className="text-lg font-bold text-gray-900">
                  {calories.current.toLocaleString()}/{calories.target.toLocaleString()} kcal
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((calories.current / calories.target) * 100, 100)}%` }}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full"
                />
              </div>
            </div>

            {/* Weekly Calendar */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day, index) => {
                const mealsForDay = getMealsForDay(index);
                const totalCalories = mealsForDay.reduce((sum, meal) => sum + meal.calories, 0);
                const hasBreakfast = mealsForDay.some(m => m.mealType === 'breakfast');
                const hasLunch = mealsForDay.some(m => m.mealType === 'lunch');
                const hasDinner = mealsForDay.some(m => m.mealType === 'dinner');

                return (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 rounded-lg p-2 hover:border-emerald-300 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-xs font-semibold text-gray-600 mb-1">{day}</div>
                      <div className="text-xs text-gray-500 mb-2">
                        {new Date(currentMealPlan.startDate.getTime() + index * 24 * 60 * 60 * 1000).getDate()}
                      </div>
                      {mealsForDay.length > 0 ? (
                        <>
                          <div className="flex gap-1 justify-center mb-1">
                            {hasBreakfast && <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" title="Breakfast" />}
                            {hasLunch && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" title="Lunch" />}
                            {hasDinner && <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" title="Dinner" />}
                          </div>
                          <div className="text-xs font-bold text-emerald-600">
                            {totalCalories} kcal
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-center">
                          <button className="w-5 h-5 rounded-full border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-colors flex items-center justify-center">
                            <Plus className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sample Meal Entry (Demo) */}
            {currentMealPlan.meals.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Comidas planeadas</h3>
                <div className="space-y-2">
                  {currentMealPlan.meals.slice(0, 3).map(meal => {
                    const recipe = ketoRecipes.find(r => r.id === meal.recipeId);
                    return (
                      <div key={meal.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-xl">
                          {meal.mealType === 'breakfast' && '🍳'}
                          {meal.mealType === 'lunch' && '🥗'}
                          {meal.mealType === 'dinner' && '🍽️'}
                          {meal.mealType === 'snack' && '🥜'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {recipe?.name || 'Comida'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {meal.calories} kcal | {meal.protein}P {meal.carbs}C {meal.fat}F
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
