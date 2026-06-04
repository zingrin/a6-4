import { Route } from "@/types";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings,
  GraduationCap,
  Star,
  ReceiptText
} from "lucide-react";

export const instituteRoutes: Route[] = [
  {
    title: "Institute Management",
    url: "#",
    icon: LayoutDashboard,
    items: [
      { title: "Overview", url: "/institute/dashboard", icon: LayoutDashboard },
      { title: "Courses", url: "/institute/courses", icon: BookOpen },
      { title: "Mentor Management", url: "/institute/mentors", icon: Users },
      { title: "Student Community", url: "/institute/students", icon: GraduationCap },
      { title: "Reviews & Ratings", url: "/institute/reviews", icon: Star },
      { title: "Payment History", url: "/institute/payments", icon: ReceiptText },
      { title: "Profile Settings", url: "/institute/profile", icon: Settings },
    ],
  },
];
