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
  setScheme: (scheme: "dark" | "light") => void;
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
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme: ThemeContextProps = {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: "dark" | "light") => setIsDark(scheme === "dark"),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
