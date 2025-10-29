/**
 * Enhanced AI simulation with intelligent triggers for demo purposes
 * This system detects user intent and triggers contextual interactions
 * including products, nutritionists, forum posts, and location-based recommendations
 */

import { nutritionists, nutritionistReviews } from '@/data/nutritionists';
import { sampleProducts } from '@/data/products';
import { forumPosts } from '@/data/forum';

export interface SimulationTrigger {
  type: 'product' | 'nutritionist' | 'forum' | 'location' | 'recipe' | 'generic';
  data?: unknown;
}

export interface EnhancedResponse {
  text: string;
  trigger?: SimulationTrigger;
  shouldRequestLocation?: boolean;
}

/**
 * Simulates AI-powered review summary
 */
function summarizeReviews(nutritionistId: string): string {
  const reviews = nutritionistReviews.filter(r => r.nutritionistId === nutritionistId);
  
  if (reviews.length === 0) return '';
  
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const positiveCount = reviews.filter(r => r.rating >= 4).length;
  
  return `\n\n📊 **Resumen de ${reviews.length} reseñas** (IA):\n• Calificación promedio: ${avgRating.toFixed(1)}/5.0\n• ${positiveCount} reseñas muy positivas\n• Los pacientes destacan: profesionalismo, resultados efectivos, y seguimiento personalizado`;
}

/**
 * Enhanced message categorization with smart triggers
 */
export function categorizeWithTriggers(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  userLocation?: { latitude: number; longitude: number }
): EnhancedResponse {
  const lower = message.toLowerCase();
  
  // Detect greetings
  if (/(hola|buenos días|buenas tardes|buenas noches|hey|hi|saludos)/i.test(lower) && conversationHistory.length === 0) {
    return {
      text: '¡Hola! 👋 Soy tu asistente personal keto con IA. Puedo ayudarte de muchas formas:\n\n🍳 Recetas personalizadas\n🏪 Recomendar productos\n👨‍⚕️ Conectarte con nutricionistas\n💬 Consejos del foro\n📍 Encontrar especialistas cercanos\n\n¿Qué te gustaría explorar hoy?',
    };
  }

  // Location-based nutritionist recommendation
  if (/(cerca|cercano|ubicación|location|cerca de mí|nearby)/i.test(lower) && /(nutricionista|doctor|especialista)/i.test(lower)) {
    if (!userLocation) {
      return {
        text: '¡Excelente! Para recomendarte nutricionistas cercanos, necesito acceso a tu ubicación. 📍\n\n¿Me permites acceder a tu ubicación para mostrarte los especialistas más cercanos?',
        shouldRequestLocation: true,
      };
    } else {
      // Simulate location-based recommendation
      const nearbyNutritionist = nutritionists[Math.floor(Math.random() * nutritionists.length)];
      const distance = (Math.random() * 5 + 0.5).toFixed(1); // 0.5-5.5 km
      
      return {
        text: `📍 Encontré especialistas cerca de ti:\n\n**${nearbyNutritionist.name}** - ${distance} km de distancia\n${nearbyNutritionist.specialty}\n⭐ ${nearbyNutritionist.rating}/5.0 (${nearbyNutritionist.reviewCount} reseñas)\n💵 $${nearbyNutritionist.price} USD/sesión\n\n🕐 Disponibilidad:\n${nearbyNutritionist.availability.map(a => `• ${a.day}: ${a.hours}`).join('\n')}\n\n¿Te gustaría agendar una cita con ${nearbyNutritionist.name.split(' ')[1]}?`,
        trigger: {
          type: 'nutritionist',
          data: nearbyNutritionist,
        },
      };
    }
  }

  // Nutritionist recommendation with AI review summary
  if (/(nutricionista|doctor|especialista|profesional|consulta)/i.test(lower)) {
    let recommendedNutritionist;
    
    if (/(diabetes|glucosa|azúcar)/i.test(lower)) {
      recommendedNutritionist = nutritionists.find(n => n.id === 'n4');
    } else if (/(deporte|ejercicio|atleta|gym|rendimiento)/i.test(lower)) {
      recommendedNutritionist = nutritionists.find(n => n.id === 'n2');
    } else if (/(peso|adelgazar|bajar|perder|obesidad)/i.test(lower)) {
      recommendedNutritionist = nutritionists.find(n => n.id === 'n3');
    } else {
      recommendedNutritionist = nutritionists.find(n => n.id === 'n1');
    }

    if (recommendedNutritionist) {
      const reviewSummary = summarizeReviews(recommendedNutritionist.id);
      
      return {
        text: `Te recomiendo a **${recommendedNutritionist.name}**\n\n${recommendedNutritionist.specialty}\n\n${recommendedNutritionist.description}\n\n📜 Certificaciones:\n${recommendedNutritionist.certifications.map(c => `• ${c}`).join('\n')}\n\n💵 Consulta: $${recommendedNutritionist.price} USD\n🗣️ Idiomas: ${recommendedNutritionist.languages.join(', ')}${reviewSummary}\n\n¿Quieres que te ayude a agendar una cita?`,
        trigger: {
          type: 'nutritionist',
          data: recommendedNutritionist,
        },
      };
    }
  }

  // Product recommendations
  if (/(producto|comprar|tienda|recomienda.*producto|necesito comprar|snack|chocolate)/i.test(lower)) {
    const isSnackRequest = /(snack|botana|merienda|tentempié)/i.test(lower);
    const isChocolateRequest = /(chocolate|cacao|dulce)/i.test(lower);
    
    let recommendedProducts = [...sampleProducts];
    
    if (isChocolateRequest) {
      recommendedProducts = sampleProducts.filter(p => 
        p.category === 'chocolates' || p.name.toLowerCase().includes('chocolate')
      );
    } else if (isSnackRequest) {
      recommendedProducts = sampleProducts.slice(0, 3);
    } else {
      recommendedProducts = sampleProducts.slice(0, 4);
    }

    const productList = recommendedProducts.map(p => 
      `🛒 **${p.name}** - $${p.price.toFixed(2)}\n   ${p.description}\n   📊 ${p.nutritionInfo.calories} cal | ${p.nutritionInfo.carbs}g carbs`
    ).join('\n\n');

    return {
      text: `¡Tengo excelentes productos keto para ti! 🛍️\n\n${productList}\n\n✨ Todos nuestros productos son bajos en carbohidratos y perfectos para keto.\n\n¿Te gustaría ver más detalles de alguno?`,
      trigger: {
        type: 'product',
        data: recommendedProducts,
      },
    };
  }

  // Forum post citations
  if (/(foro|comunidad|post|discusión|opiniones|experiencias)/i.test(lower)) {
    const relevantPosts = forumPosts.filter(p => {
      // Filter based on content match
      if (/(receta|cocinar)/i.test(lower)) return p.communityId === 'healthy-foodies';
      if (/(ejercicio|gym|fitness)/i.test(lower)) return p.communityId === 'fitness-tribe';
      if (/(motivación|ánimo)/i.test(lower)) return p.communityId === 'healthy-mind';
      
      return true;
    }).slice(0, 2);

    if (relevantPosts.length > 0) {
      const forumSummary = relevantPosts.map(p => 
        `💬 **${p.title}**\n   Por: ${p.username}\n   🤖 IA Resume: ${p.aiSummary}\n   👍 ${p.upvotes} votos | 💬 ${p.commentCount} comentarios`
      ).join('\n\n');

      return {
        text: `Encontré estas discusiones relevantes en nuestro foro:\n\n${forumSummary}\n\n¿Te gustaría que te muestre más detalles de alguna?`,
        trigger: {
          type: 'forum',
          data: relevantPosts,
        },
      };
    }
  }

  // Recipe requests
  if (/(receta|cocinar|preparar|desayuno|almuerzo|cena|comida)/i.test(lower)) {
    const mealType = 
      /(desayuno|breakfast)/i.test(lower) ? 'desayuno' :
      /(almuerzo|lunch|comida)/i.test(lower) ? 'almuerzo' :
      /(cena|dinner)/i.test(lower) ? 'cena' : 'cualquier momento';

    return {
      text: `¡Tengo deliciosas recetas keto de ${mealType}! 🍳\n\n**Opción 1: Huevos Revueltos con Aguacate**\n• 3 huevos orgánicos\n• 1/2 aguacate\n• Queso crema\n• Especias al gusto\n📊 5g carbos | 25g proteína | 30g grasas\n\n**Opción 2: Omelette de Espinacas y Queso**\n• 3 huevos\n• Espinacas frescas\n• Queso cheddar\n• Champiñones\n📊 4g carbos | 28g proteína | 25g grasas\n\n**Opción 3: Bowl de Yogurt Griego Keto**\n• Yogurt griego sin azúcar\n• Nueces y almendras\n• Arándanos (moderado)\n• Semillas de chía\n📊 8g carbos | 15g proteína | 20g grasas\n\n¿Quieres los pasos detallados de alguna?`,
      trigger: {
        type: 'recipe',
        data: { mealType },
      },
    };
  }

  // Weight loss with natural conversation
  if (/(bajar|peso|adelgazar|perder|delgad|obesidad)/i.test(lower)) {
    if (conversationHistory.length < 2) {
      // Start gathering preferences
      return {
        text: '¡Perfecto! Quiero ayudarte a lograr tus objetivos de forma saludable. 💪\n\nPara darte la mejor recomendación, cuéntame:\n\n¿Cuál es tu objetivo principal?\n• Perder peso gradualmente\n• Mejorar composición corporal\n• Aumentar energía\n• Controlar antojos\n\nY también, ¿tienes alguna restricción alimenticia o alergia que deba saber?',
      };
    } else {
      // Provide personalized plan
      return {
        text: 'Basado en tu perfil, te recomiendo:\n\n📋 **Plan Keto Personalizado**\n\n**Macros sugeridos:**\n• Carbos: <20g netos/día\n• Proteína: 100-120g/día\n• Grasas: 70-80% calorías\n\n**Estrategias clave:**\n1️⃣ Ayuno intermitente 16:8\n2️⃣ Hidratación: 2-3L agua diaria\n3️⃣ Electrolitos: sal, magnesio, potasio\n4️⃣ Ejercicio moderado 3-4x semana\n\n💡 **Consejo IA:** Los primeros 3-7 días pueden ser difíciles ("gripe keto"). Es temporal y significa que estás adaptándote.\n\n¿Quieres que te conecte con un nutricionista para un plan más detallado?',
        trigger: {
          type: 'nutritionist',
          data: nutritionists.find(n => n.id === 'n3'),
        },
      };
    }
  }

  // Tips and advice
  if (/(consejo|tip|recomendación|ayuda|sugerencia)/i.test(lower)) {
    const tips = [
      '💡 **Consejo del Día**\n\nPara evitar la "gripe keto", aumenta tu consumo de:\n• Sal del Himalaya (1-2 cucharaditas/día)\n• Magnesio (suplemento o aguacate/nueces)\n• Potasio (espinacas, aguacate)\n\nEsto ayuda con los calambres, fatiga y dolores de cabeza iniciales.',
      '💡 **Estrategia Keto**\n\nLa mejor forma de mantener cetosis:\n\n✅ Mide cetonas (opcional pero útil)\n✅ Mantén carbos <20g netos\n✅ Come cuando tengas hambre\n✅ Bebe agua suficiente\n❌ No temas a las grasas saludables\n❌ No comas si no tienes hambre',
      '💡 **Hack Keto**\n\nMeal prep dominical:\n\n1. Cocina proteínas a granel (pollo, carne)\n2. Prepara vegetales cortados\n3. Haz salsas keto caseras\n4. Almacena en porciones\n\n¡Ahorras tiempo toda la semana! 🕐',
    ];
    
    return {
      text: tips[Math.floor(Math.random() * tips.length)],
    };
  }

  // Default response with natural conversation
  return {
    text: 'Entiendo. Para ayudarte mejor, ¿podrías contarme más?\n\nPuedo asistirte con:\n\n🍽️ Recetas y planes de comidas\n📊 Calcular tus macros\n🛒 Recomendar productos keto\n👨‍⚕️ Conectarte con nutricionistas\n💪 Consejos de fitness\n📍 Encontrar especialistas cercanos\n\n¿Qué te interesa más?',
  };
}

/**
 * Streaming simulation with enhanced responses
 */
export async function* simulateEnhancedStreamingResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  userLocation?: { latitude: number; longitude: number },
  wordDelay: number = 30
): AsyncGenerator<{ text: string; trigger?: SimulationTrigger; shouldRequestLocation?: boolean }, void, unknown> {
  const response = categorizeWithTriggers(userMessage, conversationHistory, userLocation);
  const words = response.text.split(' ');
  
  // Initial delay before starting
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  for (const word of words) {
    yield { text: word + ' ', trigger: undefined };
    await new Promise((resolve) => setTimeout(resolve, wordDelay));
  }
  
  // Send trigger data at the end if any
  if (response.trigger || response.shouldRequestLocation) {
    yield { 
      text: '', 
      trigger: response.trigger,
      shouldRequestLocation: response.shouldRequestLocation 
    };
  }
}
