# Alkadami Keto - Servicio Freemium de Nutrición Keto

Una plataforma moderna de estilo de vida keto con IA inteligente y nutricionistas certificados. Construida con Next.js, React, TypeScript y Tailwind CSS.

## 🥑 Características Principales

### Servicios Freemium

- **Chat con IA (Gratis)**: Asistente inteligente de nutrición keto 24/7
  - Conversación por texto o voz
  - Recetas keto personalizadas
  - Recomendaciones de productos inteligentes
  - Recopilación automática de preferencias y restricciones dietéticas
  
- **Nutricionistas Certificados (Premium)**: Acceso a profesionales especializados
  - Consultas personalizadas
  - Planes nutricionales diseñados a medida
  - Seguimiento profesional continuo
  - Especialistas en diabetes, deporte, pérdida de peso y metabolismo

- **E-commerce Keto**: Productos saludables disponibles
  - Catálogo de productos keto
  - Sistema de carrito con persistencia
  - Integración con WhatsApp para pedidos

## 🤖 Tecnología de IA

### Arquitectura MCP (Model Context Protocol)

La aplicación implementa el protocolo MCP para facilitar la migración futura a servicios de IA reales:

- **MCPChatService**: Servicio de chat modular listo para integración
- **LocalAIService**: Integración con APIs de IA del navegador (Gemini Nano)
  - Language Detector API
  - Summarizer API
  - Translator API

### Wizard of Oz Approach

Actualmente usa simulación inteligente de IA con lógica predefinida, pero la arquitectura está lista para integración con:
- OpenAI GPT-4
- Google Gemini
- Anthropic Claude
- Otros servicios de IA

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 + Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Base de Datos**: Firebase/Firestore (configurado)
- **Estado**: React Context API
- **IA**: ai SDK, APIs del navegador
- **Voz**: Web Speech API

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/leodamac/ProyectoSI.git
   cd ProyectoSI
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional)
   ```bash
   cp .env.example .env.local
   # Edita .env.local con tus valores
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000)

5. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── chat-ia/           # Página de chat con IA
│   ├── nutricionistas/    # Página de nutricionistas certificados
│   ├── productos/         # Catálogo de productos keto
│   ├── contacto/          # Página de contacto
│   ├── page.tsx           # Homepage (servicio prioritario)
│   └── layout.tsx         # Layout principal
├── components/
│   ├── AIChat.tsx         # Componente de chat con IA
│   ├── Navigation.tsx     # Navegación con enlaces destacados
│   └── CartContext.tsx    # Contexto del carrito
├── data/
│   ├── nutritionists.ts   # Datos de nutricionistas
│   ├── recipes.ts         # Recetas keto
│   └── products.ts        # Productos
├── lib/
│   ├── mcp-services.ts    # Servicios MCP para IA
│   └── firebase.ts        # Configuración Firebase
└── types/
    └── index.ts           # Definiciones TypeScript
```

## 🎨 Diseño

### Paleta de Colores Keto

- **Emerald**: #10b981 - Color principal (salud, naturaleza)
- **Teal**: #14b8a6 - Secundario (frescura, profesionalismo)
- **Earth Tones**: Tonos tierra para calidez
- **Gradientes sutiles**: Sin abusar, diseño limpio

### Principios de Diseño

- ✅ Servicio primero, productos segundo
- ✅ Diseño diferencial y memorable
- ✅ Animaciones sutiles y fluidas
- ✅ Mobile-first responsive
- ✅ Accesibilidad y UX optimizada

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint

## 📱 Funcionalidades por Página

### Homepage (/)
- Hero destacando el servicio de IA
- Sección de servicios inteligentes (IA + Nutricionistas)
- Productos destacados
- Testimonios y validación social
- CTAs claros para conversión

### Chat IA (/chat-ia)
- Interfaz de chat completa
- Entrada por texto o voz
- Respuestas inteligentes contextuales
- Sugerencias de recetas y productos
- Sidebar informativo

### Nutricionistas (/nutricionistas)
- Perfiles detallados de profesionales
- Horarios de disponibilidad
- Certificaciones y experiencia
- Reseñas verificadas
- Sistema de agendamiento

### Productos (/productos)
- Catálogo completo de productos keto
- Filtros y ordenamiento
- Información nutricional
- Sistema de carrito

## 🔮 Migración a Servicios Reales

Ver [`DOCUMENTATION.md`](./DOCUMENTATION.md) para guía completa de migración.

### Resumen de Migración

1. **Fase 1**: Integración de IA real (OpenAI/Gemini)
2. **Fase 2**: Base de datos real (Firestore)
3. **Fase 3**: Sistema de pagos (Stripe)
4. **Fase 4**: Agendamiento de citas (Calendly/Cal.com)

La arquitectura modular permite reemplazar componentes mock sin cambiar la interfaz.

## 📊 Métricas Importantes

- **Engagement**: Mensajes de chat, uso de voz, duración de sesión
- **Conversión**: Chat → Productos, Chat → Nutricionistas
- **Satisfacción**: NPS, reseñas, feedback

## 🔐 Seguridad

- Datos de chat almacenados localmente
- API keys en variables de entorno
- Cumplimiento GDPR ready
- Validación de entradas

## 🌐 Deployment

Optimizado para despliegue en:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**

## 📚 Documentación

- [Documentación Técnica Completa](./DOCUMENTATION.md) - Arquitectura, implementación y roadmap
- [AI SDK Documentation](https://ai-sdk.dev/docs/introduction)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autores

* **Leonardo Macias** - FIEC - [leodamac](https://github.com/leodamac)
* **Carlos Abel Cabanilla Tomala** - FIEC
* **David Eduardo Solorzano Flores** - FCSH
* **Dereck Oscar Enriquez Perez** - FIEC
* **Alexander Joshue Barco Lascano** - FCSH
* **Valeska Anahi Sanchez Ramirez** - FCSH
* **Kevin Santiago Mejia Parra** - FIEC

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

¡Bienvenido a Alkadami Keto! 🥑✨
