# 🎯 Guía de Demostración - Alkadami Keto Chatbot

## 📋 Introducción

Esta guía está diseñada para ayudarte a mostrar el **máximo potencial** de Alkadami Keto en una feria comercial o demostración en vivo. El chatbot con IA está optimizado para una experiencia diferencial que combina voz, texto, y recomendaciones inteligentes.

## 🎭 Modos de Interacción

El chatbot soporta **4 modos de interacción** completos:

### 1️⃣ Modo Voz-Voz (Tipo Alexa)
- **Descripción**: Interacción completamente por voz, sin interfaz de chat visible
- **Cómo activar**: Clic en botón de voz
- **Experiencia**: Similar a Alexa/Google Home
- **Mejor para**: Demostraciones impactantes, manos libres

### 2️⃣ Modo Voz-Texto
- **Descripción**: Hablas y recibes respuestas escritas
- **Cómo activar**: Hablar sin activar audio de respuesta
- **Experiencia**: Dictado con confirmación visual
- **Mejor para**: Ambientes ruidosos

### 3️⃣ Modo Texto-Voz
- **Descripción**: Escribes y recibes respuestas habladas
- **Cómo activar**: Escribir mensaje con TTS activado
- **Experiencia**: Lectura automática de respuestas
- **Mejor para**: Multitarea, accesibilidad

### 4️⃣ Modo Texto-Texto
- **Descripción**: Chat tradicional
- **Cómo activar**: Modo por defecto
- **Experiencia**: Chat clásico
- **Mejor para**: Lectura detallada, precisión

## 🎬 Escenarios de Demostración Óptimos

### Escenario 1: "Primera Vez en Keto" (5 minutos)

**Objetivo**: Mostrar capacidad de educar y guiar a nuevos usuarios

**Script de conversación**:

1. **Usuario**: "Hola, quiero empezar con keto pero no sé por dónde empezar"
   - **IA responde**: Saludo personalizado con opciones
   
2. **Usuario**: "¿Qué puedo desayunar?"
   - **IA muestra**: 3 recetas completas con macros
   - **Trigger**: Muestra tarjetas de recetas

3. **Usuario**: "Necesito ayuda profesional"
   - **IA recomienda**: Nutricionista específico basado en perfil
   - **Trigger**: Tarjeta de nutricionista con reviews resumidas (IA)
   - **Acción**: Opción para agendar

**Resultado**: Usuario ve valor completo (recetas + profesional + facilidad)

---

### Escenario 2: "Atleta Optimizando Rendimiento" (4 minutos)

**Objetivo**: Mostrar personalización para deportistas

**Script de conversación**:

1. **Usuario**: "Soy atleta y quiero mejorar mi rendimiento con keto"
   - **IA**: Reconoce objetivo deportivo
   
2. **Usuario**: "¿Qué debo comer antes del gym?"
   - **IA**: Recetas pre-entreno específicas
   
3. **Usuario**: "Necesito un nutricionista especializado en deportes"
   - **IA recomienda**: Dr. Carlos Mendoza (Nutrición Deportiva)
   - **Trigger**: Tarjeta con certificaciones deportivas destacadas
   - **IA muestra**: Resumen de reviews enfocado en resultados atléticos

**Resultado**: Precisión en recomendación especializada

---

### Escenario 3: "Recomendaciones Localizadas" (3 minutos)

**Objetivo**: Mostrar capacidad de geolocalización

**Script de conversación**:

1. **Usuario**: "Busco un nutricionista cerca de mí"
   - **IA**: Solicita permiso de ubicación
   - **Sistema**: Muestra diálogo de permisos (simulado)
   
2. **Usuario**: [Acepta ubicación]
   - **IA muestra**: "Dr. María Fernández - 2.3 km de distancia"
   - **Trigger**: Mapa simulado o tarjeta con distancia
   - **Datos**: Disponibilidad en tiempo real

3. **Usuario**: "¿Tiene buenos reviews?"
   - **IA resume**: Análisis inteligente de 156 reseñas
   - **Muestra**: Estadísticas clave (rating, temas comunes)

**Resultado**: Experiencia localizada y personalizada

---

### Escenario 4: "Integración con Foro y Productos" (6 minutos)

**Objetivo**: Demostrar integración completa del ecosistema

**Script de conversación**:

1. **Usuario**: "¿Qué dice la comunidad sobre snacks keto?"
   - **IA**: Cita posts relevantes del foro
   - **Trigger**: Tarjetas de posts con resúmenes IA
   - **Muestra**: Opiniones de usuarios reales

2. **Usuario**: "Me interesan los snacks de chocolate"
   - **IA recomienda**: Productos específicos de la tienda
   - **Trigger**: Carrusel de productos con precios y macros
   
3. **Usuario**: "¿Cuál es el más recomendado?"
   - **IA**: Combina reviews del foro + ventas + macros
   - **Muestra**: Recomendación basada en datos

4. **Usuario**: "Lo quiero comprar"
   - **Sistema**: Agrega al carrito automáticamente
   - **Muestra**: Confirmación visual

**Resultado**: Ecosistema completo integrado (foro → productos → compra)

---

### Escenario 5: "Conversación Natural para Perder Peso" (7 minutos)

**Objetivo**: Mostrar capacidad de mantener contexto y personalizar

**Script de conversación**:

1. **Usuario**: "Quiero bajar de peso"
   - **IA pregunta**: Objetivos específicos, restricciones
   
2. **Usuario**: "Quiero perder 10 kg en 3 meses, soy vegetariano"
   - **IA**: Ajusta recomendaciones (opciones vegetarianas keto)
   - **Muestra**: Plan personalizado
   
3. **Usuario**: "No me gusta el aguacate"
   - **IA**: Recuerda preferencia, ajusta recetas futuras
   - **Ofrece**: Alternativas de grasas saludables

4. **Usuario**: "Dame un plan semanal"
   - **IA genera**: 7 días de comidas sin aguacate, vegetariano, keto
   - **Trigger**: Vista de calendario de comidas

5. **Usuario**: "¿Puedo hablar con un nutricionista?"
   - **IA recomienda**: Lic. Ana Rodríguez (especialista en pérdida de peso)
   - **Considera**: Perfil vegetariano del usuario
   - **Trigger**: Agenda con horarios disponibles

**Resultado**: Personalización profunda basada en conversación natural

---

## 🎙️ Configuración de Audio para Demo

### Opción 1: TTS en Vivo (Más Realista)
```typescript
// Usar Web Speech API
const audioConfig = {
  type: 'tts',
  text: response.text,
  lang: 'es-ES',
  rate: 1.0,
  pitch: 1.0
};
```

### Opción 2: Audio Pre-grabado (Mejor Calidad)

**Preparación previa**:
1. Graba respuestas con voz profesional
2. Guarda archivos en `/public/audio/demos/`
3. Nombra según escenario: `scenario1_response1.mp3`

**Configuración**:
```typescript
const audioConfig = {
  type: 'file',
  source: '/audio/demos/scenario1_response1.mp3',
  volume: 0.8
};
```

**Ventajas**:
- Calidad de audio superior
- Sin fallos de TTS
- Control total sobre la voz
- Profesional y pulido

### Opción 3: URL Externa (YouTube, SoundCloud)

```typescript
const audioConfig = {
  type: 'url',
  source: 'https://example.com/audio/response.mp3'
};
```

---

## 🎨 Configuración Visual Óptima

### Modo de Demostración Recomendado

1. **Pantalla Grande**: Proyector o TV 55"+
2. **Resolución**: 1920x1080 mínimo
3. **Navegador**: Chrome (mejor soporte de voz)
4. **Volumen**: Audio claro y audible en feria

### Ajustes Visuales

1. **Historial Oculto**: Solo últimas 3 interacciones visibles
2. **Tarjetas Amplias**: Productos y nutricionistas en modo carrusel
3. **Animaciones Suaves**: Transiciones fluidas
4. **Sin Scroll Exterior**: Solo scroll interno del chat

---

## 🔧 Triggers Inteligentes - Referencia Rápida

### Triggers Automáticos Disponibles

| Palabra Clave | Trigger | Resultado Visual |
|---------------|---------|------------------|
| "nutricionista cerca" | Location Request | Solicita geolocalización |
| "diabetes" | Nutritionist (Dr. Silva) | Tarjeta especialista diabetes |
| "deporte"/"gym" | Nutritionist (Dr. Mendoza) | Tarjeta nutrición deportiva |
| "perder peso" | Nutritionist (Lic. Rodríguez) | Tarjeta pérdida de peso |
| "producto"/"chocolate" | Products | Carrusel de productos |
| "foro"/"comunidad" | Forum Posts | Posts relevantes con IA summary |
| "receta" | Recipes | 3 opciones de recetas |

---

## 📱 Flujo de Navegación Óptimo

### Para Máximo Impacto en 10 Minutos

1. **Minuto 0-1**: Homepage → Mostrar hero y valor principal
2. **Minuto 1-3**: Chat IA → Modo voz-voz para impacto inicial
3. **Minuto 3-5**: Trigger productos → Mostrar integración tienda
4. **Minuto 5-7**: Trigger nutricionista → Geolocalización + reviews IA
5. **Minuto 7-9**: Foro → Mostrar comunidad y contenido
6. **Minuto 9-10**: Personalización → Planes y calendario

---

## 🎯 Tips para una Demo Perfecta

### Antes de la Demo

✅ **Practica los 5 escenarios** al menos 2 veces cada uno
✅ **Prueba el audio** en el espacio real de la feria
✅ **Verifica permisos de micrófono** en el navegador
✅ **Prepara respaldo** (audio pre-grabado si TTS falla)
✅ **Carga la página antes** para evitar delays de red
✅ **Modo pantalla completa** (F11) para profesionalismo

### Durante la Demo

✅ **Habla claro y pausado** si usas voz
✅ **Señala tarjetas y triggers** cuando aparezcan
✅ **Explica el "por qué"** detrás de cada recomendación
✅ **Muestra personalización** ajustando preferencias
✅ **Destaca el IA** en resúmenes de reviews y posts

### Manejo de Errores

❌ **Si TTS falla**: Cambia a audio pre-grabado
❌ **Si micrófono falla**: Usa modo texto-texto
❌ **Si conexión lenta**: Ya cargaste la página (modo offline)
❌ **Si pregunta no reconocida**: Reformula usando palabras clave

---

## 🎤 Frases Clave para la Demo

### Frases que Generan Mejores Resultados

✅ "Quiero un nutricionista cerca de mí" → Geolocalización
✅ "Soy diabético y necesito ayuda" → Especialista específico
✅ "Qué dice la comunidad sobre [tema]" → Posts de foro
✅ "Recomiéndame productos de chocolate" → Productos específicos
✅ "Dame recetas para el desayuno" → 3 opciones detalladas

### Frases para Evitar

❌ Preguntas muy abiertas sin contexto
❌ Temas fuera de nutrición/keto
❌ Preguntas médicas complejas (redirige a nutricionista)

---

## 📊 Métricas de Éxito en Demo

### Lo que Debes Lograr

- ✨ **Wow Factor**: Reacción positiva inicial (voz, animaciones)
- 🎯 **Precisión**: Recomendaciones relevantes al contexto
- 🔗 **Integración**: Mostrar conexión foro → productos → nutricionistas
- 🗣️ **Naturalidad**: Conversación fluida, no robótica
- 📍 **Personalización**: Geolocalización o preferencias del usuario

### Indicadores de Demo Exitosa

- Usuario pregunta "¿Esto ya está disponible?"
- Usuario pide probar ellos mismos
- Usuario toma fotos o videos
- Usuario pregunta por precios/acceso
- Usuario menciona diferenciación vs. competencia

---

## 🚀 Próximos Pasos (Post-Demo)

### Para Convertir Interesados en Usuarios

1. **Captura contacto**: Email para beta/lanzamiento
2. **Demo grabada**: Comparte video de la sesión
3. **Follow-up**: Email con features destacados
4. **Early access**: Oferta especial para early adopters

---

## 🔮 Futuras Mejoras (Roadmap)

### Features Planeados para Mencionar

- ✨ IA real con OpenAI/Gemini (actualmente simulado)
- 📅 Integración calendario (Calendly/Cal.com)
- 💳 Pagos reales (Stripe)
- 📊 Dashboard personalizado de progreso
- 🎥 Videollamadas con nutricionistas
- 🏆 Gamificación y logros

---

## ❓ Preguntas Frecuentes de la Audiencia

### Q: "¿Esto es IA real o simulación?"
**A**: "Actualmente es una simulación inteligente basada en reglas para la demo. En producción integraremos OpenAI/Gemini para conversaciones aún más naturales y contextuales."

### Q: "¿Cuánto cuesta?"
**A**: "El chat con IA es **gratuito**. Consultas con nutricionistas certificados tienen un costo ($40-60 USD/sesión) para garantizar calidad profesional."

### Q: "¿Está disponible ya?"
**A**: "Estamos en fase beta. Puedes registrarte para acceso anticipado."

### Q: "¿Funciona en móvil?"
**A**: "Sí, completamente responsive y con soporte de voz en iOS y Android."

### Q: "¿Cómo se diferencia de ChatGPT?"
**A**: "Estamos especializados en nutrición keto con integración de productos reales, nutricionistas certificados, y comunidad activa. ChatGPT es general, nosotros somos tu experto keto personalizado."

---

## 📞 Contacto para Preguntas sobre la Demo

Para cualquier duda sobre esta guía o la demostración:

- **Repositorio**: [github.com/leodamac/ProyectoSI](https://github.com/leodamac/ProyectoSI)
- **Equipo**: Ver README.md para contactos

---

**¡Éxito en tu demostración!** 🚀🥑

> Recuerda: El objetivo no es solo impresionar técnicamente, sino mostrar cómo Alkadami Keto **soluciona problemas reales** de personas buscando mejorar su salud con la dieta cetogénica.
