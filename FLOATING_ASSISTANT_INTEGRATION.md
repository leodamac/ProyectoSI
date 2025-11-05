# Integración del Asistente Flotante con Funcionalidades de Chat Avanzado

## Resumen de Cambios

Se ha integrado el asistente flotante (FloatingAIAssistant) con las funcionalidades avanzadas del chat (VoiceFirstChat), agregando soporte completo para modos de voz, retroalimentación visual, y sanitización de texto para salida de voz.

## Nuevas Funcionalidades

### 1. Soporte para Modos de Interacción

El asistente flotante ahora soporta 4 modos de interacción:

- **Texto → Texto**: Modo tradicional de chat por texto
- **Voz → Voz**: Modo Alexa-style, completamente por voz
- **Voz → Texto**: Hablar para enviar, leer respuestas
- **Texto → Voz**: Escribir para enviar, escuchar respuestas

#### Cambio de Modo

Los usuarios pueden cambiar entre modos usando el botón de configuración (⚙️) en la cabecera del asistente flotante.

### 2. Sanitización de Texto para Voz

Se creó un nuevo módulo `src/utils/textForVoice.ts` que proporciona:

- **stripMarkdown()**: Elimina formato markdown (negrita, cursiva, enlaces, código, etc.)
- **stripEmojis()**: Elimina emojis usando rangos Unicode
- **stripSymbols()**: Elimina símbolos visuales (✓, ✅, →, •, etc.)
- **sanitizeForVoice()**: Función principal que aplica todas las sanitizaciones
- **convertListsToSpeech()**: Convierte listas numeradas/con viñetas a formato hablado ("primero", "segundo", etc.)

#### Ejemplo de Sanitización

**Entrada:**
```
¡Hola! 👋 Tengo estas recetas keto para ti:

• **Brownie de Chocolate** - Delicioso postre
• **Cheesecake** ✓ - Sin azúcar

[Ver más](https://example.com)
```

**Salida para Voz:**
```
Hola! Tengo estas recetas keto para ti:

primero, Brownie de Chocolate - Delicioso postre
segundo, Cheesecake - Sin azúcar

Ver más
```

### 3. Retroalimentación Visual

#### Cuando está Escuchando (Listening)

El asistente muestra un indicador visual con barras animadas:

```
┌─────────────────────────────────┐
│ ▌▌▌▌▌ Escuchando...            │
└─────────────────────────────────┘
```

- Fondo rojo claro
- Barras verticales animadas
- Texto "Escuchando..." en rojo

#### Cuando está Hablando (Speaking)

El asistente muestra un indicador de audio:

```
┌─────────────────────────────────┐
│ 🔊 Hablando...           [Parar]│
└─────────────────────────────────┘
```

- Fondo azul claro
- Ícono de volumen con pulso
- Botón para detener el audio

### 4. Integración con Hooks de Voz

Se integró el hook `useVoiceMode` que:

- Gestiona el estado del modo de interacción
- Controla la reproducción de audio automática
- Sanitiza el texto antes de convertirlo a voz
- Proporciona callbacks para eventos de inicio/fin de audio

También se integró `useSpeechToText` para:

- Reconocimiento de voz usando Web Speech API
- Soporte para español (es-ES)
- Detección de transcripciones finales

## Archivos Modificados

### 1. `src/components/FloatingAIAssistant.tsx`

**Cambios principales:**

- Agregado hook `useVoiceMode` para gestión de modos
- Agregado hook `useSpeechToText` para reconocimiento de voz
- Agregado componente `InteractionModeModal` para cambiar modos
- Agregada retroalimentación visual para estados de escucha/habla
- Agregado botón de micrófono para modos de voz
- Agregado auto-reproducción de respuestas en modos de voz

**Nuevas dependencias:**

```typescript
import { useVoiceMode } from '@/hooks/useVoiceMode';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import InteractionModeModal from '@/components/chat/InteractionModeModal';
```

### 2. `src/hooks/useVoiceMode.ts`

**Cambios:**

- Agregada importación de utilidades de sanitización
- Modificado `playResponse()` para sanitizar texto antes de TTS

**Antes:**
```typescript
text: text,
```

**Después:**
```typescript
const cleanText = audioSource ? text : sanitizeForVoice(convertListsToSpeech(text));
text: cleanText,
```

### 3. `src/utils/textForVoice.ts` (Nuevo)

Módulo completo de sanitización de texto para voz con:

- 5 funciones exportadas
- Soporte para markdown, emojis, símbolos
- Conversión de listas a formato hablado
- Limpieza de espacios múltiples

## Comportamiento por Modo

### Modo Texto → Texto

- Campo de texto visible
- Botón de enviar
- Sin reproducción de audio
- Historial completo visible

### Modo Voz → Voz

- Solo botón de micrófono
- Sin campo de texto
- Reproducción automática de respuestas
- Historial limitado (3 mensajes)
- Indicadores visuales de escucha/habla

### Modo Voz → Texto

- Botón de micrófono + campo de texto
- Sin reproducción de audio
- Historial completo visible
- Indicador visual al escuchar

### Modo Texto → Voz

- Campo de texto + botón de enviar
- Reproducción automática de respuestas
- Historial completo visible
- Indicador visual al hablar

## Compatibilidad

- **Navegadores soportados**: Chrome, Edge, Safari (con limitaciones en iOS)
- **APIs utilizadas**: 
  - Web Speech API (SpeechRecognition)
  - Web Speech API (SpeechSynthesis)
- **Fallback**: Si el navegador no soporta voz, solo muestra controles de texto

## Consideraciones Móviles

El diseño es responsive y optimizado para móvil:

- El asistente flotante se adapta al ancho de la pantalla en dispositivos móviles
- Los indicadores visuales son discretos y no obstruyen la interfaz
- El botón de micrófono es de tamaño adecuado para touch
- En modo voz, se minimiza el contenido visual para enfocarse en la interacción auditiva

## Testing

Para probar la integración:

1. **Abrir el asistente flotante** en cualquier página (excepto /chat-ia)
2. **Hacer clic en el botón de configuración** (⚙️) en la cabecera
3. **Seleccionar un modo de voz** (ej: Voz → Voz)
4. **Hacer clic en el botón de micrófono** y hablar
5. **Observar** la retroalimentación visual (indicador de escucha)
6. **Escuchar** la respuesta del asistente (sin emojis ni markdown)

## Solución de Problemas

### El micrófono no funciona

- Verificar que el navegador soporte Web Speech API
- Verificar permisos de micrófono en el navegador
- Probar en Chrome/Edge (mejor soporte)

### El audio no se reproduce

- Verificar que el navegador soporte SpeechSynthesis
- Verificar volumen del sistema
- Verificar que el modo seleccionado incluya salida de voz

### El texto incluye markdown en voz

- Verificar que la función `sanitizeForVoice()` se esté llamando
- Revisar logs de consola para errores

## Próximos Pasos Potenciales

1. Agregar más idiomas de voz
2. Permitir ajustar velocidad/tono de voz
3. Agregar reconocimiento de comandos de voz (ej: "abrir productos")
4. Mejorar la detección de listas y formateo complejo
5. Agregar soporte para voces personalizadas (AI voices)
