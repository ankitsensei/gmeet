"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface ThemeContextValue {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

function getInitialTheme(storageKey: string, defaultTheme: string): string {
  if (typeof window === "undefined") return defaultTheme;
  const stored = localStorage.getItem(storageKey);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
}: {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState(() =>
    getInitialTheme(storageKey, defaultTheme)
  );

  const setTheme = useCallback(
    (newTheme: string) => {
      setThemeState(newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
      localStorage.setItem(storageKey, newTheme);
    },
    [storageKey],
  );

  // Sync class on mount
  if (typeof window !== "undefined") {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
