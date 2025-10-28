import { useEffect, useRef, useState } from 'react';

/**
 * Hook to manage auto-scrolling behavior in a chat window.
 * Automatically scrolls to bottom when new messages arrive,
 * but respects user's scroll position if they've scrolled up.
 */
export function useAutoScroll<T extends HTMLElement>(
  dependency: unknown[] = []
) {
  const scrollRef = useRef<T>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const lastScrollTop = useRef(0);

  // Check if user is near the bottom of the scroll container
  const isNearBottom = (element: HTMLElement, threshold = 100): boolean => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    return scrollHeight - scrollTop - clientHeight < threshold;
  };

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // Handle scroll events to detect manual scrolling
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const currentScrollTop = element.scrollTop;
      const wasNearBottom = isNearBottom(element);

      // Detect if user scrolled up manually
      if (currentScrollTop < lastScrollTop.current && !wasNearBottom) {
        setIsUserScrolling(true);
      } else if (wasNearBottom) {
        setIsUserScrolling(false);
      }

      lastScrollTop.current = currentScrollTop;
    };

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll when dependencies change (new messages)
  useEffect(() => {
    if (!isUserScrolling && scrollRef.current) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);

  return {
    scrollRef,
    scrollToBottom,
    isUserScrolling,
  };
}
