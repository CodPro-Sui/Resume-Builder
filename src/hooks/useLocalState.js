import { useState, useEffect } from "react";

export function useLocalState(key, fallback) {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      /* storage unavailable — ignore */
    }
  }, [key, val]);

  return [val, setVal];
}
