import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "./colors";

interface ThemeContextProps {
  dark: boolean;
  colors: typeof lightColors | typeof darkColors;
  setScheme: (scheme: "dark" | "light" | "system") => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  dark: false,
  colors: lightColors,
  setScheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Gets the system-level theme setting
  const [themeScheme, setThemeScheme] = useState<"dark" | "light" | "system">(
    "system"
  );
  console.log("systemColorScheme", systemColorScheme);
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  console.log("isDark", systemColorScheme);
  useEffect(() => {
    if (themeScheme === "system") {
      setIsDark(systemColorScheme === "dark");
    }
  }, [systemColorScheme, themeScheme]);

  const defaultTheme: ThemeContextProps = {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: "dark" | "light" | "system") => {
      if (scheme === "system") {
        setIsDark(systemColorScheme === "dark"); // Follow system preferences
      } else {
        setIsDark(scheme === "dark"); // Override with manual setting
      }
      setThemeScheme(scheme); // Update the current theme scheme
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme
export const useTheme = () => useContext(ThemeContext);
