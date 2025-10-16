import { KetoRecipe } from '@/types';

export const ketoRecipes: KetoRecipe[] = [
  {
    id: 'r1',
    name: 'Aguacate Relleno de Huevo y Tocino',
    description: 'Desayuno keto perfecto con grasas saludables y proteína. Rico en nutrientes y muy satisfactorio.',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      { name: 'Aguacates grandes', amount: '2 unidades' },
      { name: 'Huevos', amount: '4 unidades' },
      { name: 'Tocino sin azúcar', amount: '4 tiras' },
      { name: 'Queso cheddar rallado', amount: '1/4 taza' },
      { name: 'Sal y pimienta', amount: 'Al gusto' },
      { name: 'Perejil fresco', amount: 'Para decorar' }
    ],
    instructions: [
      'Precalienta el horno a 200°C (400°F)',
      'Corta los aguacates por la mitad y retira el hueso',
      'Con una cuchara, retira un poco de pulpa para hacer espacio',
      'Cocina el tocino hasta que esté crujiente y córtalo en trozos',
      'Coloca las mitades de aguacate en una bandeja de horno',
      'Rompe un huevo en cada mitad de aguacate',
      'Espolvorea con queso, tocino, sal y pimienta',
      'Hornea por 15-20 minutos hasta que el huevo esté cocido',
      'Decora con perejil fresco y sirve caliente'
    ],
    nutritionInfo: {
      calories: 420,
      protein: 18,
      carbs: 12,
      fat: 36,
      fiber: 9,
      netCarbs: 3
    },
    category: 'Desayuno',
    difficulty: 'easy',
    tags: ['keto', 'bajo-en-carbohidratos', 'alto-en-grasas', 'desayuno', 'brunch'],
    relatedProducts: ['1', '4']
  },
  {
    id: 'r2',
    name: 'Ensalada César Keto con Pollo',
    description: 'Versión keto de la clásica ensalada César. Cremosa, deliciosa y perfecta para almuerzo.',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: 'Lechuga romana', amount: '2 tazas picadas' },
      { name: 'Pechuga de pollo', amount: '300g' },
      { name: 'Queso parmesano', amount: '1/2 taza rallado' },
      { name: 'Mayonesa sin azúcar', amount: '1/4 taza' },
      { name: 'Aceite de oliva', amount: '2 cucharadas' },
      { name: 'Jugo de limón', amount: '1 cucharada' },
      { name: 'Ajo en polvo', amount: '1/2 cucharadita' },
      { name: 'Anchoas (opcional)', amount: '2-3 filetes' }
    ],
    instructions: [
      'Sazona y cocina el pollo a la parrilla hasta que esté dorado',
      'Corta el pollo en tiras o cubos',
      'Mezcla la mayonesa, jugo de limón, ajo y anchoas para el aderezo',
      'En un bowl grande, combina la lechuga romana',
      'Agrega el pollo y el queso parmesano',
      'Vierte el aderezo y mezcla bien',
      'Sirve inmediatamente'
    ],
    nutritionInfo: {
      calories: 480,
      protein: 42,
      carbs: 6,
      fat: 32,
      fiber: 2,
      netCarbs: 4
    },
    category: 'Almuerzo',
    difficulty: 'easy',
    tags: ['keto', 'ensalada', 'pollo', 'almuerzo', 'bajo-carbohidratos'],
    relatedProducts: ['2']
  },
  {
    id: 'r3',
    name: 'Salmón al Horno con Mantequilla de Ajo',
    description: 'Cena elegante y nutritiva. Rico en omega-3 y grasas saludables.',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      { name: 'Filetes de salmón', amount: '2 piezas (200g c/u)' },
      { name: 'Mantequilla grass-fed', amount: '3 cucharadas' },
      { name: 'Ajo picado', amount: '3 dientes' },
      { name: 'Limón', amount: '1 unidad' },
      { name: 'Espárragos', amount: '200g' },
      { name: 'Sal marina', amount: 'Al gusto' },
      { name: 'Pimienta negra', amount: 'Al gusto' },
      { name: 'Eneldo fresco', amount: 'Para decorar' }
    ],
    instructions: [
      'Precalienta el horno a 200°C (400°F)',
      'Coloca el salmón en una bandeja con papel pergamino',
      'Derrite la mantequilla con el ajo picado',
      'Vierte la mantequilla de ajo sobre el salmón',
      'Exprime jugo de limón sobre los filetes',
      'Sazona con sal y pimienta',
      'Agrega los espárragos alrededor del salmón',
      'Hornea por 15-20 minutos hasta que el salmón esté cocido',
      'Decora con eneldo fresco y rodajas de limón'
    ],
    nutritionInfo: {
      calories: 520,
      protein: 45,
      carbs: 8,
      fat: 35,
      fiber: 3,
      netCarbs: 5
    },
    category: 'Cena',
    difficulty: 'medium',
    tags: ['keto', 'pescado', 'omega-3', 'cena', 'elegante'],
    relatedProducts: ['3']
  },
  {
    id: 'r4',
    name: 'Fat Bombs de Chocolate y Mantequilla de Almendra',
    description: 'Snack keto perfecto para cuando necesitas grasas saludables y algo dulce.',
    prepTime: 10,
    cookTime: 0,
    servings: 12,
    ingredients: [
      { name: 'Mantequilla de almendra', amount: '1/2 taza' },
      { name: 'Aceite de coco', amount: '1/4 taza' },
      { name: 'Cacao en polvo sin azúcar', amount: '3 cucharadas' },
      { name: 'Stevia o eritritol', amount: '2 cucharadas' },
      { name: 'Extracto de vainilla', amount: '1 cucharadita' },
      { name: 'Sal marina', amount: 'Una pizca' }
    ],
    instructions: [
      'Derrite suavemente el aceite de coco',
      'En un bowl, mezcla todos los ingredientes hasta que estén suaves',
      'Vierte la mezcla en moldes para mini muffins o cubitos de hielo',
      'Refrigera por al menos 2 horas hasta que estén firmes',
      'Desmolda y guarda en un contenedor hermético en el refrigerador',
      'Consume 1-2 bombas cuando necesites energía o grasas saludables'
    ],
    nutritionInfo: {
      calories: 110,
      protein: 2,
      carbs: 3,
      fat: 11,
      fiber: 1,
      netCarbs: 2
    },
    category: 'Snack',
    difficulty: 'easy',
    tags: ['keto', 'snack', 'fat-bombs', 'chocolate', 'dulce'],
    relatedProducts: ['1', '6']
  },
  {
    id: 'r5',
    name: 'Pizza Keto con Base de Coliflor',
    description: 'Disfruta de pizza sin culpa con esta base baja en carbohidratos.',
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: 'Coliflor rallada', amount: '3 tazas' },
      { name: 'Queso mozzarella', amount: '2 tazas rallado' },
      { name: 'Huevos', amount: '2 unidades' },
      { name: 'Queso parmesano', amount: '1/4 taza' },
      { name: 'Orégano seco', amount: '1 cucharadita' },
      { name: 'Salsa de tomate sin azúcar', amount: '1/2 taza' },
      { name: 'Toppings keto a elección', amount: 'Al gusto' }
    ],
    instructions: [
      'Cocina la coliflor al vapor y déjala enfriar',
      'Exprime el exceso de agua con un paño de cocina',
      'Mezcla la coliflor con 1 taza de mozzarella, huevos, parmesano y orégano',
      'Extiende la mezcla en una bandeja formando la base de pizza',
      'Hornea a 220°C (425°F) por 20 minutos hasta que esté dorada',
      'Retira del horno y agrega salsa y toppings',
      'Cubre con el resto de mozzarella',
      'Hornea otros 10 minutos hasta que el queso se derrita',
      'Deja reposar 5 minutos antes de cortar'
    ],
    nutritionInfo: {
      calories: 280,
      protein: 20,
      carbs: 12,
      fat: 18,
      fiber: 4,
      netCarbs: 8
    },
    category: 'Cena',
    difficulty: 'medium',
    tags: ['keto', 'pizza', 'coliflor', 'bajo-carbohidratos', 'italiano'],
    relatedProducts: ['2', '5']
  }
];

// Mock AI recipe generation function (Wizard of Oz approach)
export function generateKetoRecipe(userPreferences: {
  mealType?: string;
  ingredients?: string[];
  cookingTime?: number;
  difficulty?: string;
  dietaryRestrictions?: string[];
}): KetoRecipe {
  // In a real implementation, this would call an AI service
  // For now, we return a recipe that matches the preferences
  
  const filteredRecipes = ketoRecipes.filter(recipe => {
    if (userPreferences.mealType && recipe.category.toLowerCase() !== userPreferences.mealType.toLowerCase()) {
      return false;
    }
    if (userPreferences.difficulty && recipe.difficulty !== userPreferences.difficulty) {
      return false;
    }
    if (userPreferences.cookingTime && (recipe.prepTime + recipe.cookTime) > userPreferences.cookingTime) {
      return false;
    }
    return true;
  });

  return filteredRecipes.length > 0 
    ? filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)]
    : ketoRecipes[0];
}
