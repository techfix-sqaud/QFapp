import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasDownloaded = await AsyncStorage.getItem("hasDownloaded");

      if (hasDownloaded) {
        setInitialRoute("/Account/Login");
      } else {
        await AsyncStorage.setItem("hasDownloaded", "true");
        setInitialRoute("/Account/Welcome");
      }
    };

    checkFirstLaunch();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return <Redirect href={initialRoute} />;
}
