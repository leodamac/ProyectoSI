import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { nutritionists } from '@/data/nutritionists';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Mock OpenAI for demo - in production, you'd use real API key
const mockOpenAI = {
  async chat(messages: { role: string; content: string }[]) {
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
    
    let response = '';
    const lowerMessage = lastMessage;
    
    // Greeting
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas tardes')) {
      response = '¡Hola! 👋 Soy tu asistente personal de nutrición keto. Estoy aquí para ayudarte con recetas, planes alimenticios y recomendaciones. ¿En qué puedo ayudarte hoy?';
    }
    // Recipe request
    else if (lowerMessage.includes('receta') || lowerMessage.includes('cocinar') || lowerMessage.includes('preparar')) {
      response = 'Tengo varias recetas keto deliciosas para ti. ¿Buscas algo específico como desayuno, almuerzo, cena o snacks? También puedo recomendarte recetas según tus ingredientes disponibles.';
    }
    // Weight loss
    else if (lowerMessage.includes('bajar') || lowerMessage.includes('peso') || lowerMessage.includes('adelgazar') || lowerMessage.includes('perder')) {
      response = '¡Excelente que quieras enfocarte en tu salud! La dieta keto es muy efectiva para pérdida de peso sostenible. Te recomiendo trabajar con un nutricionista especializado. Tenemos expertos que pueden crear un plan personalizado para ti.';
    }
    // Diabetes management
    else if (lowerMessage.includes('diabetes') || lowerMessage.includes('glucosa') || lowerMessage.includes('azúcar')) {
      response = 'La dieta keto puede ser muy beneficiosa para el manejo de diabetes tipo 2. Te recomiendo consultar con el Dr. Roberto Silva, nuestro especialista en Nutrición para Diabetes, quien puede ayudarte a optimizar tu plan nutricional.';
    }
    // Sports nutrition
    else if (lowerMessage.includes('deporte') || lowerMessage.includes('ejercicio') || lowerMessage.includes('gym') || lowerMessage.includes('atleta')) {
      response = 'Para optimizar tu rendimiento deportivo con dieta keto, te recomiendo al Dr. Carlos Mendoza, especializado en Nutrición Deportiva Keto. Él trabaja con atletas para maximizar energía y recuperación.';
    }
    // Nutritionist inquiry
    else if (lowerMessage.includes('nutricionista') || lowerMessage.includes('doctor') || lowerMessage.includes('consulta') || lowerMessage.includes('agendar')) {
      response = 'Contamos con nutricionistas certificados especializados en dieta keto. Puedo ayudarte a encontrar el profesional ideal según tus necesidades. ¿Cuál es tu objetivo principal: pérdida de peso, manejo de diabetes, nutrición deportiva u otro?';
    }
    // Product recommendations
    else if (lowerMessage.includes('producto') || lowerMessage.includes('comprar') || lowerMessage.includes('tienda')) {
      response = 'Tenemos una selección de productos keto de alta calidad. ¿Buscas snacks, postres, ingredientes para cocinar o suplementos?';
    }
    // General
    else {
      response = 'Entiendo. Para poder ayudarte mejor, cuéntame más sobre tu situación. ¿Cuál es tu objetivo principal? Por ejemplo: bajar de peso, mejorar tu energía, controlar diabetes, optimizar rendimiento deportivo, etc.';
    }
    
    return response;
  }
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // For demo purposes, use mock responses
    // In production, uncomment the real OpenAI call:
    
    /*
    const result = streamText({
      model: openai('gpt-4-turbo'),
      messages: convertToCoreMessages(messages),
      system: `Eres un asistente experto en nutrición ketogénica. Tu objetivo es ayudar a las personas con:
      - Recetas keto personalizadas
      - Recomendaciones de productos
      - Planes nutricionales
      - Conectarlos con nutricionistas especializados según sus necesidades
      
      Cuando detectes que un usuario necesita ayuda especializada, recomienda al nutricionista adecuado:
      - Dr. María Fernández: Nutrición Keto y Metabólica (general)
      - Dr. Carlos Mendoza: Nutrición Deportiva Keto
      - Lic. Ana Rodríguez: Pérdida de Peso Saludable
      - Dr. Roberto Silva: Nutrición para Diabetes
      
      Sé amigable, profesional y contextual. No seas spam, recomienda nutricionistas solo cuando sea relevante.`,
    });

    return result.toDataStreamResponse();
    */

    // Mock implementation for demo
    const lastMessage = messages[messages.length - 1]?.content || '';
    const response = await mockOpenAI.chat(messages);
    
    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Simulate streaming by sending chunks
        const chunks = response.split(' ');
        let index = 0;
        
        const interval = setInterval(() => {
          if (index < chunks.length) {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(chunks[index] + ' ')}\n`));
            index++;
          } else {
            clearInterval(interval);
            controller.close();
          }
        }, 50);
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Error processing chat', { status: 500 });
  }
}
