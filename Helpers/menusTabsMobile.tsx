import { IconProps } from "@expo/vector-icons/build/createIconSet";
import icons from "../constants/icons";
export type FontAwesomeIconName = IconProps<string>["name"];
export interface Tab {
  name: string;
  label: string;
  icon: any;
  notFocused?: any;
  path: string;
}

export const tabs: Tab[] = [
  {
    name: "home",
    label: "Home",
    icon: icons.home2,
    notFocused: icons.home2Outline,
    path: "/Dashboard",
  },

  {
    name: "booking",
    label: "Booking",
    icon: icons.document2,
    notFocused: icons.document2Outline,
    path: "/Bookings",
  },
  {
    name: "profile",
    label: "Profile",
    icon: icons.user,
    notFocused: icons.userOutline,
    path: "/Users/Profile",
  },
  {
    name: "settings",
    label: "Settings",
    icon: icons.settings,
    notFocused: icons.setting2Outline,
    path: "/Settings",
  },
  {
    name: "Menu",
    label: "Menu",
    icon: icons.content,
    notFocused: icons.content,
    path: "",
  },
];
