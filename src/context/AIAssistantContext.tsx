'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import { sampleProducts } from '@/data/products';
import { nutritionists } from '@/data/nutritionists';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  action?: AIAction;
}

export interface AIAction {
  type: 'add_to_cart' | 'view_product' | 'view_forum' | 'schedule_appointment' | 'create_meal' | 'view_weekly_diet' | 'navigate';
  data?: unknown;
  executed?: boolean;
}

interface AIAssistantContextType {
  messages: AIMessage[];
  isOpen: boolean;
  isMinimized: boolean;
  isLoading: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleMinimize: () => void;
  sendMessage: (content: string) => Promise<void>;
  executeAction: (action: AIAction) => Promise<void>;
  clearMessages: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { addToCart } = useCart();
  const router = useRouter();

  const openAssistant = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const closeAssistant = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const executeAction = useCallback(async (action: AIAction) => {
    switch (action.type) {
      case 'add_to_cart': {
        const productId = action.data as string;
        const product = sampleProducts.find(p => p.id === productId);
        if (product) {
          addToCart(product, 1);
          // Add confirmation message
          const confirmMessage: AIMessage = {
            id: `msg-${Date.now()}`,
            role: 'assistant',
            content: `✅ ¡Perfecto! He agregado "${product.name}" a tu carrito. Puedes ver tu carrito en cualquier momento haciendo clic en el ícono 🛒.`,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, confirmMessage]);
        }
        break;
      }
      case 'view_product': {
        const productId = action.data as string;
        router.push(`/productos#${productId}`);
        break;
      }
      case 'view_forum': {
        const topic = action.data as string | undefined;
        router.push(topic ? `/foro?topic=${topic}` : '/foro');
        break;
      }
      case 'schedule_appointment': {
        const nutritionistId = action.data as string | undefined;
        router.push(nutritionistId ? `/nutricionistas#${nutritionistId}` : '/nutricionistas');
        break;
      }
      case 'create_meal': {
        router.push('/personalizados#recetas');
        break;
      }
      case 'view_weekly_diet': {
        router.push('/personalizados#plan-semanal');
        break;
      }
      case 'navigate': {
        const path = action.data as string;
        router.push(path);
        break;
      }
    }
  }, [addToCart, router]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate AI response with action detection
      const response = await processMessageWithActions(content, messages);
      
      setMessages(prev => [...prev, response]);

      // Auto-execute certain actions
      if (response.action && shouldAutoExecute(response.action)) {
        await executeAction(response.action);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: AIMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, executeAction]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <AIAssistantContext.Provider
      value={{
        messages,
        isOpen,
        isMinimized,
        isLoading,
        openAssistant,
        closeAssistant,
        toggleMinimize,
        sendMessage,
        executeAction,
        clearMessages,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within AIAssistantProvider');
  }
  return context;
}

// Helper function to process messages and detect actions
async function processMessageWithActions(message: string, history: AIMessage[]): Promise<AIMessage> {
  const lowerMessage = message.toLowerCase();
  let response = '';
  let action: AIAction | undefined;

  // Add to cart detection
  if ((lowerMessage.includes('agregar') || lowerMessage.includes('añadir') || lowerMessage.includes('comprar')) && 
      (lowerMessage.includes('carrito') || lowerMessage.includes('producto') || 
       lowerMessage.includes('brownie') || lowerMessage.includes('cheesecake') || 
       lowerMessage.includes('muffin') || lowerMessage.includes('chocolate'))) {
    
    // Try to find product by name or keywords
    let foundProduct = null;
    
    for (const product of sampleProducts) {
      const productWords = product.name.toLowerCase().split(' ');
      const categoryWords = product.category.toLowerCase();
      
      // Check if message contains product name or key words
      if (lowerMessage.includes(product.name.toLowerCase()) ||
          productWords.some(word => word.length > 3 && lowerMessage.includes(word)) ||
          (lowerMessage.includes(categoryWords) && categoryWords.length > 5)) {
        foundProduct = product;
        break;
      }
    }
    
    // Special keywords for product types
    if (!foundProduct) {
      if (lowerMessage.includes('brownie')) {
        foundProduct = sampleProducts.find(p => p.name.toLowerCase().includes('brownie'));
      } else if (lowerMessage.includes('cheesecake')) {
        foundProduct = sampleProducts.find(p => p.name.toLowerCase().includes('cheesecake'));
      } else if (lowerMessage.includes('muffin')) {
        foundProduct = sampleProducts.find(p => p.name.toLowerCase().includes('muffin'));
      }
    }
    
    if (foundProduct) {
      response = `¡Perfecto! Voy a agregar "${foundProduct.name}" a tu carrito. Este producto tiene ${foundProduct.nutritionInfo.carbs}g de carbohidratos y cuesta $${foundProduct.price.toFixed(2)}.`;
      action = { type: 'add_to_cart', data: foundProduct.id };
    } else {
      response = 'Te puedo ayudar a agregar productos al carrito. Tenemos:\n\n' +
        '🍫 Brownie de Chocolate Negro ($15.00)\n' +
        '🍰 Cheesecake de Frutos Rojos ($18.00)\n' +
        '🧁 Muffins de Plátano ($12.00)\n\n' +
        '¿Cuál te gustaría agregar?';
    }
  }
  // View product ingredients
  else if (lowerMessage.includes('ingredientes') || lowerMessage.includes('qué contiene') || lowerMessage.includes('qué tiene')) {
    // Check if asking about specific product
    let foundProduct = null;
    
    for (const product of sampleProducts) {
      if (lowerMessage.includes(product.name.toLowerCase())) {
        foundProduct = product;
        break;
      }
    }
    
    if (foundProduct) {
      response = `Los ingredientes de ${foundProduct.name} son:\n\n` +
        foundProduct.ingredients.map((ing, idx) => `${idx + 1}. ${ing}`).join('\n') +
        `\n\nInformación nutricional:\n` +
        `• Calorías: ${foundProduct.nutritionInfo.calories} kcal\n` +
        `• Proteínas: ${foundProduct.nutritionInfo.protein}g\n` +
        `• Carbohidratos: ${foundProduct.nutritionInfo.carbs}g\n` +
        `• Grasas: ${foundProduct.nutritionInfo.fat}g\n\n` +
        (foundProduct.isVegan ? '✅ Vegano\n' : '') +
        (foundProduct.isGlutenFree ? '✅ Sin Gluten\n' : '') +
        `\n¿Te gustaría agregarlo al carrito?`;
    } else {
      response = 'Puedo mostrarte los ingredientes de nuestros productos. ¿De cuál producto te gustaría saber? Tengo información sobre brownies, cheesecakes, muffins y más.';
    }
  }
  // Forum topics
  else if (lowerMessage.includes('foro') || lowerMessage.includes('comunidad') || lowerMessage.includes('temas')) {
    let topic: string | undefined;
    if (lowerMessage.includes('recetas')) topic = 'recetas';
    else if (lowerMessage.includes('ejercicio') || lowerMessage.includes('deporte')) topic = 'ejercicio';
    else if (lowerMessage.includes('motivaci')) topic = 'motivacion';
    
    response = topic 
      ? `¡Perfecto! Te llevaré a los temas de ${topic} en el foro de nuestra comunidad.`
      : '¡Claro! Te llevaré al foro donde puedes ver todas las conversaciones de la comunidad keto.';
    action = { type: 'view_forum', data: topic };
  }
  // Schedule appointment
  else if (lowerMessage.includes('cita') || lowerMessage.includes('agendar') || lowerMessage.includes('nutricionista') || lowerMessage.includes('consulta')) {
    // Check for specialist type
    let specialistType: string | undefined;
    if (lowerMessage.includes('diabetes')) {
      const specialist = nutritionists.find(n => n.specialty.toLowerCase().includes('diabetes'));
      specialistType = specialist?.id;
      response = `¡Excelente! Te recomiendo agendar una cita con ${specialist?.name}, especialista en diabetes. Te llevaré a su perfil.`;
    } else if (lowerMessage.includes('deporte') || lowerMessage.includes('atleta')) {
      const specialist = nutritionists.find(n => n.specialty.toLowerCase().includes('deport'));
      specialistType = specialist?.id;
      response = `¡Perfecto! Te conectaré con ${specialist?.name}, especialista en nutrición deportiva.`;
    } else if (lowerMessage.includes('peso') || lowerMessage.includes('adelgazar')) {
      const specialist = nutritionists.find(n => n.specialty.toLowerCase().includes('peso'));
      specialistType = specialist?.id;
      response = `¡Genial! Te recomiendo a ${specialist?.name}, especialista en pérdida de peso. Te llevo a su perfil.`;
    } else {
      response = '¡Por supuesto! Te llevaré a la página de nutricionistas donde puedes conocer a nuestros especialistas y agendar tu cita.';
    }
    action = { type: 'schedule_appointment', data: specialistType };
  }
  // Create meal
  else if (lowerMessage.includes('armar') && (lowerMessage.includes('comida') || lowerMessage.includes('plato') || lowerMessage.includes('receta'))) {
    response = '¡Excelente idea! Te llevaré a la sección de recetas personalizadas donde puedes crear tu comida keto ideal según tus preferencias.';
    action = { type: 'create_meal' };
  }
  // Weekly diet
  else if (lowerMessage.includes('dieta semanal') || lowerMessage.includes('plan semanal') || (lowerMessage.includes('semana') && lowerMessage.includes('plan'))) {
    response = '¡Perfecto! Te llevaré a la sección de planificación semanal donde puedes crear tu dieta keto para toda la semana.';
    action = { type: 'view_weekly_diet' };
  }
  // Greeting
  else if (history.length === 0 && (lowerMessage.includes('hola') || lowerMessage.includes('buenas') || lowerMessage.includes('hey'))) {
    response = '¡Hola! 👋 Soy tu asistente personal de Alkadami Keto. Puedo ayudarte a:\n\n' +
      '🛒 Agregar productos al carrito\n' +
      '📋 Ver ingredientes de productos\n' +
      '💬 Revisar temas del foro\n' +
      '📅 Agendar citas con nutricionistas\n' +
      '🍽️ Armar comidas y planes semanales\n\n' +
      '¿En qué puedo ayudarte hoy?';
  }
  // Default response
  else {
    response = 'Entiendo. ¿Podrías ser más específico? Puedo ayudarte con productos, recetas, el foro, agendar citas con nutricionistas, o navegar por la plataforma. ¿Qué te gustaría hacer?';
  }

  return {
    id: `assistant-${Date.now()}`,
    role: 'assistant',
    content: response,
    timestamp: new Date(),
    action,
  };
}

function shouldAutoExecute(action: AIAction): boolean {
  // Auto-execute navigation and view actions
  return ['view_product', 'view_forum', 'schedule_appointment', 'create_meal', 'view_weekly_diet', 'navigate'].includes(action.type);
}
