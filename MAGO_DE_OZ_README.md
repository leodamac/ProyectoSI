# Guía Completa del Sistema Mago de Oz

## 📖 Tabla de Contenidos

1. [¿Qué es el Mago de Oz?](#qué-es-el-mago-de-oz)
2. [¿Cómo Acceder?](#cómo-acceder)
3. [Subir un Script](#subir-un-script)
4. [Crear tu Propio Script](#crear-tu-propio-script)
5. [Estructura del Script](#estructura-del-script)
6. [Ejemplos Prácticos](#ejemplos-prácticos)
7. [Activar y Probar Scripts](#activar-y-probar-scripts)
8. [Consejos y Mejores Prácticas](#consejos-y-mejores-prácticas)
9. [Solución de Problemas](#solución-de-problemas)

---

## ¿Qué es el Mago de Oz?

El **Mago de Oz** es un sistema que permite simular conversaciones reales con el asistente de IA para hacer demostraciones convincentes del producto. El nombre viene de la técnica de UX donde se simula funcionalidad automática de forma manual para probar conceptos.

### Características Principales

- ✨ **Invisible**: El usuario no sabe que está siguiendo un guion
- 🎭 **Realista**: Las conversaciones se ven y sienten naturales
- 🔄 **Flexible**: Puedes cargar diferentes scripts para diferentes escenarios
- 🎯 **Dirigido**: Guía al usuario exactamente por donde quieres que vaya
- 📱 **Compatible**: Funciona en modo texto y voz, en desktop y móvil

### ¿Para Qué Sirve?

- **Demostraciones de Ventas**: Muestra el producto funcionando perfectamente
- **Presentaciones**: Exhibe todas las funcionalidades sin errores
- **Pruebas de Concepto**: Valida ideas antes de implementarlas
- **Capacitación**: Entrena a tu equipo con escenarios específicos
- **Videos Promocionales**: Graba contenido con conversaciones perfectas

---

## ¿Cómo Acceder?

### Opción 1: Página de Configuración

Navega directamente a:
```
https://tu-dominio.com/mago-de-oz
```

Esta página NO está enlazada públicamente - solo tú conoces la URL.

### Opción 2: URL Directa

Si estás desarrollando localmente:
```
http://localhost:3000/mago-de-oz
```

---

## Subir un Script

### Paso 1: Crear o Conseguir un Script JSON

Puedes:
- Descargar la plantilla desde la página del Mago de Oz
- Usar uno de los scripts de ejemplo incluidos
- Crear tu propio script siguiendo la estructura

### Paso 2: Subir el Archivo

1. Ve a `/mago-de-oz`
2. Haz clic en "Subir Script" o arrastra el archivo JSON
3. Espera la confirmación de carga exitosa

### Paso 3: Activar el Script

1. Busca tu script en la lista de "Scripts Disponibles"
2. Haz clic en el botón ▶️ (Play) para activarlo
3. Verás una confirmación verde indicando que el script está activo

### Paso 4: Probar

1. Abre el asistente flotante (el botón en la esquina inferior derecha)
2. La conversación comenzará automáticamente con el script cargado
3. Sigue las respuestas sugeridas o habla naturalmente

---

## Crear tu Propio Script

### Plantilla Básica

Descarga la plantilla desde la página `/mago-de-oz` o usa esta estructura:

```json
{
  "id": "mi-script-unico",
  "name": "Nombre del Script",
  "description": "Descripción breve de qué simula este script",
  "userProfile": {
    "type": "beginner",
    "name": "Juan",
    "goals": ["objetivo 1", "objetivo 2"],
    "restrictions": [],
    "background": "Contexto del usuario simulado"
  },
  "steps": [
    {
      "id": "step-1",
      "order": 1,
      "userInput": "Hola",
      "assistantResponse": "¡Hola! ¿En qué puedo ayudarte?",
      "nextStepId": "step-2"
    }
  ],
  "metadata": {
    "estimatedDuration": 10,
    "difficulty": "easy",
    "tags": ["demo", "ejemplo"],
    "author": "Tu Nombre",
    "createdAt": "2024-01-15"
  }
}
```

### Campos Requeridos

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `id` | Identificador único (sin espacios) | `"cliente-principiante"` |
| `name` | Nombre descriptivo | `"Cliente Nuevo en Keto"` |
| `description` | Qué simula el script | `"Una persona que quiere empezar keto"` |
| `userProfile.type` | Tipo de usuario | `"beginner"`, `"athlete"`, `"professional"` |
| `userProfile.name` | Nombre del usuario simulado | `"Leonardo"` |
| `steps` | Array de pasos (mínimo 1) | Ver estructura abajo |

---

## Estructura del Script

### Paso Simple

```json
{
  "id": "step-1",
  "order": 1,
  "userInput": "Hola",
  "assistantResponse": "¡Hola! Bienvenido. ¿En qué puedo ayudarte hoy?",
  "nextStepId": "step-2"
}
```

### Paso con Variantes (Múltiples Respuestas)

Las variantes permiten que el script responda a diferentes formas de decir lo mismo:

```json
{
  "id": "step-2",
  "order": 2,
  "userInput": "Quiero información sobre keto",
  "assistantResponse": "Claro, te cuento sobre la dieta keto...",
  "variants": [
    {
      "pattern": "(info|información|explicación|cuéntame)",
      "response": "Por supuesto, déjame explicarte..."
    },
    {
      "pattern": "(keto|cetogénica|dieta)",
      "response": "¡Perfecto! La dieta keto es..."
    }
  ],
  "nextStepId": "step-3"
}
```

**Cómo Funcionan las Variantes:**
- El sistema usa "fuzzy matching" - no necesita ser exacto
- Los patrones son expresiones regulares (regex)
- Si el usuario dice algo que coincide con el patrón, usa esa respuesta variante
- Si no coincide, usa la respuesta por defecto (`assistantResponse`)

### Paso con Disparadores (Triggers)

Los triggers muestran contenido adicional como productos, recetas, etc.:

```json
{
  "id": "step-3",
  "order": 3,
  "userInput": "Muéstrame productos",
  "assistantResponse": "Aquí tienes algunos productos recomendados...",
  "trigger": {
    "type": "product",
    "data": [
      { "id": "prod-1", "name": "Aceite MCT" }
    ]
  },
  "nextStepId": "step-4"
}
```

**Tipos de Triggers Disponibles:**
- `product` - Muestra productos
- `nutritionist` - Muestra nutricionistas
- `recipe` - Muestra recetas
- `navigate` - Navega a otra página

### Paso con Acciones

Las acciones ejecutan funcionalidades como agregar al carrito:

```json
{
  "id": "step-4",
  "order": 4,
  "userInput": "Quiero agendar una cita",
  "assistantResponse": "Perfecto, te ayudo con eso...",
  "actions": [
    {
      "type": "schedule_appointment",
      "data": {
        "nutritionistId": "n1"
      }
    }
  ]
}
```

**Tipos de Acciones Disponibles:**
- `add_to_cart` - Agrega productos al carrito
- `schedule_appointment` - Agenda cita
- `navigate` - Navega a una página
- `show_card` - Muestra tarjeta contextual

---

## Ejemplos Prácticos

### Ejemplo 1: Cliente Nuevo (Principiante)

```json
{
  "id": "cliente-nuevo-keto",
  "name": "Cliente Nuevo Interesado en Keto",
  "description": "Persona que nunca ha hecho keto y quiere aprender",
  "userProfile": {
    "type": "beginner",
    "name": "Leonardo",
    "goals": ["bajar de peso", "mejorar salud"],
    "restrictions": [],
    "background": "Completamente nuevo, sin experiencia en dietas"
  },
  "steps": [
    {
      "id": "greeting",
      "order": 1,
      "userInput": "Hola",
      "assistantResponse": "¡Hola! Soy tu asistente keto. ¿Eres nuevo en esto?",
      "nextStepId": "confirm-new"
    },
    {
      "id": "confirm-new",
      "order": 2,
      "userInput": "Sí, soy nuevo",
      "assistantResponse": "¡Genial! Te voy a explicar lo básico de la dieta keto...",
      "variants": [
        {
          "pattern": "(nuevo|principiante|nunca|primera vez)",
          "response": "¡Perfecto! Empecemos desde el principio..."
        }
      ],
      "nextStepId": "explain-keto"
    },
    {
      "id": "explain-keto",
      "order": 3,
      "userInput": "Explícame",
      "assistantResponse": "La dieta keto se basa en reducir carbohidratos a menos de 20g al día...",
      "nextStepId": "products"
    },
    {
      "id": "products",
      "order": 4,
      "userInput": "¿Qué productos necesito?",
      "assistantResponse": "Estos son los productos esenciales para comenzar...",
      "trigger": {
        "type": "product",
        "data": []
      },
      "nextStepId": "nutritionist"
    },
    {
      "id": "nutritionist",
      "order": 5,
      "userInput": "¿Me puedes conectar con un nutricionista?",
      "assistantResponse": "¡Por supuesto! Te presento a nuestros expertos...",
      "trigger": {
        "type": "nutritionist",
        "data": null
      }
    }
  ],
  "metadata": {
    "estimatedDuration": 8,
    "difficulty": "easy",
    "tags": ["principiante", "intro", "básico"],
    "author": "Equipo Alkadami"
  }
}
```

### Ejemplo 2: Atleta Optimizando Rendimiento

```json
{
  "id": "atleta-rendimiento",
  "name": "Atleta Optimizando con Keto",
  "description": "Deportista que hace CrossFit busca mejorar rendimiento",
  "userProfile": {
    "type": "athlete",
    "name": "Carlos",
    "goals": ["mejorar rendimiento", "reducir inflamación"],
    "restrictions": [],
    "background": "Hace CrossFit 5 veces por semana"
  },
  "steps": [
    {
      "id": "athlete-intro",
      "order": 1,
      "userInput": "Hola, hago CrossFit y quiero probar keto",
      "assistantResponse": "¡Excelente! Keto puede mejorar mucho tu rendimiento. ¿Cuántas veces entrenas?",
      "nextStepId": "training-freq"
    },
    {
      "id": "training-freq",
      "order": 2,
      "userInput": "5 veces a la semana",
      "assistantResponse": "Perfecto. Para tu nivel de entrenamiento, necesitas una estrategia específica...",
      "variants": [
        {
          "pattern": "(\\d+)\\s*(veces|días|sesiones)",
          "response": "Entendido. Con ese volumen de entrenamiento, tu plan debe ser personalizado..."
        }
      ],
      "nextStepId": "sports-nutritionist"
    },
    {
      "id": "sports-nutritionist",
      "order": 3,
      "userInput": "¿Hay nutricionistas especializados en deportes?",
      "assistantResponse": "¡Sí! Tenemos expertos en nutrición deportiva cetogénica...",
      "trigger": {
        "type": "nutritionist",
        "data": { "specialty": "sports" }
      }
    }
  ],
  "metadata": {
    "estimatedDuration": 6,
    "difficulty": "medium",
    "tags": ["deportivo", "atleta", "rendimiento"],
    "author": "Equipo Alkadami"
  }
}
```

---

## Activar y Probar Scripts

### Activación

1. **Desde la Página Mago de Oz:**
   - Ve a `/mago-de-oz`
   - Encuentra tu script en la lista
   - Haz clic en ▶️ (Play)
   - Verás "Script Activo" en verde

2. **Verificación:**
   - Solo un script puede estar activo a la vez
   - El script activo se muestra con badge verde
   - Los demás scripts se pueden activar haciendo clic en Play

### Prueba

1. **Abrir el Asistente:**
   - Haz clic en el botón flotante (esquina inferior derecha)
   - La conversación se inicia automáticamente con "Hola"

2. **Seguir el Guion:**
   - El sistema espera las respuestas que definiste en `userInput`
   - Puedes escribir exactamente lo que dice el script
   - O puedes hablar de forma similar (fuzzy matching)

3. **Desviarse del Guion:**
   - Si dices algo diferente, el sistema intentará adaptarse
   - Las variantes ayudan a capturar diferentes formas de decir lo mismo
   - Si te desvías mucho, puede caer al sistema de simulación regular

4. **Modo Voz:**
   - Cambia al modo voz desde el indicador de modo
   - Di las respuestas en voz alta
   - El sistema transcribe y procesa igual que el texto

---

## Consejos y Mejores Prácticas

### 📝 Diseño de Scripts

1. **Sé Natural:**
   - Escribe como hablaría una persona real
   - Evita lenguaje demasiado formal o robótico
   - Usa emojis moderadamente para dar personalidad

2. **Anticipa Variaciones:**
   - La gente no habla exactamente igual
   - Usa variantes para capturar diferentes formas de decir lo mismo
   - Ejemplo: "info", "información", "explícame", "cuéntame" → misma respuesta

3. **Mantén el Flujo:**
   - Cada paso debe llevar naturalmente al siguiente
   - Usa preguntas abiertas para guiar la conversación
   - Proporciona opciones claras cuando sea posible

4. **Longitud Adecuada:**
   - 5-10 pasos para demos cortas (5-10 min)
   - 10-15 pasos para demos completas (15-20 min)
   - No hagas scripts demasiado largos

### 🎯 Testing

1. **Prueba el Script Tú Mismo:**
   - Antes de usarlo en una demo, pruébalo completamente
   - Intenta desviarte un poco para ver cómo responde
   - Verifica que todos los triggers funcionen

2. **Prueba en Diferentes Modos:**
   - Texto: Escribe las respuestas
   - Voz: Habla las respuestas
   - Móvil: Prueba en celular

3. **Prepara el Contexto:**
   - Ten tu navegador en la página correcta
   - Asegúrate de que el script correcto esté activo
   - Limpia el historial de chat si es necesario

### 🔒 Seguridad y Privacidad

1. **Página Oculta:**
   - `/mago-de-oz` no está enlazada públicamente
   - Solo compartir con personas autorizadas
   - Considera agregar autenticación si es necesario

2. **Scripts Locales:**
   - Los scripts subidos se guardan en localStorage del navegador
   - No se envían al servidor
   - Se pierden si se limpia el caché del navegador

3. **Demos en Vivo:**
   - El usuario NO ve que está siguiendo un script
   - No hay indicadores visuales de simulación
   - Parece una conversación 100% natural

---

## Solución de Problemas

### El Script No Se Activa

**Problema:** Hago clic en Play pero no pasa nada

**Soluciones:**
1. Refresca la página
2. Verifica que el JSON sea válido
3. Revisa la consola del navegador (F12) para errores
4. Intenta desactivar otros scripts primero

### El Asistente No Responde Según el Script

**Problema:** Las respuestas no coinciden con lo que definí

**Soluciones:**
1. Verifica que el script esté activo (badge verde)
2. Confirma que estás escribiendo algo similar a `userInput`
3. Revisa si hay variantes definidas que coincidan
4. Prueba descargar y recargar el script

### El Script Se "Salta" Pasos

**Problema:** La conversación no sigue el orden esperado

**Soluciones:**
1. Verifica que los `nextStepId` apunten a IDs válidos
2. Confirma que el orden (`order`) sea secuencial
3. Revisa que no haya IDs duplicados
4. Asegúrate de que todos los pasos estén conectados

### Error al Subir el Script

**Problema:** "Formato de script inválido"

**Soluciones:**
1. Valida tu JSON en https://jsonlint.com/
2. Verifica que todos los campos requeridos existan
3. Confirma que el ID sea único
4. Revisa que `steps` sea un array con al menos un elemento

### El Script No Se Guarda

**Problema:** Desaparece al refrescar la página

**Causa:** Los scripts se guardan en localStorage del navegador

**Soluciones:**
1. No limpies el caché/cookies
2. Mantén el script en modo privado/incógnito
3. Guarda una copia del JSON externamente
4. Re-sube el script si es necesario

---

## 🎓 Recursos Adicionales

### Documentación Relacionada

- **SCRIPT_QUICK_START.md**: Guía rápida en inglés
- **SCRIPT_SYSTEM_IMPLEMENTATION.md**: Detalles técnicos de implementación
- **src/data/scripts.ts**: Ejemplos de scripts en código

### Patrones de Regex Útiles

```regex
(sí|si|yes|ok|dale|perfecto)        # Confirmación
(no|nope|nada|paso)                 # Negación
(info|información|ayuda|explica)    # Solicitud de ayuda
(\\d+)                              # Cualquier número
(keto|cetogénica|cetogenica)        # Variantes de escritura
(quiero|necesito|busco)             # Intenciones
```

### Emojis Recomendados

- 💚 🥑 - Tema keto/saludable
- 👋 😊 - Saludos amigables
- 🍳 🥓 - Comida keto
- 💪 🏋️ - Fitness/deporte
- 📊 📈 - Datos/progreso
- ⭐ ✨ - Destacar algo especial
- 👨‍⚕️ 🏥 - Profesionales de salud

---

## 📞 Soporte

¿Necesitas ayuda? Opciones:

1. **Revisa esta guía** - La mayoría de problemas están cubiertos aquí
2. **Consulta los ejemplos** - En `src/data/scripts.ts`
3. **Descarga la plantilla** - Desde `/mago-de-oz`
4. **Prueba scripts existentes** - Los scripts por defecto funcionan

---

## 🚀 Siguiente Paso

¡Estás listo para crear demos impresionantes!

1. Ve a `/mago-de-oz`
2. Descarga la plantilla
3. Crea tu primer script
4. Súbelo y actívalo
5. ¡Pruébalo en el asistente flotante!

**¡Éxito con tus demostraciones! 🎭**

---

*Última actualización: Noviembre 2024*
*Versión: 1.0*
*Equipo: Alkadami Keto*
