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
  role: 'user' | 'professional' | 'institution';
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
  bio?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  // Professional/Institution specific data
  professionalInfo?: {
    specialty?: string;
    certifications?: string[];
    experience?: number;
    rating?: number;
    reviewCount?: number;
    hourlyRate?: number;
    availability?: {
      day: string;
      hours: string;
    }[];
    languages?: string[];
    institutionId?: string; // For professionals that belong to an institution
  };
  // Institution specific data
  institutionInfo?: {
    type: 'nutrition-center' | 'medical-center' | 'distributor' | 'independent';
    description?: string;
    professionalIds?: string[]; // Professionals managed by this institution
    servicesOffered?: string[];
  };
  // Keto-specific profile data
  ketoProfile?: {
    dietaryRestrictions?: string[];
    allergies?: string[];
    goals?: string[];
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'very-active' | 'extra-active';
    weight?: number;
    height?: number;
    targetWeight?: number;
  };
  preferences?: {
    language?: string;
    notifications?: boolean;
    newsletter?: boolean;
  };
  joinDate?: string;
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

// Appointment System Types
export interface Appointment {
  id: string;
  userId: string; // User who booked the appointment
  professionalId: string; // Professional or institution providing the service
  serviceType: 'consultation' | 'nutrition-plan' | 'follow-up' | 'group-session';
  date: Date;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
  notes?: string;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentId?: string;
  createdAt: Date;
  updatedAt?: Date;
  meetingLink?: string; // For virtual appointments
}

// Payment System Types (Wizard of Oz - Mockup)
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  type: 'appointment' | 'product' | 'subscription';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  method: 'credit-card' | 'debit-card' | 'paypal' | 'bank-transfer';
  relatedId?: string; // appointmentId or orderId
  createdAt: Date;
  completedAt?: Date;
  metadata?: {
    cardLast4?: string;
    cardBrand?: string;
    transactionId?: string;
  };
}