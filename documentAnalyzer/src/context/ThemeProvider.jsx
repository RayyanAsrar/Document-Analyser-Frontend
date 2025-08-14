import React from "react";

const ThemeProviderContext = React.createContext({
  theme: "system",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setThemeState] = React.useState(() => {
    // Initialize from localStorage if available (safe in browsers)
    if (typeof window === "undefined") return defaultTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === "dark" || stored === "light" || stored === "system") return stored;
    } catch (e) {
      // ignore localStorage errors (e.g. privacy mode)
    }
    return defaultTheme;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    const applyThemeToRoot = (t) => {
      root.classList.remove("light", "dark");

      if (t === "system") {
        const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.add(systemIsDark ? "dark" : "light");
      } else {
        root.classList.add(t);
      }
    };

    // Apply right away
    applyThemeToRoot(theme);

    // If user selected "system", respond to system changes
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (theme === "system") applyThemeToRoot("system");
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", onSystemChange);
    } else {
      // Safari fallback
      mql.addListener(onSystemChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onSystemChange);
      } else {
        mql.removeListener(onSystemChange);
      }
    };
  }, [theme]);

  // Exposed setter: persist and update state
  const setTheme = (newTheme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      // ignore localStorage errors
    }
    setThemeState(newTheme);
  };

  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
