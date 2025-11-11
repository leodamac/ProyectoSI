/**
 * Conversation Scripts for Demo Simulations
 * These scripts guide the AI through realistic user interactions
 */

import { ConversationScript } from '@/types';
import { nutritionists } from './nutritionists';
import { sampleProducts } from './products';

/**
 * Script 1: Beginner Keto Journey
 * Simulates a person new to keto wanting to learn and eventually schedule with a nutritionist
 */
export const beginnerKetoScript: ConversationScript = {
  id: 'beginner-keto-journey',
  name: 'Viaje Keto para Principiantes',
  description: 'Una persona nueva en keto que quiere aprender todo sobre la dieta y termina agendando una cita con un nutricionista',
  userProfile: {
    type: 'beginner',
    name: 'María',
    goals: ['bajar de peso', 'mejorar salud', 'más energía'],
    restrictions: [],
    background: 'Completamente nueva en dieta keto, nunca ha hecho dietas restrictivas',
  },
  steps: [
    {
      id: 'step-1',
      order: 1,
      userInput: 'Hola',
      assistantResponse: '¡Hola! 👋 Soy **Keto Friend**, tu amigo personal en el estilo de vida cetogénico. Estoy aquí para hacer tu viaje keto más fácil y delicioso.\n\n💚 **Puedo ayudarte con:**\n\n🍳 Recetas personalizadas según tus gustos\n🛒 Recomendaciones de productos keto\n👨‍⚕️ Conectarte con nutricionistas expertos\n💬 Compartir lo que dice la comunidad\n📍 Encontrar especialistas cerca de ti\n🎯 Crear planes de comidas personalizados\n💪 Consejos para combinar keto con ejercicio\n\n¿Cuéntame, eres nuevo en keto o ya llevas tiempo en este estilo de vida? 😊',
      nextStepId: 'step-2',
    },
    {
      id: 'step-2',
      order: 2,
      userInput: 'Soy completamente nueva, no sé nada de keto',
      assistantResponse: '¡Genial que estés comenzando! 🌟 La dieta keto puede parecer intimidante al principio, pero no te preocupes, estoy aquí para guiarte paso a paso.\n\n**Los 3 pilares del éxito en keto:**\n\n1️⃣ **Entender tus macros**: Mantener carbohidratos bajo 20-30g netos al día\n2️⃣ **Planificación**: Tener recetas y productos keto a mano\n3️⃣ **Apoyo profesional**: Un nutricionista te ayuda a personalizar todo\n\n💡 **Mi consejo:** Empecemos con lo básico. ¿Qué comida del día te preocupa más? ¿Desayuno, almuerzo o cena? O si prefieres, puedo mostrarte productos keto para empezar tu despensa. 🥑',
      variants: [
        {
          pattern: '(nueva|nuevo|principiante|no sé|nunca)',
          response: '¡Genial que estés comenzando! 🌟 La dieta keto puede parecer intimidante al principio, pero no te preocupes, estoy aquí para guiarte paso a paso.\n\n**Los 3 pilares del éxito en keto:**\n\n1️⃣ **Entender tus macros**: Mantener carbohidratos bajo 20-30g netos al día\n2️⃣ **Planificación**: Tener recetas y productos keto a mano\n3️⃣ **Apoyo profesional**: Un nutricionista te ayuda a personalizar todo\n\n💡 **Mi consejo:** Empecemos con lo básico. ¿Qué comida del día te preocupa más? ¿Desayuno, almuerzo o cena? O si prefieres, puedo mostrarte productos keto para empezar tu despensa. 🥑',
        },
      ],
      nextStepId: 'step-3',
    },
    {
      id: 'step-3',
      order: 3,
      userInput: 'El desayuno es lo que más me preocupa',
      assistantResponse: '¡Perfecto! El desayuno keto es más fácil de lo que piensas y súper delicioso. 🍳\n\n**Opción 1: Huevos Revueltos Gourmet**\n• 3 huevos orgánicos\n• 1/2 aguacate\n• Queso crema\n• Tocino crujiente\n• Espinacas baby\n📊 5g carbos | 30g proteína | 35g grasas\n⭐ Favorita de la comunidad\n⏰ Listo en 10 minutos\n\n**Opción 2: Café Bulletproof**\n• Café negro\n• 1 cucharada mantequilla grass-fed\n• 1 cucharada aceite MCT\n• Opcional: colágeno en polvo\n📊 1g carbos | 0g proteína | 28g grasas\n⚡ Energía sostenida toda la mañana\n⏰ Listo en 3 minutos\n\n**Opción 3: Panqueques Keto**\n• Harina de almendra\n• Huevos\n• Stevia\n• Mantequilla de almendra\n📊 6g carbos | 18g proteína | 30g grasas\n🥞 Perfecto para los fines de semana\n⏰ Listo en 15 minutos\n\n¿Te gustaría ver los pasos detallados de alguna receta? O puedo mostrarte productos que facilitan estos desayunos. 😊',
      variants: [
        {
          pattern: '(desayuno|breakfast|mañana)',
          response: '¡Perfecto! El desayuno keto es más fácil de lo que piensas y súper delicioso. 🍳\n\n**Opción 1: Huevos Revueltos Gourmet**\n• 3 huevos orgánicos\n• 1/2 aguacate\n• Queso crema\n• Tocino crujiente\n• Espinacas baby\n📊 5g carbos | 30g proteína | 35g grasas\n⭐ Favorita de la comunidad\n⏰ Listo en 10 minutos\n\n**Opción 2: Café Bulletproof**\n• Café negro\n• 1 cucharada mantequilla grass-fed\n• 1 cucharada aceite MCT\n• Opcional: colágeno en polvo\n📊 1g carbos | 0g proteína | 28g grasas\n⚡ Energía sostenida toda la mañana\n⏰ Listo en 3 minutos\n\n**Opción 3: Panqueques Keto**\n• Harina de almendra\n• Huevos\n• Stevia\n• Mantequilla de almendra\n📊 6g carbos | 18g proteína | 30g grasas\n🥞 Perfecto para los fines de semana\n⏰ Listo en 15 minutos\n\n¿Te gustaría ver los pasos detallados de alguna receta? O puedo mostrarte productos que facilitan estos desayunos. 😊',
        },
      ],
      trigger: {
        type: 'recipe',
        data: { mealType: 'desayuno', beginner: true },
      },
      nextStepId: 'step-4',
    },
    {
      id: 'step-4',
      order: 4,
      userInput: 'Muéstrame productos que me pueden ayudar',
      assistantResponse: '¡Excelente idea! Tener los productos correctos hace todo mucho más fácil. 🛒\n\n**Kit de Inicio Keto - Desayuno**\n\n**Grasas Saludables:**\n🥑 Aceite de coco virgen ($12.99)\n   • Para cocinar y café bulletproof\n   • MCT naturales para energía\n\n🧈 Mantequilla grass-fed ($8.99)\n   • Perfecta para café y huevos\n   • Rica en omega-3\n\n**Proteínas:**\n🥚 Huevos orgánicos ($5.99/docena)\n   • Base de muchos desayunos keto\n   • Versátiles y nutritivos\n\n🥓 Tocino sin azúcar ($7.99)\n   • Crujiente y delicioso\n   • Sin carbohidratos\n\n**Endulzantes:**\n🍯 Stevia líquida ($8.99)\n   • Para café y recetas\n   • Cero calorías, cero carbos\n\n**Snacks para la mañana:**\n🌰 Mantequilla de almendra ($11.99)\n   • Alta en proteína\n   • Perfecta con panqueques keto\n\n💰 **Total:** $56.94 (para 2-3 semanas)\n\n¿Te gustaría agregar estos productos al carrito? También puedo explicarte cómo empezar tu primera semana keto paso a paso. 😊',
      variants: [
        {
          pattern: '(producto|comprar|tienda|qué necesito)',
          response: '¡Excelente idea! Tener los productos correctos hace todo mucho más fácil. 🛒\n\n**Kit de Inicio Keto - Desayuno**\n\n**Grasas Saludables:**\n🥑 Aceite de coco virgen ($12.99)\n   • Para cocinar y café bulletproof\n   • MCT naturales para energía\n\n🧈 Mantequilla grass-fed ($8.99)\n   • Perfecta para café y huevos\n   • Rica en omega-3\n\n**Proteínas:**\n🥚 Huevos orgánicos ($5.99/docena)\n   • Base de muchos desayunos keto\n   • Versátiles y nutritivos\n\n🥓 Tocino sin azúcar ($7.99)\n   • Crujiente y delicioso\n   • Sin carbohidratos\n\n**Endulzantes:**\n🍯 Stevia líquida ($8.99)\n   • Para café y recetas\n   • Cero calorías, cero carbos\n\n**Snacks para la mañana:**\n🌰 Mantequilla de almendra ($11.99)\n   • Alta en proteína\n   • Perfecta con panqueques keto\n\n💰 **Total:** $56.94 (para 2-3 semanas)\n\n¿Te gustaría agregar estos productos al carrito? También puedo explicarte cómo empezar tu primera semana keto paso a paso. 😊',
        },
      ],
      trigger: {
        type: 'product',
        data: sampleProducts.slice(0, 6),
      },
      nextStepId: 'step-5',
    },
    {
      id: 'step-5',
      order: 5,
      userInput: 'Sí, ayúdame con el plan de la primera semana',
      assistantResponse: '¡Perfecto! Te voy a dar un plan súper claro para tu primera semana. 📋\n\n**SEMANA 1: Preparación y Adaptación**\n\n**Días 1-2: Preparación Mental y Física**\n• Limpia tu despensa (saca pan, pasta, azúcar)\n• Compra los productos que te mostré\n• Aprende a leer etiquetas (carbos netos = totales - fibra)\n\n**Días 3-4: Inicio Real**\n✅ Mantén carbos <20g netos/día\n✅ Bebe 2-3L de agua\n✅ Agrega sal a todo (electrolitos)\n⚠️ Posible "gripe keto" (normal, se pasa)\n\n**Días 5-7: Ajuste y Mejora**\n💪 Tu cuerpo empieza a adaptarse\n⚡ Energía puede fluctuar (temporal)\n🎯 Mide tu progreso (fotos, medidas, no solo balanza)\n\n**LO MÁS IMPORTANTE:**\n\n1. **Electrolitos** - Sal, magnesio, potasio DIARIOS\n2. **Hidratación** - Agua constante\n3. **Paciencia** - Los primeros 3-4 días son los más difíciles\n4. **Apoyo** - Por eso estoy aquí 💚\n\n**PERO... hay algo que te hará MUY exitosa:**\n\nUn nutricionista puede personalizar TODO esto específicamente para TI. Tu metabolismo, tus horarios, tus gustos. No es solo "dieta genérica" sino TU plan perfecto.\n\n¿Te interesaría conocer a nuestros nutricionistas especializados en keto? Tienen mucha experiencia ayudando a principiantes como tú. 👨‍⚕️',
      variants: [
        {
          pattern: '(plan|semana|cómo empiezo|ayuda|guía)',
          response: '¡Perfecto! Te voy a dar un plan súper claro para tu primera semana. 📋\n\n**SEMANA 1: Preparación y Adaptación**\n\n**Días 1-2: Preparación Mental y Física**\n• Limpia tu despensa (saca pan, pasta, azúcar)\n• Compra los productos que te mostré\n• Aprende a leer etiquetas (carbos netos = totales - fibra)\n\n**Días 3-4: Inicio Real**\n✅ Mantén carbos <20g netos/día\n✅ Bebe 2-3L de agua\n✅ Agrega sal a todo (electrolitos)\n⚠️ Posible "gripe keto" (normal, se pasa)\n\n**Días 5-7: Ajuste y Mejora**\n💪 Tu cuerpo empieza a adaptarse\n⚡ Energía puede fluctuar (temporal)\n🎯 Mide tu progreso (fotos, medidas, no solo balanza)\n\n**LO MÁS IMPORTANTE:**\n\n1. **Electrolitos** - Sal, magnesio, potasio DIARIOS\n2. **Hidratación** - Agua constante\n3. **Paciencia** - Los primeros 3-4 días son los más difíciles\n4. **Apoyo** - Por eso estoy aquí 💚\n\n**PERO... hay algo que te hará MUY exitosa:**\n\nUn nutricionista puede personalizar TODO esto específicamente para TI. Tu metabolismo, tus horarios, tus gustos. No es solo "dieta genérica" sino TU plan perfecto.\n\n¿Te interesaría conocer a nuestros nutricionistas especializados en keto? Tienen mucha experiencia ayudando a principiantes como tú. 👨‍⚕️',
        },
      ],
      nextStepId: 'step-6',
    },
    {
      id: 'step-6',
      order: 6,
      userInput: 'Sí, me interesa conocer a los nutricionistas',
      assistantResponse: '¡Excelente decisión! 🌟 Déjame presentarte al mejor nutricionista para alguien que está empezando:\n\n**Lic. Carlos Méndez**\n👨‍⚕️ Especialista en Nutrición Cetogénica y Metabolismo\n\n**¿Por qué es perfecto para ti?**\n• 10+ años de experiencia\n• Experto en guiar principiantes en keto\n• Enfoque empático y educativo\n• Crea planes 100% personalizados\n\n📜 **Certificaciones:**\n• Licenciado en Nutrición (Universidad Central)\n• Certificación en Dieta Cetogénica (Instituto Keto)\n• Especialización en Metabolismo y Pérdida de Peso\n\n⭐ **Calificación:** 4.8/5.0 (156 reseñas)\n\n💵 **Precio Primera Consulta:** $50 USD\n   (Incluye: evaluación completa, plan personalizado, lista de compras, seguimiento por WhatsApp 1 semana)\n\n🗓️ **Disponibilidad:**\n• Lunes a Viernes: 9:00 AM - 6:00 PM\n• Sábados: 9:00 AM - 1:00 PM\n\n🗣️ **Idiomas:** Español, Inglés\n\n**Lo que incluye tu primera consulta:**\n\n1️⃣ **Evaluación Inicial (30 min)**\n   • Historial médico\n   • Objetivos y restricciones\n   • Análisis de composición corporal\n\n2️⃣ **Plan Personalizado**\n   • Cálculo exacto de TUS macros\n   • Menú semanal adaptado a tus gustos\n   • Lista de compras detallada\n   • Recetas paso a paso\n\n3️⃣ **Seguimiento**\n   • Chat por WhatsApp (1 semana)\n   • Ajustes según tu progreso\n   • Respuesta a dudas\n\n📊 **Resumen de reseñas (IA):**\n• "Muy profesional y paciente con principiantes"\n• "Explica todo de manera clara y simple"\n• "Los resultados fueron mejores de lo esperado"\n• "Vale cada centavo de la inversión"\n\n¿Te gustaría agendar una cita con el Lic. Carlos Méndez? 📅',
      variants: [
        {
          pattern: '(sí|si|interesa|nutricionista|profesional|doctor)',
          response: '¡Excelente decisión! 🌟 Déjame presentarte al mejor nutricionista para alguien que está empezando:\n\n**Lic. Carlos Méndez**\n👨‍⚕️ Especialista en Nutrición Cetogénica y Metabolismo\n\n**¿Por qué es perfecto para ti?**\n• 10+ años de experiencia\n• Experto en guiar principiantes en keto\n• Enfoque empático y educativo\n• Crea planes 100% personalizados\n\n📜 **Certificaciones:**\n• Licenciado en Nutrición (Universidad Central)\n• Certificación en Dieta Cetogénica (Instituto Keto)\n• Especialización en Metabolismo y Pérdida de Peso\n\n⭐ **Calificación:** 4.8/5.0 (156 reseñas)\n\n💵 **Precio Primera Consulta:** $50 USD\n   (Incluye: evaluación completa, plan personalizado, lista de compras, seguimiento por WhatsApp 1 semana)\n\n🗓️ **Disponibilidad:**\n• Lunes a Viernes: 9:00 AM - 6:00 PM\n• Sábados: 9:00 AM - 1:00 PM\n\n🗣️ **Idiomas:** Español, Inglés\n\n**Lo que incluye tu primera consulta:**\n\n1️⃣ **Evaluación Inicial (30 min)**\n   • Historial médico\n   • Objetivos y restricciones\n   • Análisis de composición corporal\n\n2️⃣ **Plan Personalizado**\n   • Cálculo exacto de TUS macros\n   • Menú semanal adaptado a tus gustos\n   • Lista de compras detallada\n   • Recetas paso a paso\n\n3️⃣ **Seguimiento**\n   • Chat por WhatsApp (1 semana)\n   • Ajustes según tu progreso\n   • Respuesta a dudas\n\n📊 **Resumen de reseñas (IA):**\n• "Muy profesional y paciente con principiantes"\n• "Explica todo de manera clara y simple"\n• "Los resultados fueron mejores de lo esperado"\n• "Vale cada centavo de la inversión"\n\n¿Te gustaría agendar una cita con el Lic. Carlos Méndez? 📅',
        },
      ],
      trigger: {
        type: 'nutritionist',
        data: nutritionists.find(n => n.id === 'n1'),
      },
      nextStepId: 'step-7',
    },
    {
      id: 'step-7',
      order: 7,
      userInput: 'Sí, quiero agendar una cita',
      assistantResponse: '¡Perfecto! 🎉 Vamos a agendar tu cita con el Lic. Carlos Méndez.\n\n**PASOS PARA AGENDAR:**\n\n1️⃣ **Elige tu fecha y horario preferido**\n   📅 Horarios disponibles esta semana:\n   • Lunes 15: 10:00 AM, 2:00 PM, 4:00 PM\n   • Martes 16: 9:00 AM, 11:00 AM, 3:00 PM\n   • Miércoles 17: 10:00 AM, 1:00 PM, 5:00 PM\n   • Jueves 18: 9:00 AM, 2:00 PM, 4:00 PM\n   • Viernes 19: 10:00 AM, 3:00 PM\n   • Sábado 20: 9:00 AM, 11:00 AM\n\n2️⃣ **Modalidad de consulta**\n   📱 Virtual (Zoom/Google Meet)\n   🏥 Presencial (Consultorio en Guayaquil)\n\n3️⃣ **Confirmación**\n   Te contactaremos por WhatsApp para:\n   • Confirmar fecha y hora\n   • Enviar link de pago ($50 USD)\n   • Enviar cuestionario pre-consulta\n   • Recordatorio 24h antes\n\n**PREPARACIÓN PARA TU CITA:**\n\n📝 Antes de la consulta, prepara:\n• Tu peso y altura actuales\n• Medicamentos que tomas (si aplica)\n• Alergias o intolerancias\n• Horarios de tu rutina diaria\n• Objetivos específicos\n\n💡 **Consejo:** Sé honesta sobre tus hábitos actuales. El nutricionista está para ayudarte, no para juzgarte. Mientras más info compartas, mejor será tu plan personalizado.\n\n**¿Qué horario te viene mejor?** Dame tu día y hora preferida y te contactaremos para confirmar. 😊\n\n---\n\n*Nota: Esta es una simulación demo. En la versión real, aquí se integraría con sistema de citas (Calendly/Cal.com) y pagos (Stripe).*',
      variants: [
        {
          pattern: '(agendar|cita|reservar|appointment)',
          response: '¡Perfecto! 🎉 Vamos a agendar tu cita con el Lic. Carlos Méndez.\n\n**PASOS PARA AGENDAR:**\n\n1️⃣ **Elige tu fecha y horario preferido**\n   📅 Horarios disponibles esta semana:\n   • Lunes 15: 10:00 AM, 2:00 PM, 4:00 PM\n   • Martes 16: 9:00 AM, 11:00 AM, 3:00 PM\n   • Miércoles 17: 10:00 AM, 1:00 PM, 5:00 PM\n   • Jueves 18: 9:00 AM, 2:00 PM, 4:00 PM\n   • Viernes 19: 10:00 AM, 3:00 PM\n   • Sábado 20: 9:00 AM, 11:00 AM\n\n2️⃣ **Modalidad de consulta**\n   📱 Virtual (Zoom/Google Meet)\n   🏥 Presencial (Consultorio en Guayaquil)\n\n3️⃣ **Confirmación**\n   Te contactaremos por WhatsApp para:\n   • Confirmar fecha y hora\n   • Enviar link de pago ($50 USD)\n   • Enviar cuestionario pre-consulta\n   • Recordatorio 24h antes\n\n**PREPARACIÓN PARA TU CITA:**\n\n📝 Antes de la consulta, prepara:\n• Tu peso y altura actuales\n• Medicamentos que tomas (si aplica)\n• Alergias o intolerancias\n• Horarios de tu rutina diaria\n• Objetivos específicos\n\n💡 **Consejo:** Sé honesta sobre tus hábitos actuales. El nutricionista está para ayudarte, no para juzgarte. Mientras más info compartas, mejor será tu plan personalizado.\n\n**¿Qué horario te viene mejor?** Dame tu día y hora preferida y te contactaremos para confirmar. 😊\n\n---\n\n*Nota: Esta es una simulación demo. En la versión real, aquí se integraría con sistema de citas (Calendly/Cal.com) y pagos (Stripe).*',
        },
      ],
      actions: [
        {
          type: 'schedule_appointment',
          data: {
            nutritionistId: 'n1',
            service: 'primera-consulta',
            price: 50,
          },
        },
      ],
    },
  ],
  metadata: {
    estimatedDuration: 10,
    difficulty: 'easy',
    tags: ['principiante', 'primera-vez', 'nutricionista', 'plan-personalizado'],
    author: 'Alkadami Keto Team',
    createdAt: new Date('2024-01-15'),
  },
};

/**
 * Script 2: Athlete Keto Optimization
 * Simulates an athlete looking to optimize performance with keto
 */
export const athleteKetoScript: ConversationScript = {
  id: 'athlete-keto-optimization',
  name: 'Optimización Keto para Atletas',
  description: 'Un atleta que hace CrossFit busca optimizar su rendimiento con dieta keto',
  userProfile: {
    type: 'athlete',
    name: 'Juan',
    goals: ['mejorar rendimiento', 'reducir inflamación', 'mejor recuperación'],
    restrictions: [],
    background: 'Hace CrossFit 5 días a la semana, busca ventaja competitiva',
  },
  steps: [
    {
      id: 'athlete-step-1',
      order: 1,
      userInput: 'Hola, hago CrossFit y quiero probar keto',
      assistantResponse: '¡Excelente! 💪 Keto + CrossFit puede ser una combinación poderosa. Como atleta, tienes necesidades específicas que hay que considerar.\n\n**Beneficios de Keto para CrossFit:**\n\n⚡ **Energía sostenida**\n• Sin crashes de azúcar\n• Quemas grasa constantemente\n• Rendimiento estable\n\n🔥 **Reducción de inflamación**\n• Recuperación más rápida\n• Menos dolor muscular\n• Mejor para las articulaciones\n\n🎯 **Composición corporal**\n• Pérdida de grasa sin perder músculo\n• Definición muscular mejorada\n• Peso óptimo para tu categoría\n\n**IMPORTANTE para atletas:**\n\nLas primeras 2-3 semanas tu rendimiento BAJARÁ mientras te adaptas. Esto es 100% NORMAL y TEMPORAL. Después de la adaptación, tu rendimiento será mejor que antes.\n\n¿Cuántas veces a la semana entrenas y cuánto tiempo llevas en CrossFit? Esto me ayuda a recomendarte mejor. 🏋️',
      nextStepId: 'athlete-step-2',
    },
    {
      id: 'athlete-step-2',
      order: 2,
      userInput: 'Entreno 5 días a la semana, llevo 2 años en CrossFit',
      assistantResponse: 'Perfecto, con 2 años de experiencia ya tienes una base sólida. 5 días de CrossFit requiere una estrategia específica. 🎯\n\n**Tu Plan Keto Deportivo:**\n\n**NUTRICIÓN PRE-ENTRENO (30-60 min antes):**\n☕ Café negro + MCT oil\n🥑 Medio aguacate\n🧀 Queso + nueces\n💡 Energía limpia sin peso en estómago\n\n**DURANTE WOD (>60 min):**\n💧 Agua con electrolitos\n🧂 Sal marina (crucial)\n🍋 Opcional: un poco de limón\n\n**POST-ENTRENO (dentro de 2h):**\n🍖 Proteína (30-40g): carne, pollo, pescado\n🥑 Grasas saludables\n🥬 Vegetales\n💪 Objetivo: recuperación muscular óptima\n\n**MACROS RECOMENDADOS:**\n• Proteína: 2.0-2.2g por kg (más que persona sedentaria)\n• Grasas: 60-65% de calorías\n• Carbos: 20-30g netos\n• Calorías: Déficit pequeño o mantenimiento\n\n**SUPLEMENTACIÓN CLAVE:**\n✅ Electrolitos (sodio, potasio, magnesio)\n✅ Creatina (compatible con keto)\n✅ MCT Oil (energía rápida)\n✅ Colágeno/Gelatina (articulaciones)\n\nTengo un nutricionista deportivo EXPERTO en keto + CrossFit. Él puede crear un plan exacto para tus WODs y objetivos. ¿Te interesa? 🏆',
      trigger: {
        type: 'nutritionist',
        data: nutritionists.find(n => n.id === 'n2'),
      },
      nextStepId: 'athlete-step-3',
    },
    {
      id: 'athlete-step-3',
      order: 3,
      userInput: 'Sí, quiero conocer al nutricionista deportivo',
      assistantResponse: 'Te presento al **Dr. Luis Herrera** - El mejor nutricionista deportivo keto del país. 🏆\n\n**Dr. Luis Herrera, PhD**\n🏃‍♂️ Nutrición Deportiva y Rendimiento\n\n**¿Por qué es perfecto para ti?**\n• Ex-atleta de alto rendimiento\n• Especialista en dietas cetogénicas para deporte\n• Trabaja con varios box de CrossFit\n• Resultados comprobados con atletas\n\n📜 **Credenciales:**\n• PhD en Nutrición Deportiva\n• Certificación en Nutrición Cetogénica para Atletas\n• Máster en Fisiología del Ejercicio\n• Entrenador certificado de CrossFit L1\n\n⭐ **4.9/5.0** (98 reseñas)\n\n💵 **Consulta:** $60 USD\n\n**LO QUE INCLUYE:**\n\n1️⃣ **Análisis de Tu Entrenamiento**\n   • Revisión de tus WODs\n   • Objetivos competitivos\n   • Composición corporal\n\n2️⃣ **Plan Nutricional Periodizado**\n   • Macros ajustados por tipo de WOD\n   • Timing de nutrientes optimizado\n   • Suplementación específica\n   • Estrategias para competencias\n\n3️⃣ **Seguimiento Deportivo**\n   • Ajustes según rendimiento\n   • Análisis de PRs y tiempos\n   • Modificaciones según mesociclo\n\n📊 **Resultados típicos de sus pacientes:**\n• Mejor resistencia en WODs largos\n• Recuperación más rápida\n• Menos fatiga\n• Composición corporal óptima\n• PRs en lifts pesados\n\n🗓️ **Disponibilidad:**\n• Lunes a Sábado\n• Consultas virtuales o presenciales\n• Atención prioritaria a atletas\n\n¿Agendamos tu consulta con el Dr. Herrera? 📅',
    },
  ],
  metadata: {
    estimatedDuration: 8,
    difficulty: 'medium',
    tags: ['deportivo', 'crossfit', 'rendimiento', 'atleta'],
    author: 'Alkadami Keto Team',
    createdAt: new Date('2024-01-15'),
  },
};

// Export all available scripts
export const availableScripts: ConversationScript[] = [
  beginnerKetoScript,
  athleteKetoScript,
];

// Helper function to find script by ID
export function getScriptById(id: string): ConversationScript | undefined {
  return availableScripts.find(script => script.id === id);
}

// Helper function to get script by user profile type
export function getScriptsByType(type: ConversationScript['userProfile']['type']): ConversationScript[] {
  return availableScripts.filter(script => script.userProfile.type === type);
}
