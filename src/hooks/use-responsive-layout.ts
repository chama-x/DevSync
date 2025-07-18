'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/constants';

export interface UseResponsiveLayoutReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: keyof typeof BREAKPOINTS;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
}

/**
 * Custom hook for responsive layout detection and screen size management
 * @returns Object containing screen size information and breakpoint booleans
 */
export function useResponsiveLayout(): UseResponsiveLayoutReturn {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    typeof window !== 'undefined'
      ? window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      : 'landscape'
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setDimensions({
        width: newWidth,
        height: newHeight,
      });

      setOrientation(newWidth > newHeight ? 'landscape' : 'portrait');
    };

    // Throttle resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', throttledResize);
    window.addEventListener('orientationchange', updateDimensions);

    // Initial call to set dimensions
    updateDimensions();

    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('orientationchange', updateDimensions);
      clearTimeout(timeoutId);
    };
  }, []);

  // Determine screen size category
  const getScreenSize = (): keyof typeof BREAKPOINTS => {
    const { width } = dimensions;

    if (width >= BREAKPOINTS['2xl']) return '2xl';
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    return 'sm'; // Default to small for anything smaller
  };

  const screenSize = getScreenSize();
  const { width } = dimensions;

  const isMobile = width < BREAKPOINTS.md;
  const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
  const isDesktop = width >= BREAKPOINTS.lg;

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenSize,
    orientation,
    width: dimensions.width,
    height: dimensions.height,
  };
}

/**
 * Hook to check if screen is at least a certain breakpoint
 * @param breakpoint - The minimum breakpoint to check for
 * @returns boolean indicating if screen is at least the specified breakpoint
 */
export function useMediaQuery(breakpoint: keyof typeof BREAKPOINTS): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    // Set initial value
    updateMatches();

    // Listen for changes
    mediaQuery.addEventListener('change', updateMatches);

    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [breakpoint]);

  return matches;
}

/**
 * Hook to detect if user prefers reduced motion
 * @returns boolean indicating if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Set initial value
    updatePreference();

    // Listen for changes
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to get responsive column count for Kanban board
 * @returns number of columns to display based on screen size
 */
export function useResponsiveColumns(): number {
  const { isMobile, isTablet } = useResponsiveLayout();

  if (isMobile) return 1;
  if (isTablet) return 2;
  return 4; // Desktop shows all columns
}

/**
 * Hook to determine if touch device
 * @returns boolean indicating if device supports touch
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - for older browsers
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouchDevice();
  }, []);

  return isTouchDevice;
}
