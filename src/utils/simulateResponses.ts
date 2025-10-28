/**
 * Simulates AI responses based on user input.
 * This is a mock implementation for demo purposes without paid services.
 */

export interface SimulatedResponse {
  text: string;
  delay?: number;
}

const RESPONSE_DELAY = 800; // Base delay in milliseconds

// Response templates organized by category
const responseTemplates = {
  greetings: [
    '¡Hola! 👋 Soy tu asistente de nutrición keto. ¿En qué puedo ayudarte hoy?',
    '¡Hola! Me alegra verte. ¿Quieres que te ayude con recetas, consejos o información sobre keto?',
    '¡Bienvenido! Estoy aquí para ayudarte con todo lo relacionado a la dieta cetogénica. ¿Qué necesitas?',
  ],
  
  recipes: [
    'Claro, tengo varias recetas keto deliciosas para ti:\n\n🥑 **Aguacate Relleno**: Aguacates rellenos de ensalada de atún con mayonesa casera.\n\n🍳 **Huevos Benedict Keto**: Huevos pochados sobre espinacas salteadas con salsa holandesa.\n\n🥓 **Rollitos de Bacon**: Espárragos envueltos en bacon horneado hasta quedar crujiente.\n\n¿Te gustaría los detalles de alguna de estas recetas?',
    'Aquí tienes algunas recetas keto perfectas:\n\n🍰 **Cheesecake Keto**: Sin azúcar, con base de almendras y stevia.\n\n🥗 **Ensalada César**: Con pollo a la parrilla y aderezo casero bajo en carbohidratos.\n\n🍖 **Bistec con Mantequilla**: Filete jugoso con mantequilla de hierbas.\n\n¿Cuál te interesa más?',
  ],
  
  weightLoss: [
    'La dieta keto puede ser muy efectiva para la pérdida de peso. Aquí algunos consejos clave:\n\n• Mantén tus carbohidratos bajo 20-50g diarios\n• Consume grasas saludables (aguacate, aceite de oliva, nueces)\n• Proteína moderada (1.2-1.7g por kg de peso corporal)\n• Bebe abundante agua\n• Considera el ayuno intermitente\n\n¿Te gustaría un plan más detallado?',
    'Para optimizar tu pérdida de peso en keto:\n\n1. **Cetosis**: Mantente en cetosis consistentemente\n2. **Electrolitos**: Suplementa sodio, potasio y magnesio\n3. **Sueño**: Duerme 7-9 horas diarias\n4. **Ejercicio**: Combina cardio con entrenamiento de fuerza\n\n¿Necesitas ayuda con algún aspecto específico?',
  ],
  
  tips: [
    '💡 **Consejo Keto del Día**:\n\nPara evitar la "gripe keto", asegúrate de consumir suficientes electrolitos. Añade más sal a tus comidas y considera suplementos de magnesio y potasio.',
    '💡 **Consejo Keto**:\n\nLos snacks keto pueden sabotear tu progreso. Opta por:\n• Nueces (porción controlada)\n• Queso\n• Aceitunas\n• Chicharrones\n• Aguacate\n\nEvita los "productos keto" procesados.',
  ],
  
  smalltalk: [
    'Me encanta ayudarte con la nutrición keto. ¿Hay algo específico sobre tu dieta o estilo de vida que quieras mejorar?',
    'Estoy aquí para hacer tu viaje keto más fácil. ¿Tienes alguna pregunta sobre recetas, macros o consejos?',
  ],
  
  products: [
    'En nuestra tienda tenemos productos keto de alta calidad:\n\n🍫 **Snacks dulces**: Chocolates sin azúcar, cookies keto\n🥜 **Snacks salados**: Nueces, chicharrones, quesos\n🍞 **Panificación**: Harinas low-carb, pan keto\n🧂 **Condimentos**: Aderezos, salsas sin azúcar\n\n¿Qué tipo de producto buscas?',
  ],
  
  nutritionist: [
    'Excelente decisión consultar con un profesional. Nuestros nutricionistas certificados pueden crear un plan personalizado para ti.\n\nEspecialidades disponibles:\n👨‍⚕️ Nutrición general keto\n🏃‍♂️ Nutrición deportiva\n⚖️ Pérdida de peso\n💉 Manejo de diabetes\n\n¿Te gustaría agendar una consulta?',
  ],
  
  default: [
    'Entiendo. ¿Puedes contarme más sobre lo que necesitas? Puedo ayudarte con recetas, consejos nutricionales, productos o conectarte con un especialista.',
    'Interesante. Para darte la mejor respuesta, ¿podrías darme más detalles? Puedo asistirte con planes de comidas, recetas, productos keto o asesoría profesional.',
  ],
};

/**
 * Categorizes the user message and returns appropriate response
 */
function categorizeMessage(message: string): string {
  const lower = message.toLowerCase();
  
  // Greetings
  if (/(hola|buenos días|buenas tardes|buenas noches|hey|hi)/i.test(lower)) {
    return getRandomResponse(responseTemplates.greetings);
  }
  
  // Recipes
  if (/(receta|cocinar|preparar|desayuno|almuerzo|cena|snack)/i.test(lower)) {
    return getRandomResponse(responseTemplates.recipes);
  }
  
  // Weight loss
  if (/(bajar|peso|adelgazar|perder|delgad|obesidad)/i.test(lower)) {
    return getRandomResponse(responseTemplates.weightLoss);
  }
  
  // Tips/advice
  if (/(consejo|tip|recomendación|ayuda|sugerencia)/i.test(lower)) {
    return getRandomResponse(responseTemplates.tips);
  }
  
  // Products
  if (/(producto|comprar|tienda|shop|vender)/i.test(lower)) {
    return getRandomResponse(responseTemplates.products);
  }
  
  // Nutritionist
  if (/(nutricionista|doctor|médico|profesional|consulta|agendar|cita)/i.test(lower)) {
    return getRandomResponse(responseTemplates.nutritionist);
  }
  
  // Default
  return getRandomResponse(responseTemplates.default);
}

/**
 * Gets a random response from an array of responses
 */
function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Simulates an AI response with a delay
 */
export async function simulateResponse(
  userMessage: string,
  customDelay?: number
): Promise<SimulatedResponse> {
  const delay = customDelay ?? RESPONSE_DELAY;
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  const text = categorizeMessage(userMessage);
  
  return {
    text,
    delay,
  };
}

/**
 * Simulates streaming response (word by word)
 * Returns an async generator that yields words with delays
 */
export async function* simulateStreamingResponse(
  userMessage: string,
  wordDelay: number = 50
): AsyncGenerator<string, void, unknown> {
  const response = categorizeMessage(userMessage);
  const words = response.split(' ');
  
  // Initial delay before starting
  await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY));
  
  for (const word of words) {
    yield word + ' ';
    await new Promise((resolve) => setTimeout(resolve, wordDelay));
  }
}
