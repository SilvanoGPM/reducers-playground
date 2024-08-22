import { useCallback, useRef } from 'react';

interface UseDebounceParams {
  delay?: number;
  notDelayInFistTime?: boolean;
}

export function useDebounce({
  delay = 1500,
  notDelayInFistTime = false,
}: UseDebounceParams = {}) {
  const debouncing = useRef<NodeJS.Timeout | undefined>();
  const isFirstTime = useRef(notDelayInFistTime);

  const debounce = useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay],
  );

  return { debounce, timeoutId: debouncing };
}