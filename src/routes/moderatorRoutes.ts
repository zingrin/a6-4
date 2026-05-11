import { Route } from "@/types";
import { LayoutDashboard, Users, Shield } from "lucide-react";

export const moderatorRoutes: Route[] = [
  {
    title: "Content Moderation",
    url: "#",
    icon: Shield,
    items: [
      { title: "Overview", url: "/moderator/dashboard", icon: LayoutDashboard },
      { title: "User Access Control", url: "/moderator/users", icon: Users },
    ],
  },
];
