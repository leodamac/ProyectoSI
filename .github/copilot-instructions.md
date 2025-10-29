# GitHub Copilot Instructions for Alkadami Keto

## Project Overview

This is **Alkadami Keto**, a modern freemium keto nutrition service platform built with Next.js, React, TypeScript, and Tailwind CSS. The project combines AI-powered chat services with certified nutritionist consultations and an e-commerce platform for keto products.

### Key Features
- **Free Tier**: AI chat assistant (text/voice) for keto recipes and product recommendations
- **Premium Tier**: Access to certified nutritionists
- **E-commerce**: Keto product catalog with cart functionality
- **AI Architecture**: Uses MCP (Model Context Protocol) for modularity, currently with "Wizard of Oz" simulation ready for real AI integration

## Technology Stack

### Core Technologies
- **Frontend**: React 19 + Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Firebase/Firestore (configured)
- **State Management**: React Context API
- **AI**: AI SDK, Browser AI APIs (Gemini Nano)
- **Voice**: Web Speech API

### Build Tools
- **Package Manager**: npm
- **Bundler**: Turbopack (via Next.js 15)
- **Linting**: ESLint with Next.js and TypeScript configs

## Code Style and Conventions

### TypeScript
- Use strict TypeScript with all type safety features enabled
- Define types in `src/types/index.ts` for shared types
- Prefer interfaces for object types, types for unions/primitives
- Always type function parameters and return values
- Use `@/` alias for imports from `src/` directory

### React/Next.js
- Use React Server Components by default (Next.js 15 App Router)
- Add `'use client'` directive only when needed (hooks, interactivity, browser APIs)
- Prefer functional components with hooks
- Use proper Next.js metadata API for SEO
- Follow Next.js 15 App Router conventions for routing

### Styling
- Use Tailwind CSS utility classes
- Follow the keto color scheme:
  - Primary: Emerald (`emerald-500` / `#10b981`)
  - Secondary: Teal (`teal-500` / `#14b8a6`)
  - Accent: Earth tones for warmth
- Mobile-first responsive design
- Subtle gradients, avoid overuse
- Use Framer Motion for animations (subtle and fluid)

### File Organization
```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── context/          # React Context providers
├── data/             # Mock data (nutritionists, recipes, products)
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries (MCP services, Firebase)
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Development Guidelines

### Commands
- **Development**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build` (uses Turbopack)
- **Production**: `npm start`
- **Lint**: `npm run lint`

### Component Development
- Keep components modular and reusable
- Co-locate related components in subdirectories (e.g., `components/chat/`)
- Use proper component composition
- Implement accessibility best practices
- Add prop types for all components

### AI/MCP Services
- Follow MCP protocol architecture for AI service integration
- Current implementation uses "Wizard of Oz" simulation
- Keep AI services modular in `src/lib/mcp-services.ts`
- Ready for migration to real AI services (OpenAI, Gemini, Claude)
- Extract user profile gradually from conversation
- Provide contextual responses based on user preferences

### State Management
- Use React Context API for global state (Cart, Chat)
- Keep state as local as possible
- Use custom hooks for reusable stateful logic
- Context providers in `src/context/`

### Testing
- Tests located in `tests/` directory
- Write tests for critical functionality
- Use descriptive test names
- Test user interactions and edge cases

## Important Considerations

### Service-First Approach
- Prioritize service features (AI chat, nutritionists) over products
- The platform is a **service** with e-commerce, not an e-commerce site
- Focus on user engagement through chat and consultations

### Future Migration Readiness
- Code is structured for easy migration to real AI services
- Firebase configuration is present but may need real credentials
- Payment system (Stripe) integration planned
- Calendar/scheduling system (Calendly/Cal.com) planned

### Performance
- Optimize images (use Next.js Image component)
- Lazy load components when appropriate
- Minimize client-side JavaScript
- Use Server Components for static content

### Accessibility
- Ensure keyboard navigation works
- Add proper ARIA labels
- Test with screen readers
- Maintain color contrast ratios

### Security
- Store API keys in environment variables (never commit)
- Validate user inputs
- Sanitize data before rendering
- Follow GDPR compliance practices
- Chat data stored locally (privacy-first)

## Common Patterns

### Creating New Pages
1. Create page in `src/app/[route]/page.tsx`
2. Use proper Next.js metadata export
3. Follow mobile-first responsive design
4. Integrate with Navigation component

### Adding Components
1. Create in appropriate `src/components/` subdirectory
2. Export from component file
3. Add TypeScript types for props
4. Use Tailwind for styling
5. Add Framer Motion for animations if needed

### Working with Context
1. Define context in `src/context/`
2. Create provider component
3. Export custom hook for consuming context
4. Wrap necessary parts of app in layout

### Adding Mock Data
1. Add to appropriate file in `src/data/`
2. Export with proper TypeScript types
3. Structure for easy migration to real database

## Documentation References

- Full technical documentation: `DOCUMENTATION.md`
- Project README: `README.md`
- [Next.js Docs](https://nextjs.org/docs)
- [AI SDK Docs](https://ai-sdk.dev/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## Notes

- This is an academic project for ESPOL (Ecuador)
- Team includes students from FIEC and FCSH
- Focus on creating a memorable, differential design
- Emphasize health, nature, and professionalism in UI/UX
