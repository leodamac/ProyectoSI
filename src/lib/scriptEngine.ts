/**
 * Script Engine for Demo Simulations
 * Processes conversation scripts and manages script-based interactions
 */

import { ConversationScript, ScriptStep, ScriptSession } from '@/types';
import { matchesExpectedInput, calculateSimilarity } from '@/utils/fuzzyMatch';

export class ScriptEngine {
  private currentScript: ConversationScript | null = null;
  private currentSession: ScriptSession | null = null;
  private onResponseCallback: ((response: string, trigger?: unknown, actions?: unknown[]) => void) | null = null;

  /**
   * Load a script and start a new session
   */
  loadScript(script: ConversationScript): void {
    this.currentScript = script;
    this.currentSession = {
      id: `session-${Date.now()}`,
      scriptId: script.id,
      currentStepIndex: 0,
      completedSteps: [],
      startedAt: new Date(),
    };
  }

  /**
   * Get the current script
   */
  getCurrentScript(): ConversationScript | null {
    return this.currentScript;
  }

  /**
   * Get current session info
   */
  getCurrentSession(): ScriptSession | null {
    return this.currentSession;
  }

  /**
   * Check if a script is currently loaded
   */
  isScriptActive(): boolean {
    return this.currentScript !== null && this.currentSession !== null;
  }

  /**
   * Get the current step
   */
  getCurrentStep(): ScriptStep | null {
    if (!this.currentScript || !this.currentSession) return null;
    return this.currentScript.steps[this.currentSession.currentStepIndex] || null;
  }

  /**
   * Get the next expected user input (for display purposes)
   */
  getExpectedUserInput(): string | null {
    const currentStep = this.getCurrentStep();
    return currentStep?.userInput || null;
  }

  /**
   * Check if user input matches the current step
   * Uses fuzzy matching to be more flexible (60% similarity threshold)
   */
  matchesCurrentStep(userInput: string, threshold: number = 60): boolean {
    const currentStep = this.getCurrentStep();
    if (!currentStep) return false;

    // Check fuzzy match against expected input
    if (currentStep.userInput && matchesExpectedInput(userInput, currentStep.userInput, threshold)) {
      return true;
    }

    // Check variants with both regex and fuzzy matching
    if (currentStep.variants) {
      for (const variant of currentStep.variants) {
        // Try regex pattern first
        try {
          const regex = new RegExp(variant.pattern, 'i');
          if (regex.test(userInput)) {
            return true;
          }
        } catch (e) {
          console.warn('Invalid regex pattern:', variant.pattern, e);
        }

        // Also try fuzzy matching on the pattern itself
        const patternText = variant.pattern.replace(/[()\\|.*+?^${}[\]]/g, '');
        if (patternText.length > 2 && matchesExpectedInput(userInput, patternText, threshold)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Process user input and get assistant response based on script
   */
  processInput(userInput: string, threshold: number = 60): {
    response: string;
    audioFile?: string;
    trigger?: unknown;
    actions?: unknown[];
    matched: boolean;
    isComplete: boolean;
    matchQuality?: number;
  } {
    if (!this.currentScript || !this.currentSession) {
      return {
        response: 'No hay un script activo. Por favor carga un script primero.',
        matched: false,
        isComplete: false,
      };
    }

    const currentStep = this.getCurrentStep();
    if (!currentStep) {
      return {
        response: 'El script ha terminado. ¡Gracias por completar la simulación!',
        matched: false,
        isComplete: true,
      };
    }

    const matched = this.matchesCurrentStep(userInput, threshold);

    // Calculate match quality for expected input
    let matchQuality = 0;
    if (currentStep.userInput) {
      matchQuality = calculateSimilarity(userInput, currentStep.userInput);
    }

    // Get response (with variant if available)
    let response = currentStep.assistantResponse;
    let audioFile = currentStep.audioFile;
    let bestVariantMatch = 0;
    
    if (currentStep.variants) {
      for (const variant of currentStep.variants) {
        // Try regex pattern
        try {
          const regex = new RegExp(variant.pattern, 'i');
          if (regex.test(userInput)) {
            response = variant.response;
            audioFile = variant.audioFile || audioFile;
            bestVariantMatch = 100;
            break;
          }
        } catch (e) {
          // Continue to next variant
          console.warn('Pattern matching error:', e);
        }

        // Try fuzzy matching on pattern
        const patternText = variant.pattern.replace(/[()\\|.*+?^${}[\]]/g, '');
        if (patternText.length > 2) {
          const similarity = calculateSimilarity(userInput, patternText);
          if (similarity >= threshold && similarity > bestVariantMatch) {
            response = variant.response;
            audioFile = variant.audioFile || audioFile;
            bestVariantMatch = similarity;
          }
        }
      }
    }

    // Use the best match quality
    matchQuality = Math.max(matchQuality, bestVariantMatch);

    // Mark step as completed
    if (!this.currentSession.completedSteps.includes(currentStep.id)) {
      this.currentSession.completedSteps.push(currentStep.id);
    }

    // Record deviation if input doesn't match expected
    if (!matched && currentStep.userInput) {
      if (!this.currentSession.deviations) {
        this.currentSession.deviations = [];
      }
      this.currentSession.deviations.push({
        stepId: currentStep.id,
        userInput,
        expectedInput: currentStep.userInput,
        timestamp: new Date(),
      });
    }

    // Advance to next step
    if (currentStep.nextStepId) {
      const nextStepIndex = this.currentScript.steps.findIndex(s => s.id === currentStep.nextStepId);
      if (nextStepIndex !== -1) {
        this.currentSession.currentStepIndex = nextStepIndex;
      }
    } else {
      // No next step, advance by order
      this.currentSession.currentStepIndex++;
    }

    // Check if script is complete
    const isComplete = this.currentSession.currentStepIndex >= this.currentScript.steps.length;
    if (isComplete) {
      this.currentSession.completedAt = new Date();
    }

    // Trigger callback if set
    if (this.onResponseCallback) {
      this.onResponseCallback(response, currentStep.trigger, currentStep.actions);
    }

    return {
      response,
      audioFile,
      trigger: currentStep.trigger,
      actions: currentStep.actions,
      matched,
      isComplete,
      matchQuality,
    };
  }

  /**
   * Get script progress (percentage)
   */
  getProgress(): number {
    if (!this.currentScript || !this.currentSession) return 0;
    return Math.round((this.currentSession.completedSteps.length / this.currentScript.steps.length) * 100);
  }

  /**
   * Skip to a specific step (for testing/debugging)
   */
  skipToStep(stepId: string): boolean {
    if (!this.currentScript || !this.currentSession) return false;

    const stepIndex = this.currentScript.steps.findIndex(s => s.id === stepId);
    if (stepIndex !== -1) {
      this.currentSession.currentStepIndex = stepIndex;
      return true;
    }
    return false;
  }

  /**
   * Reset the current session (restart script)
   */
  resetSession(): void {
    if (this.currentScript) {
      this.loadScript(this.currentScript);
    }
  }

  /**
   * Unload current script and end session
   */
  unloadScript(): void {
    if (this.currentSession) {
      this.currentSession.completedAt = new Date();
    }
    this.currentScript = null;
    this.currentSession = null;
  }

  /**
   * Set callback for when responses are generated
   */
  onResponse(callback: (response: string, trigger?: unknown, actions?: unknown[]) => void): void {
    this.onResponseCallback = callback;
  }

  /**
   * Get script metadata
   */
  getMetadata(): ConversationScript['metadata'] | null {
    return this.currentScript?.metadata || null;
  }

  /**
   * Get user profile from current script
   */
  getUserProfile(): ConversationScript['userProfile'] | null {
    return this.currentScript?.userProfile || null;
  }

  /**
   * Provide a hint for the next expected action
   */
  getHint(): string | null {
    const currentStep = this.getCurrentStep();
    if (!currentStep || !currentStep.userInput) return null;

    return `💡 Sugerencia: Intenta decir algo como "${currentStep.userInput}"`;
  }

  /**
   * Check if we're at the last step
   */
  isLastStep(): boolean {
    if (!this.currentScript || !this.currentSession) return false;
    return this.currentSession.currentStepIndex >= this.currentScript.steps.length - 1;
  }

  /**
   * Get summary of completed session
   */
  getSessionSummary(): {
    scriptName: string;
    duration: number; // in seconds
    stepsCompleted: number;
    totalSteps: number;
    deviations: number;
    completionRate: number;
  } | null {
    if (!this.currentScript || !this.currentSession) return null;

    const duration = this.currentSession.completedAt
      ? Math.floor((this.currentSession.completedAt.getTime() - this.currentSession.startedAt.getTime()) / 1000)
      : Math.floor((Date.now() - this.currentSession.startedAt.getTime()) / 1000);

    return {
      scriptName: this.currentScript.name,
      duration,
      stepsCompleted: this.currentSession.completedSteps.length,
      totalSteps: this.currentScript.steps.length,
      deviations: this.currentSession.deviations?.length || 0,
      completionRate: this.getProgress(),
    };
  }
}

// Singleton instance for global access
let scriptEngineInstance: ScriptEngine | null = null;

/**
 * Get or create the global script engine instance
 */
export function getScriptEngine(): ScriptEngine {
  if (!scriptEngineInstance) {
    scriptEngineInstance = new ScriptEngine();
  }
  return scriptEngineInstance;
}

/**
 * Helper function to create async generator for streaming script responses
 */
export async function* streamScriptResponse(
  response: string,
  wordDelayMs: number = 30
): AsyncGenerator<{ text: string }, void, unknown> {
  const words = response.split(' ');

  // Initial delay before starting
  await new Promise((resolve) => setTimeout(resolve, 500));

  for (const word of words) {
    yield { text: word + ' ' };
    await new Promise((resolve) => setTimeout(resolve, wordDelayMs));
  }
}
