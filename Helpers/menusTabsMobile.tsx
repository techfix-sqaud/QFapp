import { IconProps } from "@expo/vector-icons/build/createIconSet";
export type FontAwesomeIconName = IconProps<string>["name"];
export interface Tab {
  name: string;
  label: string;
  icon: FontAwesomeIconName;
  path: string;
}
export const tabs: Tab[] = [
  { name: "home", label: "Home", icon: "home", path: "/home" },
  { name: "profile", label: "profile", icon: "user", path: "/profile" },
  { name: "settings", label: "Settings", icon: "cog", path: "/settings" },
  { name: "meanu", label: "meanu", icon: "bars", path: "/settings" },
];