import { Book, Sunset, Trees, Zap } from "lucide-react";


interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}
export const menuItems : MenuItem[] =  [
    {
      title: "Browse Tutors",
      url: "/tutors",
    },
    {
      title: "Courses",
      url: "/courses",
    },
    {
      title: "About Us",
      url: "/about",
    }
    
  ]