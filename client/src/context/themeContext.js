import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const root = document.documentElement;
    const isDarkMode = localTheme === "dark";
    root.classList.add(isDarkMode ? "dark" : "light");
    setTheme(localTheme || "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const isDarkMode = theme === "dark";
    root.classList.remove(isDarkMode ? "light" : "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useTheme, ThemeProvider };
