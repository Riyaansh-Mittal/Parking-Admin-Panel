// hooks/useDeepCompareMemoize.ts
import { useRef } from 'react';

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(value);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
