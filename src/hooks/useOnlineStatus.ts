'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect online/offline status
 * Returns true when online, false when offline
 */
export function useOnlineStatus(): boolean {
  // Initialize with actual navigator state or default to true
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator !== 'undefined') {
      return navigator.onLine;
    }
    return true; // Default to online for SSR
  });

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof navigator === 'undefined') return;

    // Update state with actual navigator status
    setIsOnline(navigator.onLine);

    // Event handlers
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
