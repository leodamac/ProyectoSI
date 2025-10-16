/**
 * MCP (Model Context Protocol) Service Layer
 * 
 * This service layer provides a modular interface for AI services
 * Currently using mock/wizard-of-oz implementations
 * Future: Replace with actual AI services while maintaining same interface
 */

import { ChatMessage, UserProfile } from '@/types';
import { generateKetoRecipe } from '@/data/recipes';

export interface MCPServiceConfig {
  provider: 'mock' | 'openai' | 'gemini' | 'local';
  apiKey?: string;
  model?: string;
}

export class MCPChatService {
  private config: MCPServiceConfig;
  private conversationHistory: ChatMessage[] = [];
  private userProfile: Partial<UserProfile> = {};

  constructor(config: MCPServiceConfig = { provider: 'mock' }) {
    this.config = config;
  }

  /**
   * Send a message and get AI response
   * Currently uses mock responses, but interface is ready for real AI
   */
  async sendMessage(content: string): Promise<ChatMessage> {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: new Date()
    };

    this.conversationHistory.push(userMessage);

    // Extract information from user message (mock implementation)
    this.extractUserInfo(content);

    // Generate response based on conversation context
    const assistantMessage = await this.generateResponse(content);
    
    this.conversationHistory.push(assistantMessage);
    
    return assistantMessage;
  }

  /**
   * Extract user information from conversation (mock NLP)
   * Future: Use real NLP/AI to extract structured data
   */
  private extractUserInfo(content: string): void {
    const lowerContent = content.toLowerCase();

    // Extract dietary restrictions
    if (lowerContent.includes('vegetariano') || lowerContent.includes('vegano')) {
      if (!this.userProfile.dietaryRestrictions) {
        this.userProfile.dietaryRestrictions = [];
      }
      if (lowerContent.includes('vegano')) {
        this.userProfile.dietaryRestrictions.push('vegano');
      } else if (lowerContent.includes('vegetariano')) {
        this.userProfile.dietaryRestrictions.push('vegetariano');
      }
    }

    // Extract allergies
    if (lowerContent.includes('alergia') || lowerContent.includes('alérgico')) {
      if (!this.userProfile.allergies) {
        this.userProfile.allergies = [];
      }
      if (lowerContent.includes('nueces')) this.userProfile.allergies.push('nueces');
      if (lowerContent.includes('lácteos')) this.userProfile.allergies.push('lácteos');
      if (lowerContent.includes('mariscos')) this.userProfile.allergies.push('mariscos');
    }

    // Extract goals
    if (lowerContent.includes('bajar de peso') || lowerContent.includes('perder peso')) {
      if (!this.userProfile.goals) {
        this.userProfile.goals = [];
      }
      this.userProfile.goals.push('pérdida de peso');
    }
    if (lowerContent.includes('diabetes') || lowerContent.includes('glucosa')) {
      if (!this.userProfile.goals) {
        this.userProfile.goals = [];
      }
      this.userProfile.goals.push('control glucémico');
    }
  }

  /**
   * Generate AI response (mock implementation)
   * Future: Replace with actual AI service call
   */
  private async generateResponse(userMessage: string): Promise<ChatMessage> {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    const metadata: ChatMessage['metadata'] = {};

    // Greeting
    if (this.conversationHistory.length <= 2 && 
        (lowerMessage.includes('hola') || lowerMessage.includes('buenas'))) {
      response = '¡Hola! 👋 Soy tu asistente personal de nutrición keto. Estoy aquí para ayudarte a crear recetas deliciosas y saludables adaptadas a tus necesidades. ¿Podrías contarme un poco sobre tus objetivos de salud?';
    }
    // Recipe request
    else if (lowerMessage.includes('receta') || lowerMessage.includes('cocinar')) {
      const mealType = this.extractMealType(lowerMessage);
      const recipe = generateKetoRecipe({ mealType });
      
      response = `¡Perfecto! Te tengo una receta ideal: **${recipe.name}**\n\n${recipe.description}\n\n`;
      response += `⏱️ Tiempo total: ${recipe.prepTime + recipe.cookTime} minutos\n`;
      response += `🍽️ Porciones: ${recipe.servings}\n`;
      response += `📊 Carbohidratos netos: ${recipe.nutritionInfo.netCarbs}g\n\n`;
      response += `¿Te gustaría ver los ingredientes y pasos de preparación?`;
      
      metadata.suggestedRecipes = [recipe.id];
      if (recipe.relatedProducts) {
        metadata.suggestedProducts = recipe.relatedProducts;
      }
    }
    // Product recommendation
    else if (lowerMessage.includes('producto') || lowerMessage.includes('comprar')) {
      response = 'Tenemos productos keto increíbles que pueden complementar tu dieta. ¿Buscas algo específico como snacks, postres o ingredientes para cocinar?';
      metadata.suggestedProducts = ['1', '4', '6'];
    }
    // Weight loss goal
    else if (lowerMessage.includes('bajar') || lowerMessage.includes('peso') || lowerMessage.includes('adelgazar')) {
      response = 'Excelente decisión enfocarte en tu salud. La dieta keto es muy efectiva para pérdida de peso sostenible. ¿Cuánto peso te gustaría perder y en qué plazo? También es importante que un nutricionista profesional te guíe. ¿Te gustaría conocer a nuestros especialistas?';
    }
    // Nutritionist inquiry
    else if (lowerMessage.includes('nutricionista') || lowerMessage.includes('doctor') || lowerMessage.includes('profesional')) {
      response = 'Contamos con nutricionistas certificados especializados en dieta keto. Ofrecemos consultas personalizadas donde analizamos tu caso específico, objetivos y creamos un plan nutricional a tu medida. ¿Te gustaría agendar una cita?';
    }
    // General question
    else {
      response = 'Entiendo. Para poder ayudarte mejor, cuéntame: ¿Cuál es tu objetivo principal? (por ejemplo: bajar de peso, mejorar energía, controlar diabetes, etc.)';
    }

    return {
      id: `msg-${Date.now()}-assistant`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      metadata
    };
  }

  private extractMealType(message: string): string {
    if (message.includes('desayuno')) return 'Desayuno';
    if (message.includes('almuerzo') || message.includes('comida')) return 'Almuerzo';
    if (message.includes('cena')) return 'Cena';
    if (message.includes('snack') || message.includes('merienda')) return 'Snack';
    return 'Desayuno';
  }

  getUserProfile(): Partial<UserProfile> {
    return { ...this.userProfile };
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  clearConversation(): void {
    this.conversationHistory = [];
    this.userProfile = {};
  }
}

/**
 * Local AI Service (using browser APIs when available)
 * Implements language detection, summarization, and translation
 */
export class LocalAIService {
  /**
   * Detect language of text
   * Uses browser's Language Detector API when available
   */
  async detectLanguage(text: string): Promise<{ language: string; confidence: number }[]> {
    // Check if browser supports Language Detector API
    if ('translation' in window && 'createDetector' in (window as Window & { translation: { createDetector: () => Promise<{ detect: (text: string) => Promise<{ detectedLanguage: string; confidence: number }[]> }> } }).translation) {
      try {
        const detector = await (window as Window & { translation: { createDetector: () => Promise<{ detect: (text: string) => Promise<{ detectedLanguage: string; confidence: number }[]> }> } }).translation.createDetector();
        const results = await detector.detect(text);
        return results.map((r) => ({
          language: r.detectedLanguage,
          confidence: r.confidence
        }));
      } catch {
        console.warn('Language Detector API not available, using fallback');
      }
    }
    
    // Fallback: Simple detection
    const spanishKeywords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se'];
    const words = text.toLowerCase().split(/\s+/);
    const spanishCount = words.filter(w => spanishKeywords.includes(w)).length;
    const confidence = spanishCount / Math.min(words.length, 10);
    
    return [{ language: confidence > 0.3 ? 'es' : 'en', confidence }];
  }

  /**
   * Summarize text
   * Uses browser's Summarizer API when available
   */
  async summarize(text: string, type: 'key-points' | 'tl;dr' | 'headline' = 'tl;dr'): Promise<string> {
    // Check if browser supports Summarizer API
    if ('ai' in window && 'summarizer' in (window as Window & { ai: { summarizer: { create: (config: { type: string }) => Promise<{ summarize: (text: string) => Promise<string> }> } } }).ai) {
      try {
        const summarizer = await (window as Window & { ai: { summarizer: { create: (config: { type: string }) => Promise<{ summarize: (text: string) => Promise<string> }> } } }).ai.summarizer.create({ type });
        const summary = await summarizer.summarize(text);
        return summary;
      } catch {
        console.warn('Summarizer API not available, using fallback');
      }
    }
    
    // Fallback: Simple summarization
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (type === 'headline') {
      return sentences[0].trim();
    } else if (type === 'key-points') {
      return sentences.slice(0, 3).join('. ') + '.';
    }
    return sentences.slice(0, 2).join('. ') + '.';
  }

  /**
   * Translate text
   * Uses browser's Translator API when available
   */
  async translate(text: string, targetLang: string = 'en'): Promise<string> {
    // Check if browser supports Translator API
    if ('translation' in window && 'createTranslator' in (window as Window & { translation: { createTranslator: (config: { sourceLanguage: string; targetLanguage: string }) => Promise<{ translate: (text: string) => Promise<string> }> } }).translation) {
      try {
        const translator = await (window as Window & { translation: { createTranslator: (config: { sourceLanguage: string; targetLanguage: string }) => Promise<{ translate: (text: string) => Promise<string> }> } }).translation.createTranslator({
          sourceLanguage: 'es',
          targetLanguage: targetLang
        });
        const translated = await translator.translate(text);
        return translated;
      } catch {
        console.warn('Translator API not available, using fallback');
      }
    }
    
    // Fallback: Return original text with note
    return `[Translation not available] ${text}`;
  }
}

// Export singleton instances
export const chatService = new MCPChatService();
export const localAI = new LocalAIService();
