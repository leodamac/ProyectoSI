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
 * Simulates AI-powered review summary with keyword extraction
 */
function summarizeReviews(nutritionistId: string): string {
  const reviews = nutritionistReviews.filter(r => r.nutritionistId === nutritionistId);
  
  if (reviews.length === 0) return '';
  
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const positiveCount = reviews.filter(r => r.rating >= 4).length;
  
  // Extract keywords from reviews
  const stopwords = [
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'y', 'a', 'en', 'que', 'con', 'por', 'para', 
    'es', 'muy', 'lo', 'su', 'al', 'le', 'se', 'me', 'mi', 'tu', 'sus', 'ha', 'pero', 'como', 'más', 'ya', 'no', 
    'sí', 'fue', 'gran', 'todo', 'también', 'porque', 'sobre', 'sin', 'hace', 'bien', 'son', 'si', 'nos', 'da'
  ];
  
  const positiveKeywords = [
    'profesional', 'profesionalismo', 'amable', 'resultados', 'efectivos', 'personalizado', 'seguimiento', 
    'atención', 'dedicación', 'experiencia', 'conocimiento', 'ayuda', 'recomiendo', 'excelente', 'confianza', 
    'mejor', 'apoyo', 'trato', 'paciente', 'explica', 'detallado', 'motiva', 'responsable', 'cambió', 'energía'
  ];
  
  const wordCounts: Record<string, number> = {};
  
  for (const review of reviews) {
    const words = review.comment
      .toLowerCase()
      .replace(/[.,;:¡!¿?\(\)\[\]"]/g, '')
      .split(/\s+/)
      .filter(w => w && !stopwords.includes(w));
    
    for (const word of words) {
      if (positiveKeywords.includes(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    }
  }
  
  // Get top 3 keywords
  const sortedKeywords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);
  
  let highlights = '';
  if (sortedKeywords.length > 0) {
    highlights = `\n• Los pacientes destacan: ${sortedKeywords.join(', ')}`;
  }
  
  return `\n\n📊 **Resumen de ${reviews.length} reseñas** (IA):\n• Calificación promedio: ${avgRating.toFixed(1)}/5.0\n• ${positiveCount} reseñas muy positivas${highlights}`;
}

/**
 * Helper to extract user context from conversation history
 */
function extractUserContext(conversationHistory: Array<{ role: string; content: string }>): {
  hasSharedGoals: boolean;
  hasSharedRestrictions: boolean;
  hasAskedAboutRecipes: boolean;
  hasAskedAboutProducts: boolean;
  hasAskedAboutNutritionists: boolean;
  mentionedVegetarian: boolean;
  mentionedAllergies: boolean;
  mentionedWeightLoss: boolean;
  mentionedDiabetes: boolean;
  mentionedSports: boolean;
} {
  const allUserMessages = conversationHistory.filter(m => m.role === 'user').map(m => m.content.toLowerCase()).join(' ');
  
  // Only count sports if actively doing exercise, not if they say they DON'T exercise
  const mentionsSports = /(crossfit|hago.*deporte|soy.*atleta|voy.*gym|entreno|hago.*fitness|hago.*ejercicio)/i.test(allUserMessages) && 
                         !/(no.*ejercicio|poco ejercicio|sin ejercicio)/i.test(allUserMessages);
  
  return {
    hasSharedGoals: /(kg|kilo|peso.*mes|mes.*peso|plazo|semana|días)/i.test(allUserMessages),
    hasSharedRestrictions: /(vegetariano|vegetariana|vegano|vegana|alergia|intolerancia|no como|no me gusta)/i.test(allUserMessages),
    hasAskedAboutRecipes: /(receta|cocinar|preparar)/i.test(allUserMessages),
    hasAskedAboutProducts: /(producto|comprar|tienda)/i.test(allUserMessages),
    hasAskedAboutNutritionists: /(nutricionista|doctor|profesional|consulta)/i.test(allUserMessages),
    mentionedVegetarian: /(vegetariano|vegetariana|vegano|vegana)/i.test(allUserMessages),
    mentionedAllergies: /(alergia|alérgico|intolerancia)/i.test(allUserMessages),
    mentionedWeightLoss: /(bajar|peso|adelgazar|perder)/i.test(allUserMessages),
    mentionedDiabetes: /(diabetes|diabético|glucosa|azúcar en sangre)/i.test(allUserMessages),
    mentionedSports: mentionsSports,
  };
}

/**
 * Enhanced message categorization with smart triggers and context awareness
 */
export function categorizeWithTriggers(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  userLocation?: { latitude: number; longitude: number }
): EnhancedResponse {
  const lower = message.toLowerCase();
  const context = extractUserContext(conversationHistory);
  
  // Detect greetings - More personalized based on context
  if (/(hola|buenos días|buenas tardes|buenas noches|hey|hi|saludos)/i.test(lower) && conversationHistory.length === 0) {
    // Check if user mentions they have experience in the greeting
    if (/(llevo.*mes|llevo.*año|tengo experiencia)/i.test(lower)) {
      return {
        text: '¡Hola! 👋 Excelente que ya tengas experiencia en keto. Soy **Keto Friend**, tu amigo personal en el estilo de vida cetogénico.\n\n💪 Como ya conoces los fundamentos, puedo ayudarte a optimizar tu keto:\n\n🎯 Variedad en recetas para no aburrirte\n🏋️ Nutrición deportiva y rendimiento\n📊 Ajuste fino de macros\n👨‍⚕️ Acceso a nutricionistas especializados\n💬 Consejos avanzados de la comunidad\n🛒 Productos especializados\n\n¿En qué área te gustaría mejorar hoy? 😊',
      };
    }
    
    return {
      text: '¡Hola! 👋 Soy **Keto Friend**, tu amigo personal en el estilo de vida cetogénico. Estoy aquí para hacer tu viaje keto más fácil y delicioso.\n\n💚 **Puedo ayudarte con:**\n\n🍳 Recetas personalizadas según tus gustos\n🛒 Recomendaciones de productos keto\n👨‍⚕️ Conectarte con nutricionistas expertos\n💬 Compartir lo que dice la comunidad\n📍 Encontrar especialistas cerca de ti\n🎯 Crear planes de comidas personalizados\n💪 Consejos para combinar keto con ejercicio\n\n¿Cuéntame, eres nuevo en keto o ya llevas tiempo en este estilo de vida? 😊',
    };
  }
  
  // Follow-up to greeting - Natural conversation starter (beginner)
  if (/(nuevo|nueva|empezando|principiante|acabo de empezar|primera vez|nunca|no sé)/i.test(lower) && 
      conversationHistory.length >= 1 && conversationHistory.length <= 4 &&
      !/(llevo|meses|años)/i.test(lower)) {
    return {
      text: '¡Genial que estés comenzando! 🌟 La dieta keto puede parecer intimidante al principio, pero no te preocupes, estoy aquí para guiarte paso a paso.\n\n**Los 3 pilares del éxito en keto:**\n\n1️⃣ **Entender tus macros**: Mantener carbohidratos bajo 20-30g netos al día\n2️⃣ **Planificación**: Tener recetas y productos keto a mano\n3️⃣ **Apoyo profesional**: Un nutricionista te ayuda a personalizar todo\n\n💡 **Mi consejo:** Empecemos con lo básico. ¿Qué comida del día te preocupa más? ¿Desayuno, almuerzo o cena? O si prefieres, puedo mostrarte productos keto para empezar tu despensa. 🥑',
    };
  }
  
  // If user says they're experienced (but not if asking about weight loss timeframe)
  if (/(llevo.*mes|llevo.*año|tengo experiencia|ya sé|ya conozco)/i.test(lower) && 
      conversationHistory.length >= 1 && conversationHistory.length <= 4 &&
      !/(bajar|peso|perder|adelgazar)/i.test(lower)) {
    return {
      text: '¡Excelente! Me encanta trabajar con alguien que ya conoce los fundamentos. 💪\n\nYa que tienes experiencia, puedo ayudarte a llevar tu keto al siguiente nivel:\n\n🎯 **Optimización avanzada:**\n• Variedad en recetas para no aburrirte\n• Productos especializados (snacks, postres keto gourmet)\n• Ajuste de macros para objetivos específicos\n• Consultas con nutricionistas para afinar detalles\n\n¿Hay algo específico que quieras mejorar en tu estilo de vida keto actual? Por ejemplo:\n- Más variedad en comidas\n- Optimizar para deporte/rendimiento\n- Recetas más rápidas para tu rutina\n- Control más preciso de resultados',
    };
  }

  // Thank you / positive feedback - Higher priority, placed earlier
  if (/(gracias|thank|excelente|genial|perfecto|me ayudó|me ayudaste|útil)/i.test(lower) && conversationHistory.length > 4) {
    return {
      text: '¡Me alegra mucho poder ayudarte! 💚 Ese es mi propósito como tu Keto Friend.\n\nRecuerda que estoy aquí siempre que me necesites. Puedo ayudarte con:\n\n• Más recetas cuando necesites variedad\n• Resolver dudas sobre síntomas o ajustes\n• Recomendarte productos para facilitarte la vida\n• Conectarte con nutricionistas cuando quieras apoyo profesional\n• ¡Y mucho más!\n\n💡 **Consejo final:** La clave del éxito en keto es la consistencia, no la perfección. Un día "fuera de plan" no arruina tu progreso. ¡Sigue adelante!\n\n¿Hay algo más en lo que pueda ayudarte hoy? 😊',
    };
  }
  
  // Shopping cart / purchase intent
  if (/(carrito|comprar|agregar|añadir|quiero.*producto|me interesa.*producto)/i.test(lower) && context.hasAskedAboutProducts) {
    return {
      text: '¡Genial! Para agregar productos al carrito y completar tu compra:\n\n1️⃣ Haz clic en el botón "Agregar al carrito" de cualquier producto que te mostré\n2️⃣ Revisa tu carrito en el ícono 🛒 arriba\n3️⃣ Puedes contactarnos por WhatsApp para procesar tu pedido\n\n💡 **Tip:** Si es tu primera compra, te recomiendo el "Kit de Inicio Keto" que incluye:\n• Snacks variados\n• Edulcorantes\n• Productos básicos\n• ¡Y un descuento del 15%!\n\n¿Necesitas ayuda para decidir qué comprar o tienes preguntas sobre envíos? 📦',
    };
  }
  
  // Scheduling / appointment
  if (/(agendar|cita|consulta|reservar|horario|disponibilidad|cómo agendo)/i.test(lower) && context.hasAskedAboutNutritionists) {
    return {
      text: '¡Perfecto! Agendar una cita es súper fácil. 📅\n\n**PASOS PARA AGENDAR:**\n\n1️⃣ Selecciona tu nutricionista preferido\n   (Si no estás seguro, puedo recomendarte uno según tus objetivos)\n\n2️⃣ Revisa horarios disponibles en su tarjeta\n   (Generalmente de 8am a 6pm, Lun-Sab)\n\n3️⃣ Click en "Agendar Cita"\n   Te contactaremos por WhatsApp para confirmar\n\n**PRECIOS:**\n• Primera consulta: $40-60 USD (incluye plan personalizado)\n• Seguimientos: $35-45 USD\n• Paquetes: Descuentos en 3+ sesiones\n\n**QUÉ INCLUYE LA CONSULTA:**\n✅ Evaluación completa de tu caso\n✅ Plan nutricional personalizado\n✅ Cálculo exacto de macros\n✅ Lista de compras\n✅ Recetas adaptadas\n✅ Seguimiento por WhatsApp (1 semana)\n\n💡 **Mi recomendación:** La primera consulta es una inversión que vale la pena. El nutricionista ajusta todo específicamente para TI, no solo consejos generales.\n\n¿Quieres que te muestre los nutricionistas disponibles según tu objetivo? 🎯',
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

  // Nutritionist recommendation with AI review summary - Moved before products to prioritize context
  if (/(nutricionista|doctor|especialista|profesional|consulta|ayuda profesional)/i.test(lower)) {
    let recommendedNutritionist;
    
    // Check sports FIRST (most specific context)
    if (/(deporte|ejercicio|atleta|gym|rendimiento|crossfit|fitness|entrenar)/i.test(lower) || context.mentionedSports) {
      recommendedNutritionist = nutritionists.find(n => n.id === 'n2');
    } else if (/(diabetes|glucosa|azúcar)/i.test(lower) || context.mentionedDiabetes) {
      recommendedNutritionist = nutritionists.find(n => n.id === 'n4');
    } else if (/(peso|adelgazar|bajar|perder|obesidad)/i.test(lower) || context.mentionedWeightLoss) {
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


  // Product recommendations - Enhanced with shopping assistance
  if (/(producto|comprar|tienda|recomienda.*producto|necesito comprar|qué.*necesito|snack|chocolate)/i.test(lower)) {
    const isSnackRequest = /(snack|botana|merienda|tentempié)/i.test(lower);
    const isChocolateRequest = /(chocolate|cacao|dulce|postre)/i.test(lower);
    const isStarterKit = /(empezar|principiante|despensa|inicio|todo|completo|necesito.*para|qué.*necesito)/i.test(lower);
    const isBudget = /(barato|económico|precio|ahorro)/i.test(lower);
    const isVegetarian = context.mentionedVegetarian;
    
    // Starter kit for beginners
    if (isStarterKit || (conversationHistory.length <= 10 && /(qué.*necesito|necesito comprar)/i.test(lower))) {
      return {
        text: '¡Excelente pregunta! Para empezar en keto, estos son los productos esenciales que debes tener en tu despensa: 🛒\n\n**Kit Inicial Keto (Básico)**\n\n**Grasas Saludables:**\n🥑 Aceite de coco ($12.99)\n🥑 Aceite de oliva extra virgen ($15.99)\n🧈 Mantequilla grass-fed ($8.99)\n🥜 Mantequilla de almendra ($11.99)\n\n**Proteínas:**\n🥓 Tocino sin azúcar ($7.99)\n🧀 Quesos variados ($18.99 pack)\n🥚 Huevos orgánicos ($5.99)\n\n**Snacks:**\n🍫 Chocolate negro 85% ($4.99)\n🌰 Mix de nueces ($9.99)\n🧀 Chicharrones ($3.99)\n\n**Endulzantes y Condimentos:**\n🍯 Stevia líquida ($8.99)\n🧂 Sal del Himalaya ($6.99)\n🌿 Especias variadas ($12.99)\n\n💰 **Total aproximado:** $130-150 USD\n⏰ **Duración:** 2-3 semanas\n\n💡 **Tip de ahorro:** Empieza con los básicos (aceites, huevos, queso, verduras) y ve agregando poco a poco.\n\n¿Quieres que te muestre productos específicos de nuestra tienda? Tengo ofertas especiales en packs de inicio. 😊',
        trigger: {
          type: 'product',
          data: sampleProducts.slice(0, 6),
        },
      };
    }
    
    // Budget-friendly options
    if (isBudget) {
      return {
        text: '¡Entiendo perfectamente! La dieta keto no tiene que ser cara. Aquí están mis recomendaciones económicas: 💰\n\n**Productos Keto Económicos:**\n\n**Proteínas Accesibles:**\n🥚 Huevos ($5.99/docena)\n   • Más versátil y económico\n   • 0.5g carbos por huevo\n\n🐔 Pollo entero ($8.99/kg)\n   • Más barato que pechuga sola\n   • Puedes usar todo\n\n🥫 Atún en lata ($1.99/lata)\n   • Conveniente y duradero\n   • Alto en proteína\n\n**Grasas Saludables:**\n🥑 Aguacates ($1.50 c/u)\n   • En temporada son baratos\n   • Multiusos\n\n🧈 Mantequilla regular ($4.99)\n   • No necesita ser grass-fed para empezar\n   • Dura mucho\n\n**Snacks Económicos:**\n🧀 Queso en barra ($6.99)\n   • Corta porciones tú mismo\n   • Más barato que pre-cortado\n\n🌰 Cacahuates naturales ($3.99)\n   • Grasa saludable\n   • Saciante\n\n💡 **Tips para ahorrar:**\n1. Compra al mayoreo (aceites, nueces)\n2. Busca ofertas de proteínas\n3. Meal prep = menos desperdicio\n4. Productos de marca propia vs. marca\n\n**Kit económico semanal:** $35-45 USD\n\n¿Te muestro recetas económicas que puedes hacer con estos productos? 🍳',
        trigger: {
          type: 'product',
          data: sampleProducts.filter((_, i) => i % 2 === 0).slice(0, 4),
        },
      };
    }
    
    // Vegetarian products
    if (isVegetarian) {
      return {
        text: '¡Perfecto! Tengo excelentes productos keto vegetarianos para ti: 🌱\n\n**Proteínas Vegetales:**\n🌰 Mantequilla de almendra orgánica ($11.99)\n   • 8g proteína por porción\n   • Grasas saludables\n   • Sin azúcar añadida\n\n🥜 Mix de nueces premium ($9.99)\n   • Almendras, nueces, macadamias\n   • Alto en omega-3\n   • Perfecto para snacking\n\n**Grasas Saludables:**\n🥥 Aceite de coco virgen ($12.99)\n   • MCT naturales\n   • Ideal para cocinar\n   • Aumenta cetonas\n\n🫒 Aceite de oliva extra virgen ($15.99)\n   • Antioxidantes\n   • Anti-inflamatorio\n   • Uso en frío y caliente\n\n**Snacks Vegetarianos:**\n🍫 Chocolate negro 85% cacao ($4.99)\n   • Solo 3g carbos netos\n   • Rico en antioxidantes\n   • Satisface antojos\n\n🧀 Queso de almendras ($8.99)\n   • Alternativa vegetal\n   • Cremoso y delicioso\n   • Versátil en recetas\n\n💰 **Total sugerido:** $63.94\n⏰ **Duración:** 2-3 semanas\n\n💡 **Tip vegetariano:** Combina estos productos con vegetales bajos en carbos (espinacas, brócoli, aguacate) y proteínas vegetales como tofu o tempeh.\n\n✨ **Importante para vegetarianos keto:**\n• Asegura suficiente proteína (1.6-2g por kg)\n• Suplementa con B12 si eres vegano\n• Varía las fuentes de grasas\n• Incluye omega-3 (nueces, semillas de chía)\n\n¿Quieres que te muestre recetas vegetarianas keto para usar estos productos? 🥗',
        trigger: {
          type: 'product',
          data: sampleProducts.slice(0, 5),
        },
      };
    }
    
    let recommendedProducts;
    
    if (isChocolateRequest) {
      recommendedProducts = sampleProducts.filter(p => 
        p.category === 'chocolates' || p.name.toLowerCase().includes('chocolate')
      );
      
      return {
        text: `¡Los chocolates keto son mi debilidad también! 🍫 Aquí están las mejores opciones:\n\n${recommendedProducts.map(p => 
          `**${p.name}** - $${p.price.toFixed(2)}\n${p.description}\n📊 ${p.nutritionInfo.calories} cal | ${p.nutritionInfo.carbs}g carbos netos | ${p.nutritionInfo.protein}g proteína\n⭐ Perfecto para antojos de dulce sin salir de cetosis`
        ).join('\n\n')}\n\n💡 **Consejo:** El chocolate negro (>85% cacao) es ideal en keto. Aporta antioxidantes y grasas saludables.\n\n✨ **Dato curioso:** El chocolate keto puede ayudar a controlar antojos y evitar atracones de azúcar regular.\n\n¿Quieres agregarlo al carrito? También tengo recetas de postres keto con chocolate si te interesa. 🍰`,
        trigger: {
          type: 'product',
          data: recommendedProducts.length > 0 ? recommendedProducts : sampleProducts.slice(0, 2),
        },
      };
    } else if (isSnackRequest) {
      recommendedProducts = sampleProducts.slice(0, 4);
      
      return {
        text: `¡Los snacks keto son esenciales para el éxito! Aquí están mis favoritos: 🎯\n\n${recommendedProducts.map(p => 
          `🛒 **${p.name}** - $${p.price.toFixed(2)}\n   ${p.description}\n   📊 ${p.nutritionInfo.calories} cal | ${p.nutritionInfo.carbs}g carbos | ${p.nutritionInfo.protein}g proteína\n   ✨ Ideal para: ${p.category === 'snacks' ? 'Media mañana/tarde' : 'Cualquier momento'}`
        ).join('\n\n')}\n\n💡 **Tips para snacking keto:**\n1. Ten snacks siempre a mano (evita tentaciones)\n2. Lee etiquetas (algunos "keto" no lo son)\n3. Controla porciones (incluso en keto)\n4. Prioriza snacks con proteína (más saciantes)\n\n**¿Sabías que?** Los mejores snacks keto combinan grasa + proteína para saciedad duradera.\n\n¿Quieres que te ayude a armar un paquete de snacks variados para la semana? 📦`,
        trigger: {
          type: 'product',
          data: recommendedProducts,
        },
      };
    } else {
      recommendedProducts = sampleProducts.slice(0, 5);
      
      return {
        text: `¡Genial! Tenemos productos keto de alta calidad para hacer tu vida más fácil. 🛍️\n\n**Categorías disponibles:**\n\n${recommendedProducts.map(p => 
          `🛒 **${p.name}** - $${p.price.toFixed(2)}\n   ${p.description}\n   📊 ${p.nutritionInfo.calories} cal | ${p.nutritionInfo.carbs}g carbos | ${p.nutritionInfo.fat}g grasas`
        ).join('\n\n')}\n\n✨ **Todos nuestros productos son:**\n• Bajos en carbohidratos (<5g netos)\n• Sin azúcares añadidos\n• Sin ingredientes artificiales\n• Certificados keto-friendly\n\n💡 **Recomendación:** Combina productos con recetas caseras para variedad y ahorro.\n\n¿Quieres ver más detalles de alguno o prefieres que te ayude a armar un paquete personalizado? También puedo mostrarte recetas que usan estos productos. 😊`,
        trigger: {
          type: 'product',
          data: recommendedProducts,
        },
      };
    }
  }

  // Forum post citations - Enhanced community integration
  if (/(foro|comunidad|post|discusión|opiniones|experiencias|qué dicen|otros usuarios)/i.test(lower)) {
    const isAboutRecipes = /(receta|cocinar|comida)/i.test(lower);
    const isAboutExercise = /(ejercicio|gym|fitness|deporte)/i.test(lower);
    const isAboutMotivation = /(motivación|ánimo|apoyo|experiencia)/i.test(lower);
    
    const relevantPosts = forumPosts.filter(p => {
      if (isAboutRecipes) return p.communityId === 'healthy-foodies';
      if (isAboutExercise) return p.communityId === 'fitness-tribe';
      if (isAboutMotivation) return p.communityId === 'healthy-mind';
      return true;
    }).slice(0, 3);

    if (relevantPosts.length > 0) {
      const forumSummary = relevantPosts.map((p, idx) => 
        `**${idx + 1}. ${p.title}**\n   👤 Por: ${p.username}\n   🤖 Resumen IA: ${p.aiSummary}\n   👍 ${p.upvotes} votos | 💬 ${p.commentCount} comentarios`
      ).join('\n\n');

      const categoryName = isAboutRecipes ? 'recetas keto' : isAboutExercise ? 'ejercicio y fitness' : 'experiencias y motivación';

      return {
        text: `¡Excelente pregunta! La comunidad tiene mucho que compartir sobre ${categoryName}. 💬\n\nEstas son las discusiones más relevantes:\n\n${forumSummary}\n\n💡 **Por qué me gusta nuestra comunidad:**\n• Experiencias reales de personas como tú\n• Apoyo mutuo y motivación\n• Tips y trucos probados\n• Recetas compartidas por usuarios\n\n🎯 **Dato interesante:** Los usuarios que participan en la comunidad tienen 3x más probabilidad de mantener sus resultados a largo plazo.\n\n¿Te gustaría que te muestre más detalles de alguna discusión? También puedes compartir tu propia experiencia. ¡La comunidad te apoyará! 💚`,
        trigger: {
          type: 'forum',
          data: relevantPosts,
        },
      };
    }
  }
  
  // Macro calculation and meal planning
  if (/(macro|calcular|cuánto|necesito|calorías|proteína|grasa|carbohidrato)/i.test(lower)) {
    if (/(peso|altura|edad|actividad)/i.test(lower) || conversationHistory.length >= 2) {
      return {
        text: '¡Perfecto! Para calcular tus macros personalizados necesito algunos datos básicos. 📊\n\n**Calculadora de Macros Keto:**\n\n**Información necesaria:**\n1️⃣ **Edad**: años\n2️⃣ **Sexo**: M/F\n3️⃣ **Peso actual**: kg\n4️⃣ **Altura**: cm\n5️⃣ **Nivel de actividad**:\n   • Sedentario (trabajo de oficina)\n   • Ligero (ejercicio 1-3 días/semana)\n   • Moderado (ejercicio 3-5 días/semana)\n   • Activo (ejercicio 6-7 días/semana)\n6️⃣ **Objetivo**:\n   • Pérdida de peso (-)\n   • Mantenimiento (=)\n   • Ganancia muscular (+)\n\n**Ejemplo de resultado (mujer, 30 años, 70kg, sedentaria, pérdida de peso):**\n\n📊 **Macros Diarios:**\n• Calorías: 1,400 kcal\n• Proteína: 105g (30%)\n• Grasas: 109g (70%)\n• Carbos: 20g netos (5%)\n\n**Distribución sugerida:**\n🍳 Desayuno: 400 kcal (30g proteína, 30g grasa)\n🥗 Almuerzo: 500 kcal (40g proteína, 40g grasa)\n🍖 Cena: 500 kcal (35g proteína, 39g grasa)\n\n💡 **Tips importantes:**\n1. Proteína es PRIORITARIA (preserva músculo)\n2. Grasas para saciedad (no temas comerlas)\n3. Carbos son LÍMITE (no objetivo a alcanzar)\n4. Ajusta según energía y resultados\n\n¿Quieres que un nutricionista calcule tus macros exactos y cree un plan personalizado? Es mucho más preciso. 🎯',
        trigger: {
          type: 'nutritionist',
          data: nutritionists[0],
        },
      };
    }
    
    return {
      text: 'Claro, puedo ayudarte a entender tus macros keto. 📊\n\n**Los macros keto básicos son:**\n\n🥑 **Grasas: 70-75%** de calorías totales\n• Energía principal en keto\n• Saciedad y absorción de vitaminas\n\n🥩 **Proteína: 20-25%** de calorías totales\n• Preserva masa muscular\n• Aprox. 1.6-2g por kg de peso ideal\n\n🥬 **Carbohidratos: 5-10%** (20-30g netos/día)\n• Mayormente de vegetales\n• "Netos" = total - fibra\n\n**Ejemplo práctico (1,600 kcal/día):**\n• Grasas: 124g (1,120 kcal)\n• Proteína: 100g (400 kcal)\n• Carbos: 20g (80 kcal)\n\nPara darte números exactos personalizados, necesito saber:\n• Tu peso y altura\n• Nivel de actividad\n• Objetivo (bajar/mantener/ganar)\n\n¿Me compartes esos datos para calcular TUS macros específicos? 😊',
    };
  }

  // Keto flu and side effects
  if (/(gripe|síntoma|dolor|cabeza|cansancio|mareado|calambres|electrolito)/i.test(lower)) {
    return {
      text: '¡Ah, la famosa "gripe keto"! Es totalmente normal y temporal. Te explico: 🤒\n\n**¿Qué es la gripe keto?**\nCuando tu cuerpo cambia de glucosa a cetonas como combustible, puede experimentar síntomas de adaptación.\n\n**Síntomas comunes (días 2-7):**\n😫 Dolor de cabeza\n😴 Fatiga y cansancio\n🤢 Náuseas leves\n💪 Calambres musculares\n🧠 "Brain fog" (mente nublada)\n😠 Irritabilidad\n\n**LA SOLUCIÓN (muy importante):**\n\n🧂 **ELECTROLITOS**\n\n**Sodio:**\n• 5,000-7,000mg/día (2-3 cucharaditas de sal)\n• Añade sal a todo\n• Caldo de huesos\n\n**Magnesio:**\n• 400-500mg/día\n• Suplemento o aguacate/espinacas/nueces\n\n**Potasio:**\n• 3,000-4,000mg/día\n• Aguacate, espinacas, salmón\n\n💧 **Hidratación:**\n• 2.5-4L agua/día\n• Más de lo normal (keto libera agua)\n\n⚡ **Energía:**\n• MCT oil o aceite de coco\n• Café bulletproof\n• Descanso adecuado\n\n**Timeline de mejora:**\n📅 Día 3-5: Pico de síntomas\n📅 Día 7-10: Mejora significativa\n📅 Día 14+: Energía aumenta\n📅 Semana 3-4: Adaptación completa\n\n💡 **CRUCIAL:** La gripe keto es 90% falta de electrolitos. Aumenta sal AHORA y verás mejora en 24-48h.\n\n¿Necesitas recetas de bebidas electrolíticas caseras o prefieres que te muestre productos? 🥤',
    };
  }

  // Dining out and social situations
  if (/(restaurante|salir|comer fuera|fiesta|reunión|social)/i.test(lower)) {
    return {
      text: '¡Excelente pregunta! Mantener keto en situaciones sociales es totalmente posible. Te doy mi guía completa: 🍽️\n\n**RESTAURANTES - Guía por tipo:**\n\n**🥩 Steakhouse/Parrilla**\n✅ Ordenar: Carne + vegetales + ensalada\n✅ Pedir: Mantequilla extra\n❌ Evitar: Papas, pan, salsas dulces\n💡 Tip: Pide que no traigan pan a la mesa\n\n**🍝 Italiano**\n✅ Ordenar: Pollo/pescado a la plancha, ensalada caprese\n✅ Pedir: Extra aceite de oliva\n❌ Evitar: Pasta, pizza, pan de ajo\n💡 Tip: Algunos ofrecen "pasta" de calabacín\n\n**🌮 Mexicano**\n✅ Ordenar: Fajitas (sin tortilla), guacamole, pico de gallo\n✅ Pedir: Ensalada bowl en vez de burrito\n❌ Evitar: Tortillas, arroz, frijoles refritos\n💡 Tip: Chicharrón en vez de totopos\n\n**🍣 Japonés**\n✅ Ordenar: Sashimi, edamame, algas\n✅ Pedir: Salsa de soya, wasabi\n❌ Evitar: Arroz, tempura, rolls con arroz\n💡 Tip: Naruto rolls (envueltos en pepino)\n\n**FIESTAS Y REUNIONES:**\n\n**Antes de ir:**\n1. Come algo antes (no llegues con hambre)\n2. Lleva tu propio snack keto\n3. Avisa al anfitrión (opcional)\n\n**En la fiesta:**\n✅ Buscar: Quesos, embutidos, vegetales, nueces\n✅ Beber: Agua, vino seco, licor con soda\n❌ Evitar: Pan, postres, cerveza, jugos\n\n**Respuestas a preguntas comunes:**\n"¿No comes pan?" → "Estoy evitando carbohidratos"\n"¿Por qué no comes postre?" → "Estoy cuidando mi salud"\n"¿Solo eso comes?" → "Prefiero proteína y vegetales"\n\n💡 **Tip PRO:** Nadie nota realmente qué comes. La gente está enfocada en sí misma.\n\n**Bebidas alcohólicas keto:**\n✅ Whisky, vodka, tequila (puros)\n✅ Vino tinto seco (copa)\n✅ Champagne brut\n❌ Cerveza, cocteles dulces, licores cremosos\n\n¿Necesitas más tips para alguna situación específica? 😊',
    };
  }

  // Recipe requests - Enhanced with context awareness
  if (/(receta|cocinar|preparar|desayuno|almuerzo|cena|comida)/i.test(lower) || 
      (/(pasos|cómo|preparación|instrucciones|detalle|dame.*pasos|dame.*primera)/i.test(lower) && context.hasAskedAboutRecipes)) {
    
    // Detailed recipe follow-up if user asks for steps
    if (/(pasos|cómo.*prepar|instrucciones|detalle|dame.*pasos|dame.*de la primera|dame los pasos)/i.test(lower)) {
      return {
        text: '¡Claro! Te doy los pasos completos de la primera receta:\n\n**🍳 Huevos Revueltos Gourmet con Aguacate**\n\n**Ingredientes:**\n• 3 huevos orgánicos\n• 1/2 aguacate maduro\n• 2 cucharadas de queso crema\n• 2 tiras de tocino crujiente\n• 1 puñado de espinacas baby\n• Sal y pimienta al gusto\n• 1 cucharada de mantequilla\n\n**Preparación (10 minutos):**\n\n1️⃣ **Prepara el tocino**: Cocina el tocino hasta que esté crujiente (5 min), luego córtalo en trocitos\n\n2️⃣ **Bate los huevos**: En un bowl, bate los 3 huevos con sal y pimienta hasta que estén bien mezclados\n\n3️⃣ **Cocina las espinacas**: En la misma sartén del tocino, saltea las espinacas 1 minuto hasta que se ablanden. Reserva.\n\n4️⃣ **Revuelve los huevos**: Calienta la mantequilla a fuego medio, agrega los huevos y revuelve suavemente con espátula\n\n5️⃣ **Termina el platillo**: Cuando los huevos estén casi listos (cremosos), añade el queso crema, tocino y espinacas. Mezcla 30 segundos más.\n\n6️⃣ **Sirve**: Coloca en un plato y acompaña con aguacate en rodajas al lado\n\n💡 **Tips del chef:**\n• No sobre cocines los huevos (deben quedar cremosos, no secos)\n• El aguacate aporta grasas saludables y cremosidad\n• Puedes agregar queso rallado encima\n• Sirve caliente para mejor sabor\n\n📊 **Macros totales:** 5g carbos netos | 30g proteína | 35g grasas | 450 kcal\n\n✨ Esta es una de las recetas favoritas de la comunidad. ¡Perfecta para empezar el día con energía!\n\n¿Quieres que te recomiende productos keto para complementar esta receta o ver más opciones de desayuno? 🥑',
      };
    }
    
    const mealType = 
      /(desayuno|breakfast)/i.test(lower) ? 'desayuno' :
      /(almuerzo|lunch|comida)/i.test(lower) ? 'almuerzo' :
      /(cena|dinner)/i.test(lower) ? 'cena' : 'cualquier momento';
    
    const isVegetarian = context.mentionedVegetarian;
    const isForSports = context.mentionedSports || /(pre-entreno|post-entreno|antes del gym|después del gym|qué.*comer.*gym|qué.*comer.*ejercicio)/i.test(lower);
    const isEasy = /(fácil|rápido|simple|sencillo)/i.test(lower) && !isForSports;

    // Vegetarian recipes
    if (isVegetarian) {
      return {
        text: `¡Perfecto! Tengo opciones vegetarianas keto deliciosas para ${mealType}! 🥗\n\n**Opción 1: Bowl de Tofu Scramble**\n• Tofu firme desmenuzado\n• Espinacas baby\n• Champiñones salteados\n• Aguacate\n• Semillas de hemp\n📊 7g carbos | 20g proteína | 28g grasas\n🌱 Alto en proteína vegetal\n\n**Opción 2: Ensalada Mediterránea Keto**\n• Mix de lechugas\n• Queso feta\n• Aceitunas kalamata\n• Pepino y tomate cherry\n• Aderezo de aceite de oliva\n📊 6g carbos | 12g proteína | 35g grasas\n🥗 Fresca y saciante\n\n**Opción 3: Panqueques de Almendra**\n• Harina de almendra\n• Huevos\n• Mantequilla de almendra\n• Stevia y canela\n📊 5g carbos | 18g proteína | 30g grasas\n🥞 Perfecto para desayuno dulce\n\n¿Cuál te llama más la atención? ¡Puedo darte los pasos detallados! 😊`,
        trigger: {
          type: 'recipe',
          data: { mealType, vegetarian: true },
        },
      };
    }

    // Sports/performance recipes
    if (isForSports) {
      return {
        text: `¡Genial! Como atleta/deportista, necesitas recetas que optimicen tu rendimiento. 💪\n\n**Pre-Entreno (30-60 min antes):**\n\n**Café Bulletproof Mejorado**\n• Café negro\n• 1 cucharada MCT oil\n• 1 cucharada mantequilla grass-fed\n• Colágeno en polvo (opcional)\n📊 1g carbos | 15g proteína | 30g grasas\n⚡ Energía sostenida sin crash\n\n**Post-Entreno (dentro de 2 horas):**\n\n**Bowl de Recuperación**\n• 150g pollo o salmón\n• Espinacas salteadas en aceite de coco\n• Aguacate\n• Nueces picadas\n• Semillas de chía\n📊 8g carbos | 40g proteína | 35g grasas\n🏋️ Óptimo para recuperación muscular\n\n**Snack Rápido:**\n\n**Fat Bombs Energéticas**\n• Mantequilla de almendra\n• Aceite de coco\n• Cacao puro\n• Stevia\n• Sal marina\n📊 3g carbos | 5g proteína | 25g grasas\n🎯 Ideal para energía rápida\n\n💡 **Consejo Pro:** Las grasas MCT son ideales para deportistas keto porque se convierten rápidamente en energía.\n\n¿Quieres que te conecte con nuestro nutricionista deportivo para un plan personalizado? 🏃‍♂️`,
        trigger: {
          type: 'recipe',
          data: { mealType, sports: true },
        },
      };
    }

    // Easy/quick recipes
    if (isEasy) {
      return {
        text: `¡Entiendo! Aquí están mis recetas keto más rápidas y fáciles (menos de 10 minutos): ⚡\n\n**1. Ensalada Express (3 min)**\n• Mix de lechugas pre-lavadas\n• Atún en lata\n• Aguacate en cubos\n• Aceite de oliva y limón\n📊 4g carbos | 30g proteína | 25g grasas\n✨ Solo mezclar, sin cocinar\n\n**2. Omelette Microondas (2 min)**\n• 2 huevos batidos en taza\n• Queso rallado\n• Jamón picado\n• Microondas 90 segundos\n📊 2g carbos | 25g proteína | 20g grasas\n🔥 Súper rápido para días ocupados\n\n**3. Plato de Embutidos y Queso (1 min)**\n• Salami, pepperoni\n• Quesos variados\n• Aceitunas\n• Nueces\n📊 3g carbos | 20g proteína | 35g grasas\n🧀 Perfecto para cuando tienes prisa\n\n💡 **Tip:** Puedes hacer meal prep los domingos y tener estas opciones listas en el refrigerador toda la semana.\n\n¿Te interesa ver productos keto que puedes comprar ya preparados para facilitarte aún más la vida? 🛒`,
        trigger: {
          type: 'recipe',
          data: { mealType, quick: true },
        },
      };
    }

    // Default comprehensive recipes
    return {
      text: `¡Tengo deliciosas recetas keto para ${mealType}! Preparadas pensando en máxima nutrición y sabor 🍳\n\n**Opción 1: Huevos Revueltos Gourmet**\n• 3 huevos orgánicos\n• 1/2 aguacate\n• Queso crema\n• Tocino crujiente\n• Espinacas baby\n📊 5g carbos | 30g proteína | 35g grasas\n⭐ Favorita de la comunidad\n\n**Opción 2: Salmón con Vegetales Asados**\n• Filete de salmón\n• Brócoli y espárragos\n• Mantequilla de ajo\n• Limón\n📊 6g carbos | 35g proteína | 28g grasas\n🐟 Alto en Omega-3\n\n**Opción 3: Ensalada César Keto**\n• Lechuga romana\n• Pollo a la plancha\n• Parmesano\n• Aderezo césar casero\n• Tocino bits\n📊 7g carbos | 32g proteína | 30g grasas\n🥗 Clásica y saciante\n\n¿Te interesa ver los pasos detallados de alguna? O si prefieres, puedo mostrarte productos keto relacionados que tenemos en la tienda. 😊`,
      trigger: {
        type: 'recipe',
        data: { mealType },
      },
    };
  }

  // Weight loss - Multi-turn natural conversation with context
  if (/(bajar|peso|adelgazar|perder|delgad|obesidad)/i.test(lower)) {
    // Second interaction - provide detailed plan (detect when user shares specific details)
    if (context.hasSharedGoals && context.hasSharedRestrictions && conversationHistory.length >= 2) {
      return {
        text: '¡Excelente! Con esta información puedo ayudarte mucho mejor. Aquí está tu plan inicial personalizado: 📋\n\n**🎯 Plan Keto Personalizado para Pérdida de Peso**\n\n**Fase 1: Adaptación (Semanas 1-2)**\n• Objetivo: Entrar en cetosis\n• Carbos: <20g netos/día\n• Enfócate en alimentos naturales\n• Bebe 2-3L de agua diaria\n• Electrolitos: sal, magnesio, potasio\n\n**Fase 2: Optimización (Semanas 3-8)**\n• Objetivo: Pérdida de peso sostenida\n• Carbos: 20-30g netos/día\n• Ayuno intermitente 16:8 (opcional)\n• Incorpora ejercicio ligero\n• Mide progreso (no solo balanza)\n\n**Fase 3: Mantenimiento (Mes 3+)**\n• Objetivo: Mantener resultados\n• Carbos: 30-50g netos/día (personalizado)\n• Estilo de vida, no dieta temporal\n• Flexibilidad controlada\n\n📊 **Macros sugeridos:**\n• Proteína: 1.6-2g por kg de peso ideal\n• Grasas: 70-75% de calorías totales\n• Carbos: <20g netos en fase inicial\n\n💡 **Expectativas realistas:**\n• Semana 1-2: 2-4 kg (mayormente agua)\n• Después: 0.5-1 kg por semana\n• Mesetas son normales (no te desanimes)\n\n**¿Qué te gustaría hacer ahora?**\n\na) Ver recetas específicas para bajar de peso\nb) Conocer productos keto que te faciliten el proceso\nc) Hablar con un nutricionista para un plan más personalizado\n\n¡Tú decides! 💚',
        trigger: {
          type: 'nutritionist',
          data: nutritionists.find(n => n.id === 'n3'),
        },
      };
    }
    
    // First interaction - gather information
    if (!context.hasSharedGoals || conversationHistory.length < 3) {
      return {
        text: '¡Perfecto! Me encanta que quieras mejorar tu salud. La dieta keto es increíblemente efectiva para pérdida de peso saludable. 💪\n\n**Antes de crear tu plan personalizado, cuéntame un poco sobre ti:**\n\n1️⃣ ¿Cuánto peso te gustaría perder?\n2️⃣ ¿En qué plazo? (sin prisa, lo importante es ser saludable)\n3️⃣ ¿Tienes alguna restricción alimenticia? (vegetariano, alergias, etc.)\n4️⃣ ¿Haces ejercicio actualmente?\n\nNo te preocupes si no tienes todas las respuestas ahora, podemos ir paso a paso. ¿Por dónde te gustaría empezar? 😊',
      };
    }
    
    // Third interaction - offer professional help
    return {
      text: 'Veo que realmente estás comprometido con tu objetivo. ¡Eso es genial! 🌟\n\n**Para llevarte al siguiente nivel**, te recomiendo considerar una consulta con un nutricionista especializado en keto y pérdida de peso.\n\n**¿Por qué un profesional?**\n\n✅ Plan 100% personalizado a tu metabolismo\n✅ Ajustes basados en tu progreso real\n✅ Análisis de composición corporal\n✅ Apoyo cuando tengas dudas o mesetas\n✅ Estrategias para mantener resultados largo plazo\n\nTengo el nutricionista perfecto para ti:\n\n**Lic. Ana Rodríguez** - Especialista en Pérdida de Peso Saludable\n⭐ 4.9/5.0 (142 reseñas)\n💼 8 años de experiencia\n🎓 Certificada en Nutrición Cetogénica\n💵 $45 USD/sesión\n\n📊 **Lo que dicen sus pacientes:**\n"Perdí 15kg en 4 meses de forma saludable"\n"Muy profesional y empática"\n"Me enseñó a mantener mi peso ideal"\n\n¿Te gustaría agendar una cita con ella? También puedo seguir ayudándote con el plan gratuito, ¡lo que prefieras! 😊',
      trigger: {
        type: 'nutritionist',
        data: nutritionists.find(n => n.id === 'n3'),
      },
    };
  }

  // Tips and advice - Context-aware and comprehensive
  if (/(consejo|tip|recomendación|ayuda|sugerencia|cómo|mejor manera)/i.test(lower)) {
    // Specific tips based on context
    if (/(empezar|comenzar|inicio|principiante)/i.test(lower)) {
      return {
        text: '¡Claro! Aquí está mi guía de inicio para principiantes en keto: 🚀\n\n**SEMANA 1: Preparación y Adaptación**\n\n**Día 1-2: Limpieza**\n• Saca de casa: azúcar, pan, pasta, arroz\n• Compra: huevos, carne, queso, aguacate, vegetales\n• Aprende: a leer etiquetas (carbos netos)\n\n**Día 3-5: Adaptación**\n• Síntomas: posible "gripe keto"\n• Solución: ELECTROLITOS (sal, magnesio, potasio)\n• Expectativa: pérdida de peso de agua (normal)\n\n**Día 6-7: Ajuste**\n• Calcula tus macros\n• Planifica comidas de la próxima semana\n• Únete a comunidad para apoyo\n\n**5 REGLAS DE ORO:**\n\n1️⃣ **Mantén carbos <20g netos/día**\n   Netos = totales - fibra\n\n2️⃣ **Prioriza proteína**\n   1.6-2g por kg de peso ideal\n\n3️⃣ **No temas a las grasas**\n   Son tu nueva fuente de energía\n\n4️⃣ **ELECTROLITOS diarios**\n   Sal, magnesio, potasio\n\n5️⃣ **Hidrátate**\n   2.5-4L agua/día\n\n**ERRORES COMUNES A EVITAR:**\n\n❌ No comer suficiente sal\n❌ Comer "productos keto" procesados\n❌ No dormir suficiente\n❌ Compararte con otros\n❌ Rendirte en la semana 1\n\n**TU PRIMERA COMPRA:**\n• Huevos (2-3 docenas)\n• Mantequilla/aceite de coco\n• Carne molida\n• Pollo\n• Aguacates\n• Espinacas/lechuga\n• Quesos\n• Sal del Himalaya\n\n💰 Presupuesto: $50-70 USD para la semana\n\n💡 **Mi mejor consejo:** Los primeros 3-4 días son los más difíciles. Después de eso, tu energía aumenta y los antojos desaparecen. ¡Vale la pena!\n\n¿Quieres que te arme un menú completo para tu primera semana? 📅',
      };
    }
    
    if (/(ejercicio|gym|entrenar|fitness)/i.test(lower)) {
      return {
        text: '💪 ¡Excelente! Keto y ejercicio son una combinación poderosa. Aquí está todo lo que necesitas saber:\n\n**ADAPTACIÓN KETO + EJERCICIO**\n\n**Semanas 1-3: Fase de Adaptación**\n• Reduce intensidad 20-30%\n• Enfócate en técnica\n• Tu cuerpo está aprendiendo a usar grasa\n• Es NORMAL sentirte con menos fuerza\n\n**Semanas 4-8: Recuperación**\n• Aumenta intensidad gradualmente\n• Fuerza regresa a niveles normales\n• Resistencia mejora significativamente\n\n**Semana 8+: Keto-Adaptado**\n• Energía sostenida (sin crashes)\n• Menos inflamación\n• Recuperación más rápida\n• Composición corporal mejora\n\n**NUTRICIÓN PRE/POST ENTRENO:**\n\n**30-60 min ANTES:**\n☕ Café negro + MCT oil\n🥑 Medio aguacate\n🧀 Queso + nueces\n💡 Objetivo: Energía sin peso en estómago\n\n**DURANTE (>1 hora):**\n💧 Agua con electrolitos\n🧂 Sal marina\n🍋 Limón (opcional)\n\n**DESPUÉS (dentro de 2h):**\n🍖 Proteína (30-40g)\n🥑 Grasas saludables\n🥬 Vegetales\n💡 Objetivo: Recuperación muscular\n\n**SUPLEMENTOS ÚTILES:**\n\n✅ **Electrolitos**\n   Esencial, no opcional\n\n✅ **MCT Oil**\n   Energía rápida para entrenar\n\n✅ **Creatina**\n   Compatible con keto\n\n✅ **BCAA** (opcional)\n   Si entrenas en ayunas\n\n⚠️ **Beta-Alanina, Carbos intra-entreno**\n   No necesarios en keto\n\n**POR TIPO DE EJERCICIO:**\n\n🏋️ **Pesas/Fuerza:**\n• Excelente en keto\n• Mantén proteína alta\n• Paciencia en adaptación\n\n🏃 **Cardio/Resistencia:**\n• Mejora después de adaptación\n• Quema grasa eficientemente\n• Menos dependencia de carbos\n\n🔥 **HIIT:**\n• Reduce frecuencia al inicio\n• Aumenta después de 4-6 semanas\n• Electrolitos extra\n\n⚡ **CrossFit/Alta Intensidad:**\n• Considera TKD (Targeted Keto Diet)\n• 15-30g carbos pre-entreno\n• Solo si es muy intenso\n\n💡 **Mi consejo PRO:** La adaptación toma tiempo. No juzgues keto por las primeras 3 semanas. Dale 6-8 semanas y serás un máquina de quemar grasa.\n\n¿Quieres hablar con nuestro nutricionista deportivo para un plan personalizado? 🎯',
      };
    }
    
    // General rotating tips
    const generalTips = [
      '💡 **Hack de Hidratación**\n\nEn keto, necesitas MÁS agua que antes porque:\n• Menos insulina = menos retención de agua\n• Cetonas se excretan por orina\n• Electrolitos se pierden más rápido\n\n**Mi fórmula:**\n💧 Peso (kg) x 0.033 = Litros/día\nEjemplo: 70kg x 0.033 = 2.3L mínimo\n\n**Señales de deshidratación:**\n• Orina amarilla oscura\n• Dolor de cabeza\n• Fatiga\n• Estreñimiento\n\n**Solución simple:**\nBotella de 1L siempre contigo. Llena 2-3 veces al día.\n\n💧 ¿Sabías que? Muchos "antojos" son en realidad sed disfrazada.',
      
      '💡 **Meal Prep Domingos**\n\n¿Cansado de cocinar diario? Aquí mi sistema:\n\n**DOMINGO (2-3 horas):**\n\n**Proteínas:**\n• 1kg pollo horneado con especias\n• 1kg carne molida cocida\n• 12 huevos duros\n\n**Vegetales:**\n• Brócoli y coliflor al vapor\n• Ensalada verde (sin aderezar)\n• Espinacas salteadas en aceite de coco\n\n**Grasas:**\n• Aderezo casero (aceite + vinagre + especias)\n• Porción de nueces en bolsitas\n• Aguacates (comprar día a día)\n\n**Almacenamiento:**\n📦 Contenedores de vidrio\n❄️ Refrigerador: 4-5 días\n🧊 Congelador: el resto\n\n**Lunes-Viernes:**\n⚡ 5 minutos: Combina proteína + vegetal + grasa\n✅ Comida lista sin pensar\n\n💰 Ahorro: $100+ USD/mes vs comer fuera\n⏰ Ahorro: 1-2 horas/día\n\n¿Necesitas recetas específicas para meal prep? 🥘',
      
      '💡 **El Poder del Ayuno Intermitente**\n\nKeto + Ayuno Intermitente = Súper combo 🚀\n\n**¿Por qué funcionan tan bien juntos?**\n• Keto ya reduce hambre\n• Tu cuerpo usa grasa 24/7\n• Cetonas suprimen apetito\n• Energía estable todo el día\n\n**Protocolos populares:**\n\n⏰ **16:8 (principiantes)**\nComer: 12pm - 8pm\nAyuno: 8pm - 12pm\n💡 Más fácil: solo salta desayuno\n\n⏰ **18:6 (intermedio)**\nComer: 2pm - 8pm\nAyuno: 8pm - 2pm\n💡 Mayor beneficio metabólico\n\n⏰ **20:4 (avanzado)**\nComer: 4pm - 8pm\nAyuno: 8pm - 4pm\n💡 Solo si te sientes bien\n\n⏰ **OMAD (una comida al día)**\nComer: 1 comida\nAyuno: 23 horas\n💡 No para todos, muy restrictivo\n\n**Beneficios:**\n✅ Autofagia (limpieza celular)\n✅ Mayor quema de grasa\n✅ Claridad mental\n✅ Ahorro de tiempo\n✅ Menos inflamación\n\n**IMPORTANTE:**\n⚠️ Empieza gradual (12:12 → 14:10 → 16:8)\n⚠️ Escucha a tu cuerpo\n⚠️ Mantén electrolitos\n⚠️ Si sientes mal, come\n\n💡 **En ayuno puedes tomar:**\n• Agua\n• Café negro\n• Té sin azúcar\n• Electrolitos\n\n¿Quieres un plan para empezar con ayuno intermitente? ⏰',
      
      '💡 **Lectura de Etiquetas Nutricionales**\n\n¡Ser un detective de etiquetas es clave en keto! 🔍\n\n**LO QUE IMPORTA:**\n\n1️⃣ **CARBOHIDRATOS NETOS**\n   Fórmula: Carbos Totales - Fibra - Eritritol = Netos\n   \n   Ejemplo:\n   Carbos totales: 12g\n   Fibra: 8g\n   Eritritol: 2g\n   = 2g NETOS ✅\n\n2️⃣ **INGREDIENTES (orden importa)**\n   • Primeros 3 = mayoría del producto\n   • Evita: azúcar, jarabe de maíz, maltodextrina\n   • Busca: ingredientes que reconoces\n\n3️⃣ **TAMAÑO DE PORCIÓN**\n   ⚠️ Truco común: porciones ridículamente pequeñas\n   "Solo 2g carbos" pero porción = 15g (1 cucharada)\n   Siempre multiplica por porciones reales\n\n**SEÑALES DE ALERTA:**\n\n🚩 "Sin azúcar añadida" (puede tener azúcar natural)\n🚩 "Bajo en grasa" (probablemente alto en carbos)\n🚩 "Natural" (no significa keto-friendly)\n🚩 "Keto" en el empaque (verifica números)\n\n**AZÚCARES OCULTOS:**\n\n❌ Maltodextrina\n❌ Dextrina\n❌ Jarabe de maíz\n❌ Glucosa\n❌ Fructosa\n❌ Miel, agave, maple\n❌ Concentrado de frutas\n\n✅ **Edulcorantes OK:**\n• Eritritol\n• Stevia\n• Monk fruit\n• Alulosa\n\n**REGLA DE ORO:**\nSi no entiendes un ingrediente → Google antes de comprar\n\n¿Necesitas ayuda revisando algún producto específico? 📱',
    ];
    
    return {
      text: generalTips[Math.floor(Math.random() * generalTips.length)],
    };
  }

  // Default response - More personalized and conversational
  const defaultResponses = [
    'Interesante pregunta. 🤔 Para darte la mejor respuesta posible, cuéntame un poco más.\n\nEstoy especializado en:\n\n🍽️ **Nutrición Keto**\n• Recetas y planes de comidas\n• Cálculo de macros\n• Tips para diferentes objetivos\n\n🛒 **Productos**\n• Recomendaciones personalizadas\n• Kit de inicio para principiantes\n• Opciones económicas\n\n👨‍⚕️ **Asesoría Profesional**\n• Conectarte con nutricionistas certificados\n• Especialistas en diabetes, deporte, pérdida de peso\n• Consultas personalizadas\n\n💬 **Comunidad**\n• Ver qué dicen otros usuarios\n• Compartir experiencias\n• Motivación y apoyo\n\n¿Cuál de estos temas te interesa más? O si tienes otra pregunta específica, adelante. ¡Estoy aquí para ayudarte! 💚',
    
    'Entiendo. Déjame ayudarte de la mejor manera. 😊\n\n**Soy tu amigo keto personal** y puedo asistirte con:\n\n🎯 **Si eres nuevo en keto:**\n• Guía paso a paso para empezar\n• Lista de compras básica\n• Qué esperar las primeras semanas\n\n💪 **Si ya tienes experiencia:**\n• Optimizar tus resultados\n• Recetas más variadas\n• Combinar keto con ejercicio\n\n🛍️ **Si quieres comprar:**\n• Productos recomendados\n• Kit de inicio con descuento\n• Snacks y opciones gourmet\n\n👩‍⚕️ **Si necesitas ayuda profesional:**\n• Nutricionistas especializados\n• Planes personalizados\n• Seguimiento continuo\n\n¿Por dónde te gustaría que empecemos? 🥑',
    
    'Hmm, quiero asegurarme de entender bien tu necesidad para darte la mejor ayuda. 🎯\n\n**Algunas cosas que puedo hacer por ti:**\n\n📚 **Educación:**\n• Explicar conceptos keto (cetosis, macros, etc.)\n• Resolver dudas sobre síntomas o efectos\n• Tips y trucos probados\n\n🍳 **Práctica:**\n• Recetas fáciles y deliciosas\n• Planes de comidas semanales\n• Meal prep para ahorrar tiempo\n\n🎪 **Social:**\n• Cómo comer fuera en keto\n• Manejar fiestas y reuniones\n• Resistir tentaciones\n\n🏥 **Salud:**\n• Keto para condiciones específicas\n• Conectarte con especialistas\n• Monitoreo y seguimiento\n\n¿Alguno de estos temas resuena con lo que necesitas? O cuéntame con tus propias palabras qué te trae por aquí hoy. 🤗',
  ];
  
  return {
    text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
  };
}

/**
 * Streaming simulation with enhanced responses
 * @param userMessage - The user's message to process
 * @param conversationHistory - Array of previous messages for context
 * @param userLocation - Optional user location for location-based features
 * @param wordDelayMs - Delay in milliseconds between each word (default: 30ms)
 */
export async function* simulateEnhancedStreamingResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  userLocation?: { latitude: number; longitude: number },
  wordDelayMs: number = 30
): AsyncGenerator<{ text: string; trigger?: SimulationTrigger; shouldRequestLocation?: boolean }, void, unknown> {
  const response = categorizeWithTriggers(userMessage, conversationHistory, userLocation);
  const words = response.text.split(' ');
  
  // Initial delay before starting
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  for (const word of words) {
    yield { text: word + ' ', trigger: undefined };
    await new Promise((resolve) => setTimeout(resolve, wordDelayMs));
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
