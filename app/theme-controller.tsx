"use client";

import { useState, useEffect } from "react";

export default function ThemeController() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (theme === "system") {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "system" ? "light" : t === "light" ? "dark" : "system"))}
      className="text-xs px-2 py-1 rounded border cursor-pointer hover:opacity-80"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      Theme: {theme}
    </button>
  );
}
