'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value by delaying the update until after the specified delay
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout to update the debounced value after the delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value changes before the delay completes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook that provides a debounced callback function
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @param deps - Dependencies array for the callback
 * @returns The debounced callback function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps?: React.DependencyList
): T {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = ((...args: Parameters<T>) => {
    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set up a new timeout
    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  }) as T;

  // Clean up timeout on unmount or when dependencies change
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, deps ? [...deps, timeoutId] : [timeoutId]);

  return debouncedCallback;
}

/**
 * Custom hook that combines state with debouncing
 * @param initialValue - The initial value for the state
 * @param delay - The delay in milliseconds for debouncing
 * @returns [immediateValue, debouncedValue, setValue]
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce(value, delay);

  return [value, debouncedValue, setValue];
}
