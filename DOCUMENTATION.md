# Alkadami Keto - Documentación Técnica del Servicio Freemium

## 📋 Resumen Ejecutivo

Este documento detalla la implementación del servicio freemium de nutrición keto con IA inteligente y respaldo de nutricionistas certificados. La aplicación utiliza el enfoque "Wizard of Oz" para simular capacidades de IA mientras mantiene una arquitectura modular lista para integración con servicios reales.

## 🎯 Objetivo del Proyecto

Transformar la aplicación de una simple tienda web (webshop) a un **servicio freemium de estilo de vida keto** que ofrece:

1. **Capa Gratuita**: Chat con IA para recetas keto personalizadas y recomendaciones de productos
2. **Capa Premium**: Acceso a nutricionistas certificados para consultas profesionales
3. **E-commerce Integrado**: Productos keto disponibles para compra

## 🏗️ Arquitectura y Diseño

### Principios de Diseño Aplicados

1. **Modularidad**: Todos los componentes son independientes y reutilizables
2. **MCP Protocol Ready**: Estructura preparada para integración con servicios AI reales
3. **Wizard of Oz**: Simulación inteligente de IA usando lógica predefinida
4. **Responsive First**: Diseño mobile-first con experiencia optimizada
5. **Keto Color Scheme**: Paleta de colores representativa (verde esmeralda, teal, tierra)

### Colores Principales

- **Emerald (Verde Esmeralda)**: #10b981 - Representa salud, naturaleza, keto
- **Teal (Verde Azulado)**: #14b8a6 - Frescura, profesionalismo
- **Earth Tones**: Tonos tierra para calidez y confianza
- **Minimal Gradients**: Gradientes sutiles, sin abusar

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── chat-ia/              # Página de chat con IA
│   │   └── page.tsx
│   ├── nutricionistas/       # Página de nutricionistas
│   │   └── page.tsx
│   ├── productos/            # Catálogo de productos (existente)
│   ├── contacto/             # Página de contacto
│   ├── page.tsx              # Homepage rediseñada
│   └── layout.tsx            # Layout principal
├── components/
│   ├── AIChat.tsx            # Componente principal de chat con IA
│   ├── Navigation.tsx        # Navegación actualizada
│   └── CartContext.tsx       # Contexto del carrito (existente)
├── data/
│   ├── nutritionists.ts      # Datos mock de nutricionistas
│   ├── recipes.ts            # Recetas keto mock
│   └── products.ts           # Productos (existente)
├── lib/
│   ├── mcp-services.ts       # Servicios MCP para IA
│   └── firebase.ts           # Configuración Firebase (existente)
└── types/
    └── index.ts              # Definiciones TypeScript
```

## 🤖 Sistema de IA (Wizard of Oz)

### MCPChatService

Clase principal que simula un servicio de chat con IA:

```typescript
class MCPChatService {
  // Mantiene historial de conversación
  private conversationHistory: ChatMessage[]
  
  // Perfil del usuario construido a partir de la conversación
  private userProfile: Partial<UserProfile>
  
  // Envía mensaje y recibe respuesta
  async sendMessage(content: string, voice: boolean): Promise<ChatMessage>
  
  // Extrae información del usuario (mock NLP)
  private extractUserInfo(content: string): void
  
  // Genera respuesta basada en contexto
  private generateResponse(userMessage: string): Promise<ChatMessage>
}
```

**Características:**
- Detecta intención del usuario mediante palabras clave
- Construye perfil gradualmente (dieta, alergias, objetivos)
- Sugiere recetas basadas en preferencias
- Recomienda productos relacionados
- Deriva a nutricionistas cuando necesario

### LocalAIService

Integración con APIs de IA del navegador (Gemini Nano):

```typescript
class LocalAIService {
  // Detecta idioma del texto
  async detectLanguage(text: string): Promise<LanguageResult[]>
  
  // Resume texto usando Summarizer API
  async summarize(text: string, type: 'tl;dr' | 'key-points'): Promise<string>
  
  // Traduce texto usando Translator API
  async translate(text: string, targetLang: string): Promise<string>
}
```

**Nota**: Incluye fallbacks cuando las APIs del navegador no están disponibles.

## 🎙️ Funcionalidad de Voz

Implementación usando **Web Speech API**:

```typescript
// Inicialización
const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = false;

// Captura de voz
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  setInput(transcript);
};
```

**Compatibilidad**: Chrome, Edge (otros navegadores usan solo texto)

## 👨‍⚕️ Sistema de Nutricionistas

### Estructura de Datos

```typescript
interface Nutritionist {
  id: string;
  name: string;
  specialty: string;           // Especialización (keto deportivo, diabetes, etc.)
  experience: number;           // Años de experiencia
  rating: number;               // Calificación promedio
  reviewCount: number;          // Número de reseñas
  availability: Schedule[];     // Horarios disponibles
  certifications: string[];     // Certificaciones profesionales
  languages: string[];          // Idiomas que habla
  isPremium: boolean;           // Servicio premium
  price?: number;               // Precio por consulta
}
```

### Mock Data

Incluye 4 nutricionistas ficticios con:
- Especialidades variadas (metabólica, deportiva, diabetes, pérdida de peso)
- Horarios realistas
- Reseñas verificadas
- Certificaciones profesionales

## 🍽️ Sistema de Recetas Keto

### Generación de Recetas

```typescript
function generateKetoRecipe(preferences: {
  mealType?: string;          // Desayuno, almuerzo, cena, snack
  ingredients?: string[];     // Ingredientes preferidos
  cookingTime?: number;       // Tiempo máximo de cocción
  difficulty?: string;        // easy, medium, hard
}): KetoRecipe
```

**Algoritmo**:
1. Filtra recetas por tipo de comida
2. Considera tiempo de preparación
3. Verifica dificultad
4. Retorna receta aleatoria que cumpla criterios
5. Incluye productos relacionados de la tienda

### Estructura de Receta

```typescript
interface KetoRecipe {
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    netCarbs: number;        // Carbohidratos netos (clave en keto)
  };
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  relatedProducts?: string[]; // IDs de productos de la tienda
}
```

## 🔄 Flujo de Usuario

### Flujo Gratuito (Free Tier)

```
1. Usuario entra a la homepage
   ↓
2. Ve prominentemente el servicio de Chat IA
   ↓
3. Click en "Chatear con IA Gratis"
   ↓
4. Conversa sobre sus necesidades
   ↓
5. IA recopila información (dieta, objetivos, restricciones)
   ↓
6. Recibe recetas personalizadas
   ↓
7. Ve productos recomendados
   ↓
8. [Opcional] Compra productos
```

### Flujo Premium

```
1. Usuario necesita asesoría profesional
   ↓
2. IA sugiere nutricionista o usuario navega a sección
   ↓
3. Ve perfiles de nutricionistas con:
   - Especialidades
   - Horarios
   - Reseñas verificadas
   - Precios
   ↓
4. Selecciona nutricionista
   ↓
5. Agenda cita (contacto)
   ↓
6. Consulta profesional personalizada
```

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15**: Framework React con App Router
- **React 19**: Biblioteca UI
- **TypeScript**: Tipado estático
- **Tailwind CSS v4**: Estilos utility-first
- **Framer Motion**: Animaciones fluidas

### Dependencias Clave
```json
{
  "dependencies": {
    "next": "15.5.4",
    "react": "19.1.0",
    "framer-motion": "^12.23.22",
    "lucide-react": "^0.544.0",
    "ai": "latest",
    "@ai-sdk/openai": "latest"
  }
}
```

### APIs del Navegador
- **Web Speech API**: Reconocimiento de voz
- **Language Detector API**: Detección de idioma (Gemini Nano)
- **Summarizer API**: Resumen de texto (Gemini Nano)
- **Translator API**: Traducción (Gemini Nano)

## 🔮 Migración a Servicios Reales

### Fase 1: Integración de IA Real

Reemplazar `MCPChatService` mock con servicios reales:

```typescript
// Configuración actual (mock)
const chatService = new MCPChatService({ provider: 'mock' });

// Migración a OpenAI
const chatService = new MCPChatService({ 
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4'
});

// O migración a Gemini
const chatService = new MCPChatService({
  provider: 'gemini',
  apiKey: process.env.GEMINI_API_KEY,
  model: 'gemini-pro'
});
```

**Cambios necesarios**:
1. Actualizar método `generateResponse()` para hacer llamadas API reales
2. Implementar streaming de respuestas
3. Añadir manejo de errores y reintentos
4. Implementar rate limiting

### Fase 2: Base de Datos Real

Migrar de datos mock a Firestore:

```typescript
// Nutricionistas
const nutritionistsRef = collection(db, 'nutritionists');
const querySnapshot = await getDocs(nutritionistsRef);

// Recetas generadas por usuarios
const recipesRef = collection(db, 'user_recipes');
await addDoc(recipesRef, recipe);

// Perfiles de usuario
const userProfileRef = doc(db, 'user_profiles', userId);
await setDoc(userProfileRef, profile);
```

### Fase 3: Sistema de Pagos

Para consultas con nutricionistas:

```typescript
// Integración con Stripe
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const session = await stripe.checkout.sessions.create({
  line_items: [{
    price: nutritionist.stripePriceId,
    quantity: 1
  }],
  mode: 'payment',
  success_url: `${YOUR_DOMAIN}/success`,
  cancel_url: `${YOUR_DOMAIN}/cancel`
});
```

### Fase 4: Sistema de Agendamiento

Para citas con nutricionistas:

```typescript
// Integración con Calendly o Cal.com
import { Cal } from '@calcom/embed-react';

<Cal 
  calLink={nutritionist.calendarLink}
  config={{
    name: user.name,
    email: user.email,
    theme: 'light'
  }}
/>
```

## 📊 Métricas y Analytics

### Eventos Clave a Trackear

1. **Engagement con IA**
   - Mensajes enviados
   - Duración de sesión
   - Tasa de abandono
   - Uso de voz vs texto

2. **Conversión**
   - Chat → Productos recomendados → Compra
   - Chat → Derivación a nutricionista → Agenda
   - Usuarios gratuitos → Premium

3. **Satisfacción**
   - NPS de usuarios
   - Calificaciones de nutricionistas
   - Feedback de recetas generadas

### Implementación

```typescript
// Google Analytics 4
gtag('event', 'chat_message_sent', {
  message_length: message.length,
  is_voice: isVoice,
  session_id: sessionId
});

// Conversión a premium
gtag('event', 'conversion', {
  send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
  value: nutritionist.price,
  currency: 'USD'
});
```

## 🔐 Seguridad y Privacidad

### Datos del Usuario

- Conversaciones almacenadas localmente por defecto
- Opción de guardar perfil en cuenta (futuro)
- Cumplimiento GDPR: derecho al olvido, exportación de datos

### API Keys

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
OPENAI_API_KEY=xxx  # Server-side only
STRIPE_SECRET_KEY=xxx  # Server-side only
```

**Nunca** exponer API keys en el cliente.

## 🎨 Guía de Estilo

### Colores

```css
/* Primarios */
--emerald-600: #10b981;  /* Principal keto */
--teal-600: #14b8a6;      /* Secundario */

/* Gradientes */
.gradient-primary {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
}

/* Backgrounds */
--bg-keto: linear-gradient(to bottom right, #f0fdf4, #ffffff, #f0fdfa);
```

### Tipografía

- **Headings**: font-bold, tamaños grandes (4xl-7xl)
- **Body**: font-normal, line-height: 1.7 para legibilidad
- **CTAs**: font-semibold, uppercase letters en casos específicos

### Animaciones

```typescript
// Entrada suave
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Hover sutil
whileHover={{ y: -5, scale: 1.02 }}
```

**Regla**: Animaciones sutiles, no molestas. Máximo 0.8s de duración.

## 📱 Responsividad

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Componentes Clave

- **AIChat**: Ancho completo en móvil, modal en desktop
- **Nutritionist Cards**: 1 columna móvil, 2 columnas desktop
- **Navigation**: Hamburger menu en móvil (futuro)

## 🧪 Testing

### Pruebas Recomendadas

1. **Unit Tests**
   ```typescript
   // lib/mcp-services.test.ts
   describe('MCPChatService', () => {
     it('should extract dietary restrictions', () => {
       const service = new MCPChatService();
       service.sendMessage('Soy vegano');
       expect(service.getUserProfile().dietaryRestrictions).toContain('vegano');
     });
   });
   ```

2. **Integration Tests**
   - Flujo completo de chat
   - Generación de recetas
   - Recomendación de productos

3. **E2E Tests** (Playwright/Cypress)
   - Usuario completa onboarding
   - Usuario agenda nutricionista
   - Usuario compra producto

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Build
npm run build

# Deploy
vercel --prod
```

### Variables de Entorno

```bash
# Production
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
# ... (resto de Firebase config)

# Future
OPENAI_API_KEY=xxx
STRIPE_SECRET_KEY=xxx
DATABASE_URL=xxx
```

## 📚 Recursos Adicionales

### Documentación Relacionada

- [AI SDK Documentation](https://ai-sdk.dev/docs/introduction)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Framer Motion](https://www.framer.com/motion/)

### APIs Futuras a Considerar

- **OpenAI GPT-4**: Para generación de contenido más sofisticado
- **Anthropic Claude**: Alternativa a OpenAI
- **Google Gemini**: IA multimodal (texto, imagen, voz)
- **ElevenLabs**: Text-to-Speech de alta calidad
- **Assembly AI**: Transcripción de voz mejorada

## 🔄 Roadmap

### Corto Plazo (1-3 meses)
- [ ] Integrar IA real (OpenAI/Gemini)
- [ ] Sistema de autenticación
- [ ] Base de datos para usuarios
- [ ] Analytics básico

### Medio Plazo (3-6 meses)
- [ ] Sistema de pagos (Stripe)
- [ ] Agendamiento de citas
- [ ] Planes de suscripción
- [ ] App móvil (React Native)

### Largo Plazo (6-12 meses)
- [ ] IA con capacidad de aprendizaje personalizado
- [ ] Integración con wearables (tracking nutricional)
- [ ] Marketplace de nutricionistas
- [ ] Expansión internacional

## 👥 Equipo y Contacto

**Desarrolladores**:
- Leonardo Macias (FIEC) - Lead Developer
- Carlos Abel Cabanilla Tomala (FIEC)
- David Eduardo Solorzano Flores (FCSH)
- Dereck Oscar Enriquez Perez (FIEC)
- Alexander Joshue Barco Lascano (FCSH)
- Valeska Anahi Sanchez Ramirez (FCSH)
- Kevin Santiago Mejia Parra (FIEC)

**Contacto**: info@alkadamiketo.com

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Licencia**: MIT
