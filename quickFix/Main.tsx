import * as React from "react";
import { PaperProvider } from "react-native-paper";
import App from "./app";

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
