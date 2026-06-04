import type { Route } from "@/types";
import { 
  User, 
  LayoutDashboard, 
  CalendarCheck, 
  Clock, 
  Settings,
  Star,
  CreditCard
} from "lucide-react";


export const tutorRoutes: Route[] = [
  {
    title: "Tutor Panel",
    url: "#",
    icon: User,
    items: [
      { title: "Overview", url: "/tutor/dashboard", icon: LayoutDashboard },
      { title: "My Bookings", url: "/tutor/bookings", icon: CalendarCheck },
      { title: "Availability", url: "/tutor/availability", icon: Clock },
      { title: "Payments", url: "/tutor/payments", icon: CreditCard },
      { title: "My Profile", url: "/tutor/profile", icon: Settings },
      { title: "Reviews", url: "/tutor/reviews", icon: Star },
    ],
  },
];