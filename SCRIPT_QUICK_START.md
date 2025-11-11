# Quick Start Guide: Script System

## For Users/Testers

### Testing the Voice Agent
1. Navigate to `/chat-ia` page
2. Try different interaction modes:
   - Text → Text (default)
   - Voice → Voice (click mode indicator, select voice-voice)
3. On mobile, voice mode shows as floating button
4. Speak and agent audio should stop automatically

### Using the Script System
1. Click the **📄 Script icon** in the chat header
2. Choose a script:
   - **Viaje Keto para Principiantes**: For someone new to keto
   - **Optimización Keto para Atletas**: For athletes doing CrossFit
3. Read the script description and user profile
4. Click **"Iniciar Guion"**
5. The chat will start with the first interaction
6. You can:
   - Follow the suggested inputs (hints shown in indicator)
   - Type/speak naturally - fuzzy matching works!
   - Deviate from script anytime
   - Close script using X button

### Script Progress
- Purple banner shows script is active
- Progress bar updates as you advance
- Step counter (e.g., "3/7")
- Click lightbulb 💡 for hints
- Expand for more details

## For Developers

### Creating a New Script

1. **Edit** `src/data/scripts.ts`
2. **Define your script**:
```typescript
export const myScript: ConversationScript = {
  id: 'my-script-id',
  name: 'Mi Guion Nuevo',
  description: 'Descripción breve',
  userProfile: {
    type: 'beginner',
    name: 'Juan',
    goals: ['objetivo1', 'objetivo2'],
  },
  steps: [
    {
      id: 'step-1',
      order: 1,
      userInput: 'Hola',
      assistantResponse: 'Respuesta del asistente...',
      nextStepId: 'step-2',
    },
    // More steps...
  ],
  metadata: {
    estimatedDuration: 10,
    tags: ['tag1', 'tag2'],
  },
};
```

3. **Add to exports**:
```typescript
export const availableScripts: ConversationScript[] = [
  beginnerKetoScript,
  athleteKetoScript,
  myScript, // Add here
];
```

### Script Step Features

**Basic Step**
```typescript
{
  id: 'step-1',
  order: 1,
  userInput: 'Expected input',
  assistantResponse: 'Response text',
  nextStepId: 'step-2',
}
```

**With Variants (flexible matching)**
```typescript
{
  id: 'step-2',
  order: 2,
  userInput: 'Quiero recetas',
  assistantResponse: 'Default response',
  variants: [
    {
      pattern: '(receta|recipe|cocinar)',
      response: 'Variant response for recipes',
    },
    {
      pattern: '(producto|comprar)',
      response: 'Variant response for products',
    },
  ],
  nextStepId: 'step-3',
}
```

**With Triggers (show cards)**
```typescript
{
  id: 'step-3',
  order: 3,
  userInput: 'Muéstrame productos',
  assistantResponse: 'Aquí están los productos...',
  trigger: {
    type: 'product',
    data: sampleProducts.slice(0, 3),
  },
  nextStepId: 'step-4',
}
```

**With Actions**
```typescript
{
  id: 'step-4',
  order: 4,
  userInput: 'Quiero agendar',
  assistantResponse: 'Genial, te ayudo...',
  actions: [
    {
      type: 'schedule_appointment',
      data: { nutritionistId: 'n1' },
    },
  ],
}
```

### Testing Your Script

1. **Build**: `npm run build`
2. **Run dev**: `npm run dev`
3. Navigate to `/chat-ia`
4. Click Script icon
5. Your script should appear in the list
6. Test all steps and variations

### Script Engine API

```typescript
import { getScriptEngine } from '@/lib/scriptEngine';

const engine = getScriptEngine();

// Load script
engine.loadScript(myScript);

// Process input
const result = engine.processInput('User input');
// Returns: { response, trigger, actions, matched, isComplete }

// Get current state
const step = engine.getCurrentStep();
const progress = engine.getProgress(); // 0-100
const hint = engine.getHint();

// Session info
const summary = engine.getSessionSummary();
```

## Troubleshooting

### Audio Not Playing
- Check browser permissions for audio
- Try Chrome/Edge (best support)
- Check volume settings

### Voice Not Working
- Grant microphone permission
- Use HTTPS or localhost
- Check browser compatibility (Chrome/Edge recommended)

### Script Not Loading
- Check console for errors
- Verify JSON format if uploaded
- Ensure all required fields present

### Script Not Advancing
- Check if userInput matches (fuzzy matching enabled)
- Look at console logs for matching info
- Try the hint suggestions

## Best Practices

### Script Design
1. Keep steps focused and clear
2. Add variants for common phrasings
3. Use triggers to show relevant content
4. Provide helpful hints
5. Test with different inputs
6. Keep responses conversational

### Testing
1. Test happy path (following script exactly)
2. Test variations (different phrasings)
3. Test deviations (going off-script)
4. Test on mobile devices
5. Test with voice input
6. Test edge cases

### Performance
- Scripts are loaded on-demand
- State updates are optimized
- Streaming responses feel natural
- No blocking operations

## Examples

### Simple Greeting Flow
```typescript
steps: [
  {
    id: 'greeting',
    order: 1,
    userInput: 'Hola',
    assistantResponse: '¡Hola! ¿Cómo puedo ayudarte?',
    nextStepId: 'ask-goal',
  },
  {
    id: 'ask-goal',
    order: 2,
    userInput: 'Quiero bajar de peso',
    assistantResponse: 'Perfecto, puedo ayudarte con eso...',
    variants: [
      {
        pattern: '(peso|adelgazar|bajar)',
        response: 'Te ayudaré con tu objetivo de peso...',
      },
    ],
  },
]
```

### Product Recommendation Flow
```typescript
{
  id: 'show-products',
  order: 3,
  userInput: 'Muéstrame productos',
  assistantResponse: 'Aquí tienes productos recomendados:',
  trigger: {
    type: 'product',
    data: sampleProducts.filter(p => p.category === 'snacks'),
  },
  nextStepId: 'add-to-cart',
}
```

## Resources
- Full implementation: `SCRIPT_SYSTEM_IMPLEMENTATION.md`
- Type definitions: `src/types/index.ts`
- Example scripts: `src/data/scripts.ts`
- Engine docs: `src/lib/scriptEngine.ts`

## Support
- Check documentation in repository
- Review example scripts
- Test in development mode
- Check browser console for errors
