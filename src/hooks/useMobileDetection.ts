/**
 * Custom hook to detect mobile screen size
 * Returns true if viewport width is less than 640px (Tailwind's sm breakpoint)
 * Includes resize listener with cleanup
 */

'use client';

import { useState, useEffect } from 'react';

export function useMobileDetection(breakpoint: number = 640): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Add resize listener with debounce to avoid excessive updates
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', debouncedCheck);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [breakpoint]);

  return isMobile;
}
