# Chat IA Components

This directory contains the interactive chat components for the `/chat-ia` page.

## Components Overview

### ChatShell
Main container component that provides the layout for the chat interface. It centers the chat window and maintains a maximum width of 1100px.

**Location:** `src/components/chat/ChatShell.tsx`

**Features:**
- Centered layout with responsive design
- Fixed header with bot information
- Integrated ChatWindow and ChatInput
- Placeholder for future card carousel

### ChatWindow
Message display component with isolated scroll behavior.

**Location:** `src/components/chat/ChatWindow.tsx`

**Features:**
- Isolated scroll container (only messages scroll, page stays fixed)
- Auto-scroll to bottom on new messages
- Respects user scroll position (doesn't force scroll if user scrolled up)
- ARIA-live region for accessibility
- Empty state with welcome message
- Animated message appearance

### ChatInput
Auto-resizing textarea with keyboard shortcuts and voice input.

**Location:** `src/components/chat/ChatInput.tsx`

**Features:**
- Auto-resize based on content (min: 56px, max: 240px)
- Enter = Send message
- Shift+Enter = New line
- Integrated voice input button
- Visual feedback for disabled state

### VoiceController
Voice input component using Web Speech API.

**Location:** `src/components/chat/VoiceController.tsx`

**Features:**
- Speech-to-text using Web Speech API
- Visual status indicators (idle, listening, processing)
- Audio visualization stub (placeholder for advanced visualizer)
- Fallback message for unsupported browsers
- Supports Spanish (es-ES) by default

## Hooks

### useAutoScroll
Custom hook to manage auto-scroll behavior in chat windows.

**Location:** `src/hooks/useAutoScroll.ts`

**Usage:**
```tsx
const { scrollRef, scrollToBottom, isUserScrolling } = useAutoScroll([messages.length]);
```

**Features:**
- Detects if user is manually scrolling
- Auto-scrolls only when user is at bottom
- Smooth scroll behavior

### useSpeechToText
Web Speech API wrapper for speech-to-text.

**Location:** `src/hooks/useSpeechToText.ts`

**Usage:**
```tsx
const { isListening, isSupported, transcript, start, stop } = useSpeechToText({
  lang: 'es-ES',
  onResult: (text, isFinal) => {
    console.log(text);
  }
});
```

**Browser Support:**
- Chrome/Edge: Full support
- Firefox: Limited support
- Safari: Partial support (requires prefix)
- Not supported: Fallback message shown

### useTextToSpeech
Web Speech Synthesis API wrapper for text-to-speech.

**Location:** `src/hooks/useTextToSpeech.ts`

**Usage:**
```tsx
const { isSpeaking, speak, stop } = useTextToSpeech({
  lang: 'es-ES',
  rate: 1,
  pitch: 1
});
```

## Context

### ChatContext
Global state management for chat messages.

**Location:** `src/context/ChatContext.tsx`

**Features:**
- Message history management
- Simulated streaming responses
- Loading state
- Message send API

**Usage:**
```tsx
<ChatProvider>
  <YourChatComponent />
</ChatProvider>
```

## Utilities

### simulateResponses
Mock AI response generator for testing without paid services.

**Location:** `src/utils/simulateResponses.ts`

**Features:**
- Category-based responses (greetings, recipes, tips, etc.)
- Simulated streaming with word-by-word delivery
- Configurable delays
- Multiple response variations

## Testing Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Navigate to `/chat-ia` in your browser

4. Test functionality:
   - Type a message and press Enter to send
   - Press Shift+Enter to add a new line
   - Click the microphone button to use voice input (Chrome/Edge)
   - Scroll up in the chat window and verify new messages don't force scroll
   - Send multiple messages to test auto-resize of input

## Browser Compatibility

### Web Speech API (Voice Input)
- ✅ Chrome 25+
- ✅ Edge 79+
- ⚠️ Safari 14.1+ (requires webkit prefix)
- ❌ Firefox (not supported)

### Speech Synthesis API (Text-to-Speech)
- ✅ Chrome 33+
- ✅ Edge 14+
- ✅ Safari 7+
- ⚠️ Firefox 49+ (limited voices)

## Future Enhancements

These components are designed to be extended with:
- Advanced audio visualizer (AnalyserNode/wavesurfer)
- Knight Rider style animation
- Cards carousel for suggestions
- Information drawer
- Voice playback of responses

## Architecture Notes

- All components use TypeScript for type safety
- Tailwind CSS for styling (no additional CSS files needed)
- Framer Motion for animations
- Client-side only ('use client' directive)
- No external AI services required (uses simulated responses)
- Fully accessible (ARIA labels, keyboard navigation)

## Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Screen reader friendly (aria-live regions)
- Focus management
- Color contrast compliance
- Reduced motion support (via Tailwind)
