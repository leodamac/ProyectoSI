/**
 * Z-Index Layer Constants
 * Maintains consistent z-index hierarchy across the application
 */

export const Z_INDEX = {
  // Base layers
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  
  // Modal/Overlay layers
  MODAL_BACKDROP: 40,
  MODAL: 50,
  
  // Assistant layers
  FLOATING_ASSISTANT: 45,
  COMPACT_VISUALIZER_BACKDROP: 55,
  COMPACT_VISUALIZER: 60,
  INTERACTION_MODAL_BACKDROP: 60,
  INTERACTION_MODAL: 70,
  
  // Top layer
  TOAST: 100,
} as const;

export type ZIndex = typeof Z_INDEX[keyof typeof Z_INDEX];
