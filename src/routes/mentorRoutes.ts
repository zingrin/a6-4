import { LayoutDashboard, BookOpen, Users, Settings } from "lucide-react";
import { Route } from "@/types";

export const mentorRoutes: Route[] = [
  {
    title: "Mentor Tools",
    url: "#",
    icon: LayoutDashboard,
    items: [
      { title: "Overview", url: "/mentor/dashboard", icon: LayoutDashboard },
      { title: "My Assigned Courses", url: "/mentor/courses", icon: BookOpen },
      { title: "Student Rosters", url: "/mentor/rosters", icon: Users },
      { title: "Settings", url: "/mentor/settings", icon: Settings },
    ],
  },
];
