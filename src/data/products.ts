import { Product } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Brownie de Chocolate Negro',
    description: 'Rico brownie con cacao orgánico y endulzado con stevia. Una delicia sin culpa que satisface todos tus antojos de chocolate.',
    price: 15.00,
    image: '🍫',
    category: 'chocolates',
    ingredients: ['cacao orgánico', 'stevia', 'harina de almendra', 'huevos orgánicos', 'aceite de coco'],
    nutritionInfo: {
      calories: 180,
      protein: 6,
      carbs: 12,
      fat: 14,
      sugar: 4
    },
    isVegan: false,
    isGlutenFree: true,
    stock: 24,
    featured: true
  },
  {
    id: '2',
    name: 'Cheesecake de Frutos Rojos',
    description: 'Cremoso cheesecake con fresas y arándanos frescos. Base de galletas de avena sin azúcar refinada.',
    price: 18.00,
    image: '🍰',
    category: 'tortas',
    ingredients: ['queso crema orgánico', 'fresas frescas', 'arándanos', 'galletas de avena', 'miel de agave'],
    nutritionInfo: {
      calories: 220,
      protein: 8,
      carbs: 16,
      fat: 15,
      sugar: 8
    },
    isVegan: false,
    isGlutenFree: false,
    stock: 12,
    featured: true
  },
  {
    id: '3',
    name: 'Muffins de Plátano',
    description: 'Esponjosos muffins con plátano maduro y avena. Perfectos para el desayuno o merienda.',
    price: 12.00,
    image: '🧁',
    category: 'muffins',
    ingredients: ['plátano maduro', 'harina de avena', 'huevos orgánicos', 'miel', 'nueces'],
    nutritionInfo: {
      calories: 160,
      protein: 5,
      carbs: 24,
      fat: 6,
      sugar: 12
    },
    isVegan: false,
    isGlutenFree: true,
    stock: 36,
    featured: true
  },
  {
    id: '4',
    name: 'Cookies de Chía y Limón',
    description: 'Crujientes galletas con semillas de chía y ralladura de limón orgánico. Ricas en omega-3.',
    price: 10.00,
    image: '🍪',
    category: 'galletas',
    ingredients: ['harina de almendra', 'semillas de chía', 'limón orgánico', 'stevia', 'aceite de coco'],
    nutritionInfo: {
      calories: 140,
      protein: 4,
      carbs: 8,
      fat: 11,
      sugar: 2
    },
    isVegan: true,
    isGlutenFree: true,
    stock: 48,
    featured: false
  },
  {
    id: '5',
    name: 'Tarta de Zanahoria',
    description: 'Clásica tarta de zanahoria con especias naturales y frosting de queso crema. Endulzada con miel.',
    price: 22.00,
    image: '🥕',
    category: 'tortas',
    ingredients: ['zanahoria orgánica', 'canela', 'nuez moscada', 'harina de espelta', 'queso crema', 'miel'],
    nutritionInfo: {
      calories: 200,
      protein: 6,
      carbs: 20,
      fat: 12,
      sugar: 14
    },
    isVegan: false,
    isGlutenFree: false,
    stock: 8,
    featured: false
  },
  {
    id: '6',
    name: 'Helado de Coco y Mango',
    description: 'Refrescante helado vegano de coco con trozos de mango natural. Sin lácteos ni azúcar añadida.',
    price: 14.00,
    image: '🥭',
    category: 'helados',
    ingredients: ['leche de coco', 'mango maduro', 'endulzante natural de fruta del monje'],
    nutritionInfo: {
      calories: 120,
      protein: 2,
      carbs: 18,
      fat: 5,
      sugar: 16
    },
    isVegan: true,
    isGlutenFree: true,
    stock: 20,
    featured: false
  }
];

export const categories = [
  { id: 'chocolates', name: 'Chocolates', emoji: '🍫' },
  { id: 'tortas', name: 'Tortas', emoji: '🍰' },
  { id: 'muffins', name: 'Muffins', emoji: '🧁' },
  { id: 'galletas', name: 'Galletas', emoji: '🍪' },
  { id: 'helados', name: 'Helados', emoji: '🍨' }
];