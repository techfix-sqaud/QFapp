import { Redirect } from "expo-router";
import React from "react";

export default function App() {
  return <Redirect href={"/Account/Login"} />;
}
