import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { lightColors, darkColors } from "./colors";
import { useColorScheme, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // if using React Native

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
  const systemColorScheme = useColorScheme();
  const [themeScheme, setThemeScheme] = useState<"dark" | "light" | "system">(
    "system"
  );
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  // Load saved theme from storage
  useEffect(() => {
    const loadStoredTheme = async () => {
      try {
        let savedTheme: string | null;
        if (Platform.OS === "web") {
          savedTheme = localStorage.getItem("theme");
        } else {
          savedTheme = await AsyncStorage.getItem("theme");
        }

        if (savedTheme === "dark" || savedTheme === "light") {
          setThemeScheme(savedTheme);
          setIsDark(savedTheme === "dark");
        } else {
          // fall back to system preference
          setThemeScheme("system");
          setIsDark(systemColorScheme === "dark");
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadStoredTheme();
  }, []);

  // React to system theme change
  useEffect(() => {
    if (themeScheme === "system") {
      setIsDark(systemColorScheme === "dark");
    }
  }, [systemColorScheme, themeScheme]);

  const defaultTheme: ThemeContextProps = {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: "dark" | "light" | "system") => {
      setThemeScheme(scheme);
      if (scheme === "system") {
        setIsDark(systemColorScheme === "dark");
      } else {
        setIsDark(scheme === "dark");
      }

      // Save theme preference
      try {
        if (Platform.OS === "web") {
          localStorage.setItem("theme", scheme);
        } else {
          AsyncStorage.setItem("theme", scheme);
        }
      } catch (error) {
        console.error("Failed to save theme preference:", error);
      }
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
