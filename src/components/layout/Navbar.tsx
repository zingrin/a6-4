"use client";


import { Book, Menu, Sunset, Trees, Zap, LayoutDashboard, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { UserRoles } from "@/types";

import { cn } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Category, User } from "@/types";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";
import { env } from "@/env";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: any;
}


interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    dashboard: {
      title: string;
      url: string;
    };
  };
  user?: User;
}


const Navbar = ({
  logo = {
    url: "/",
    src: "/skillbridge.svg",
    alt: "logo",
    title: "SkillBridge",
  },
  menu = [
    {
      title: "Browse Tutors",
      url: "/tutors",
    },
    {
      title: "Categories",
      url: "/about",
    },
     {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
    dashboard: { title: "Dashboard", url: "/dashboard" },
  },
  user,
  className,
}: NavbarProps) => {

  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const getDashboardUrl = (role: string) => {
    switch (role) {
      case UserRoles.ADMIN:
        return "/admin";
      case UserRoles.TUTOR:
        return "/tutor/dashboard";
      case UserRoles.STUDENT:
        return "/student/dashboard";
      case UserRoles.INSTITUTE:
        return "/institute/dashboard";
      default:
        return "/dashboard";
    }
  };

  const UserMenu = ({ user }: { user: User }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10 border-2 border-primary/10 transition-transform hover:scale-105">
            <AvatarImage src={user?.image || undefined} alt={user?.name || "avatar"} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {user.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <p className="text-[10px] leading-none text-primary uppercase font-bold tracking-tighter mt-1">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={getDashboardUrl(user.role)} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );


  return (
    <section className={cn("py-4 bg-background z-50 border-b", className)}>
      <div className="container mx-auto px-8">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-16">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2 mb-1.5">
              <img
                src={logo.src}
                className="max-h-6 dark:invert"
                alt={logo.alt}
              />
              <span className={`text-2xl text-primary tracking-wider font-semibold font-logan`}>
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {
              user ? 
              <UserMenu user={user} /> : 
              <div className="flex gap-2">
               <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div> 
            }
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2 mb-1.5">
              <img
                src={logo.src}
                className="max-h-6 dark:invert"
                alt={logo.alt}
              />
              <span className={`text-2xl text-primary tracking-wider font-semibold font-logan`}>
                {logo.title}
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-2 mt-4">
                    {
                      user ? 
                      <div className="flex flex-col gap-4 p-2 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                           <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.image || undefined} alt={user?.name || "avatar"} />
                            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button asChild variant="outline" size="sm" className="justify-start">
                            <Link href={getDashboardUrl(user.role)}>Dashboard</Link>
                          </Button>
                          <Button onClick={handleLogout} variant="destructive" size="sm" className="justify-start">
                            Log out
                          </Button>
                        </div>
                      </div> : 
                      <div className="flex flex-col gap-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                          <Button asChild size="sm">
                            <Link href={auth.signup.url}>{auth.signup.title}</Link>
                          </Button>
                      </div> 
                    }
                </div>

                </div>

              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};


const renderMenuItem = (item: MenuItem) => {
  if (item.items && item.title === "Categories") {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem : Category) => (
            <NavigationMenuLink asChild key={subItem.id} className="w-80">
              <CategoryLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // if (item.items) {
  //   return (
  //     <NavigationMenuItem key={item.title}>
  //       <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
  //       <NavigationMenuContent className="bg-popover text-popover-foreground">
  //         {item.items.map((subItem) => (
  //           <NavigationMenuLink asChild key={subItem.title} className="w-80">
  //             <SubMenuLink item={subItem} />
  //           </NavigationMenuLink>
  //         ))}
  //       </NavigationMenuContent>
  //     </NavigationMenuItem>
  //   );
  // }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {

    if (item.items && item.title === "Categories") {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem : Category) => (
            <CategoryLink key={subItem.id} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  // if (item.items) {
  //   return (
  //     <AccordionItem key={item.title} value={item.title} className="border-b-0">
  //       <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
  //         {item.title}
  //       </AccordionTrigger>
  //       <AccordionContent className="mt-2">
  //         {item.items.map((subItem : MenuItem) => (
  //           <SubMenuLink key={subItem.title} item={subItem} />
  //         ))}
  //       </AccordionContent>
  //     </AccordionItem>
  //   );
  // }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

const CategoryLink = ({ item }: { item: Category }) => {
  return (
    <div
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
    >
      <div>
        <Link href={`/tutors?categoryId=${item.id}`} className="text-sm text-secondary-foreground font-semibold hover:text-primary">{item.name}</Link>
        {item.subjects.length > 0 && (
          <div className="flex flex-col items-start gap-0.5 mt-1 ml-2">
            {item.subjects.map((subject) => <Link href={`/tutors?categoryId=${item.id}&subjectId=${subject.id}`} key={subject.id} className="text-sm leading-snug text-muted-foreground hover:text-primary">{subject.name}</Link>)}
          </div>
        )}
      </div>
    </div>
  );
};


export { Navbar };
