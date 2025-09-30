# Sweet & Healthy - Tienda de Postres Saludables

Una landing page moderna y profesional para la venta de postres saludables, construida con Next.js, React, TypeScript y Tailwind CSS. Diseñada siguiendo el concepto de "ALKADAMI KETO" con enfoque en transmitir confianza, saludabilidad y persuasión.

## 🍰 Características

- **Landing Page Moderna**: Diseño profesional con copy persuasivo "Postres que cuidan, sabores que enamoran"
- **Problema/Solución Framework**: Explicación clara del problema (postres tradicionales) vs solución (postres saludables)
- **Catálogo de Productos**: Navegación completa de postres saludables con filtros por categoría y ordenamiento por precio
- **Carrito de Compras**: Funcionalidad completa de carrito con persistencia en localStorage
- **Integración WhatsApp**: Contacto directo via WhatsApp con CTAs prominentes
- **Testimonios y Validación Social**: Reseñas de clientes y respaldo nutricional
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Animaciones Smooth**: Framer Motion para transiciones suaves y micro-interacciones
- **Interfaz Moderna**: Paleta de colores fresh (emerald, amber, white) con tipografía premium
- **TypeScript**: Tipado fuerte para mayor seguridad y mejor experiencia de desarrollo
- **Base de Datos**: Configuración lista para Firebase/Firestore con soporte para CRUD

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 + Next.js 15
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Base de Datos**: Firebase (configurado)
- **Estado**: React Context API para manejo del carrito
- **Build Tool**: Turbopack (Next.js)
- **Deployment**: Vercel-ready

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

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Edita .env.local con tus valores reales
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

## 🌟 Nuevas Características v2.0

### Landing Page Moderna
- ✅ Hero section con copy persuasivo "Postres que cuidan, sabores que enamoran"
- ✅ Sección Problema/Solución para educación del cliente
- ✅ Beneficios destacados con iconos modernos (Sin azúcar, Sin gluten, Apto diabéticos)
- ✅ Testimonios y validación social
- ✅ CTAs claras para conversión

### Experiencia de Usuario
- ✅ Animaciones suaves con Framer Motion
- ✅ Paleta de colores moderna (emerald, amber, whites)
- ✅ Diseño mobile-first completamente responsivo
- ✅ Micro-interacciones y hover effects

### Contacto y Conversión
- ✅ Integración completa con WhatsApp
- ✅ Página de contacto profesional con formulario
- ✅ FAQ section para reducir fricción
- ✅ Multiple CTAs estratégicamente ubicados

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── about/             # Página "Nosotros"
│   ├── carrito/           # Página del carrito de compras
│   ├── contacto/          # Página de contacto con WhatsApp
│   ├── productos/         # Catálogo de productos
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Landing page moderna
├── components/            # Componentes reutilizables
│   ├── CartContext.tsx   # Context del carrito
│   └── Navigation.tsx    # Componente de navegación
├── data/                 # Datos mock de productos
│   └── products.ts
├── lib/                  # Configuraciones
│   └── firebase.ts       # Configuración de Firebase
└── types/                # Definiciones de tipos TypeScript
    └── index.ts
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint

## 🍯 Productos Destacados

La aplicación incluye una variedad de postres saludables:
- Brownies de chocolate negro (sin gluten)
- Cheesecakes de frutos rojos
- Muffins de plátano y avena
- Cookies de chía y limón (veganas)
- Tartas de zanahoria
- Helados veganos de coco y mango

## 🛒 Funcionalidades del Carrito

- ✅ Agregar productos al carrito
- ✅ Modificar cantidades
- ✅ Eliminar productos individuales
- ✅ Vaciar carrito completo
- ✅ Persistencia en localStorage
- ✅ Cálculo automático de totales
- ✅ Contador de productos en navegación

## 🔮 Funcionalidades Futuras

- [ ] Autenticación de usuarios con Firebase Auth
- [ ] Integración completa con Firestore
- [ ] Procesamiento de pagos
- [ ] Sistema de pedidos y tracking
- [ ] Panel de administración
- [ ] Notificaciones push
- [ ] Sistema de reviews y calificaciones

## 🌐 Deployment

El proyecto está configurado para desplegarse fácilmente en:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Leonardo Damaceno** - [leodamac](https://github.com/leodamac)

---

¡Disfruta creando postres saludables virtuales! 🍰✨
