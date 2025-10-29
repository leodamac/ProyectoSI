'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { WeeklyMealPlan, ShoppingList, MealPlanEntry, ShoppingListItem } from '@/types';

interface PersonalizedContextType {
  mealPlans: WeeklyMealPlan[];
  currentMealPlan: WeeklyMealPlan | null;
  shoppingLists: ShoppingList[];
  currentShoppingList: ShoppingList | null;
  createMealPlan: (plan: Omit<WeeklyMealPlan, 'id'>) => void;
  updateMealPlan: (id: string, updates: Partial<WeeklyMealPlan>) => void;
  addMealToWeek: (mealPlanId: string, meal: Omit<MealPlanEntry, 'id'>) => void;
  removeMealFromWeek: (mealPlanId: string, mealId: string) => void;
  createShoppingList: (list: Omit<ShoppingList, 'id'>) => void;
  updateShoppingList: (id: string, updates: Partial<ShoppingList>) => void;
  toggleShoppingItem: (listId: string, itemId: string) => void;
  generateShoppingListFromMealPlan: (mealPlanId: string) => void;
  setCurrentMealPlan: (id: string | null) => void;
  setCurrentShoppingList: (id: string | null) => void;
}

const PersonalizedContext = createContext<PersonalizedContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MEAL_PLANS: 'alkadami-meal-plans',
  SHOPPING_LISTS: 'alkadami-shopping-lists',
  CURRENT_MEAL_PLAN: 'alkadami-current-meal-plan',
  CURRENT_SHOPPING_LIST: 'alkadami-current-shopping-list',
};

export function PersonalizedProvider({ children }: { children: ReactNode }) {
  const [mealPlans, setMealPlans] = useState<WeeklyMealPlan[]>([]);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [currentMealPlan, setCurrentMealPlanState] = useState<WeeklyMealPlan | null>(null);
  const [currentShoppingList, setCurrentShoppingListState] = useState<ShoppingList | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const loadedMealPlans = localStorage.getItem(STORAGE_KEYS.MEAL_PLANS);
    const loadedShoppingLists = localStorage.getItem(STORAGE_KEYS.SHOPPING_LISTS);
    const loadedCurrentMealPlan = localStorage.getItem(STORAGE_KEYS.CURRENT_MEAL_PLAN);
    const loadedCurrentShoppingList = localStorage.getItem(STORAGE_KEYS.CURRENT_SHOPPING_LIST);

    if (loadedMealPlans) {
      const parsed = JSON.parse(loadedMealPlans);
      // Convert date strings back to Date objects
      const withDates = parsed.map((plan: WeeklyMealPlan) => ({
        ...plan,
        startDate: new Date(plan.startDate),
        endDate: new Date(plan.endDate),
        meals: plan.meals.map(meal => ({
          ...meal,
          date: new Date(meal.date),
        })),
      }));
      setMealPlans(withDates);
    }

    if (loadedShoppingLists) {
      const parsed = JSON.parse(loadedShoppingLists);
      const withDates = parsed.map((list: ShoppingList) => ({
        ...list,
        startDate: new Date(list.startDate),
        endDate: new Date(list.endDate),
      }));
      setShoppingLists(withDates);
    }

    if (loadedCurrentMealPlan) {
      const parsed = JSON.parse(loadedCurrentMealPlan);
      setCurrentMealPlanState({
        ...parsed,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        meals: parsed.meals.map((meal: MealPlanEntry) => ({
          ...meal,
          date: new Date(meal.date),
        })),
      });
    }

    if (loadedCurrentShoppingList) {
      const parsed = JSON.parse(loadedCurrentShoppingList);
      setCurrentShoppingListState({
        ...parsed,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
      });
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLANS, JSON.stringify(mealPlans));
  }, [mealPlans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LISTS, JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  useEffect(() => {
    if (currentMealPlan) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_MEAL_PLAN, JSON.stringify(currentMealPlan));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_MEAL_PLAN);
    }
  }, [currentMealPlan]);

  useEffect(() => {
    if (currentShoppingList) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SHOPPING_LIST, JSON.stringify(currentShoppingList));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SHOPPING_LIST);
    }
  }, [currentShoppingList]);

  const createMealPlan = (plan: Omit<WeeklyMealPlan, 'id'>) => {
    const newPlan: WeeklyMealPlan = {
      ...plan,
      id: `plan-${Date.now()}`,
    };
    setMealPlans(prev => [...prev, newPlan]);
    setCurrentMealPlanState(newPlan);
  };

  const updateMealPlan = (id: string, updates: Partial<WeeklyMealPlan>) => {
    setMealPlans(prev => prev.map(plan => 
      plan.id === id ? { ...plan, ...updates } : plan
    ));
    if (currentMealPlan?.id === id) {
      setCurrentMealPlanState(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const addMealToWeek = (mealPlanId: string, meal: Omit<MealPlanEntry, 'id'>) => {
    const newMeal: MealPlanEntry = {
      ...meal,
      id: `meal-${Date.now()}`,
    };
    
    setMealPlans(prev => prev.map(plan => 
      plan.id === mealPlanId 
        ? { ...plan, meals: [...plan.meals, newMeal] }
        : plan
    ));

    if (currentMealPlan?.id === mealPlanId) {
      setCurrentMealPlanState(prev => prev ? {
        ...prev,
        meals: [...prev.meals, newMeal]
      } : null);
    }
  };

  const removeMealFromWeek = (mealPlanId: string, mealId: string) => {
    setMealPlans(prev => prev.map(plan => 
      plan.id === mealPlanId 
        ? { ...plan, meals: plan.meals.filter(m => m.id !== mealId) }
        : plan
    ));

    if (currentMealPlan?.id === mealPlanId) {
      setCurrentMealPlanState(prev => prev ? {
        ...prev,
        meals: prev.meals.filter(m => m.id !== mealId)
      } : null);
    }
  };

  const createShoppingList = (list: Omit<ShoppingList, 'id'>) => {
    const newList: ShoppingList = {
      ...list,
      id: `list-${Date.now()}`,
    };
    setShoppingLists(prev => [...prev, newList]);
    setCurrentShoppingListState(newList);
  };

  const updateShoppingList = (id: string, updates: Partial<ShoppingList>) => {
    setShoppingLists(prev => prev.map(list => 
      list.id === id ? { ...list, ...updates } : list
    ));
    if (currentShoppingList?.id === id) {
      setCurrentShoppingListState(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const toggleShoppingItem = (listId: string, itemId: string) => {
    setShoppingLists(prev => prev.map(list => 
      list.id === listId 
        ? {
            ...list,
            items: list.items.map(item =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          }
        : list
    ));

    if (currentShoppingList?.id === listId) {
      setCurrentShoppingListState(prev => prev ? {
        ...prev,
        items: prev.items.map(item =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      } : null);
    }
  };

  const generateShoppingListFromMealPlan = (mealPlanId: string) => {
    const plan = mealPlans.find(p => p.id === mealPlanId);
    if (!plan) return;

    // Simplified version - generates sample shopping list
    // TODO: In production, aggregate actual ingredients from recipes in the meal plan
    const items: ShoppingListItem[] = [
      { id: '1', name: 'Huevo', category: 'dairy', quantity: '6', unit: 'und', checked: false, emoji: '🥚' },
      { id: '2', name: 'Carne', category: 'meats', quantity: '225', unit: 'g', checked: false, emoji: '🥩' },
      { id: '3', name: 'Kiwi', category: 'fruits', quantity: '4', unit: 'und', checked: false, emoji: '🥝' },
      { id: '4', name: 'Naranja', category: 'fruits', quantity: '3', unit: 'und', checked: false, emoji: '🍊' },
      { id: '5', name: 'Plátano', category: 'fruits', quantity: '7', unit: 'und', checked: false, emoji: '🍌' },
    ];

    createShoppingList({
      userId: plan.userId,
      name: `Lista de ${plan.startDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}`,
      startDate: plan.startDate,
      endDate: plan.endDate,
      items,
      createdFrom: 'meal-plan',
    });
  };

  const setCurrentMealPlan = (id: string | null) => {
    if (id === null) {
      setCurrentMealPlanState(null);
    } else {
      const plan = mealPlans.find(p => p.id === id);
      setCurrentMealPlanState(plan || null);
    }
  };

  const setCurrentShoppingList = (id: string | null) => {
    if (id === null) {
      setCurrentShoppingListState(null);
    } else {
      const list = shoppingLists.find(l => l.id === id);
      setCurrentShoppingListState(list || null);
    }
  };

  const value: PersonalizedContextType = {
    mealPlans,
    currentMealPlan,
    shoppingLists,
    currentShoppingList,
    createMealPlan,
    updateMealPlan,
    addMealToWeek,
    removeMealFromWeek,
    createShoppingList,
    updateShoppingList,
    toggleShoppingItem,
    generateShoppingListFromMealPlan,
    setCurrentMealPlan,
    setCurrentShoppingList,
  };

  return (
    <PersonalizedContext.Provider value={value}>
      {children}
    </PersonalizedContext.Provider>
  );
}

export function usePersonalized() {
  const context = useContext(PersonalizedContext);
  if (!context) {
    throw new Error('usePersonalized must be used within a PersonalizedProvider');
  }
  return context;
}
