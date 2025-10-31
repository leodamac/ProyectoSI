export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | React.ReactNode;
  category: string;
  ingredients: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar: number;
  };
  isVegan: boolean;
  isGlutenFree: boolean;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'professional' | 'user';
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isPremium?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryDate?: Date;
  notes?: string;
}

export interface Nutritionist {
  id: string;
  name: string;
  specialty: string;
  description: string;
  image: string;
  experience: number;
  rating: number;
  reviewCount: number;
  availability: {
    day: string;
    hours: string;
  }[];
  languages: string[];
  certifications: string[];
  isPremium: boolean;
  price?: number;
}

export interface NutritionistReview {
  id: string;
  nutritionistId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    collectedData?: Record<string, unknown>;
    suggestedProducts?: string[];
    suggestedRecipes?: string[];
  };
}

export interface UserProfile {
  dietaryRestrictions: string[];
  allergies: string[];
  goals: string[];
  preferredMeals: string[];
  activityLevel?: string;
  weight?: number;
  height?: number;
  age?: number;
}

export interface KetoRecipe {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    netCarbs: number;
  };
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  relatedProducts?: string[];
}

// Meal Plan Types
export interface MealPlanEntry {
  id: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WeeklyMealPlan {
  id: string;
  userId?: string;
  startDate: Date;
  endDate: Date;
  goal: 'lose-fat' | 'gain-muscle' | 'maintain';
  dailyCalorieTarget: number;
  meals: MealPlanEntry[];
}

// Shopping List Types
export interface ShoppingListItem {
  id: string;
  name: string;
  category: 'meats' | 'vegetables' | 'fruits' | 'dairy' | 'pantry' | 'other';
  quantity: string;
  unit: string;
  checked: boolean;
  emoji?: string;
}

export interface ShoppingList {
  id: string;
  userId?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  items: ShoppingListItem[];
  createdFrom?: string; // 'meal-plan' or 'manual'
}

// Forum Types
export interface ForumUser {
  id: string;
  username: string;
  avatar: string;
  joinDate: Date;
  postCount: number;
  karma: number;
}

export interface ForumCommunity {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  memberCount: number;
  postCount: number;
  category: string;
  rules?: string[];
  moderators?: string[];
}

export interface ForumPost {
  id: string;
  communityId: string;
  userId: string;
  username: string;
  userAvatar: string;
  title: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  tags?: string[];
  aiSummary?: string;
}

export interface ForumComment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  parentId?: string; // for nested comments
  replies?: ForumComment[];
}