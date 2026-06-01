"use client";
import Image from "next/image";
import { ChevronDown, LayoutDashboard, LogOut, Menu } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Category, User } from "@/types";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: Category[];
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
    login: { title: string; url: string };
    signup: { title: string; url: string };
    dashboard: { title: string; url: string };
  };
  user?: User;
}

const navLinkClassName =
  "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground";

function getDashboardUrl(role: string) {
  switch (role) {
    case UserRoles.ADMIN:
      return "/admin";
    case UserRoles.TUTOR:
      return "/tutor/dashboard";
    case UserRoles.STUDENT:
      return "/dashboard";
    case UserRoles.INSTITUTE:
      return "/institute/dashboard";
    default:
      return "/dashboard";
  }
}

function CategoryLink({ item }: { item: Category }) {
  const subjects = item.subjects ?? [];
  const tutorsHref = `/tutors?categoryId=${item.id}`;
  const coursesHref = `/courses?categoryId=${item.id}`;

  return (
    <div className="block rounded-md p-3 transition-colors hover:bg-muted">
      <Link
        href={tutorsHref}
        className="text-sm font-semibold text-foreground hover:text-primary"
      >
        {item.name}
      </Link>
      <div className="mt-1.5 flex gap-3">
        <Link
          href={tutorsHref}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          Tutors
        </Link>
        <Link
          href={coursesHref}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          Courses
        </Link>
      </div>
      {subjects.length > 0 && (
        <div className="mt-2 flex flex-col gap-0.5 border-t pt-2">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/tutors?categoryId=${item.id}&subjectId=${subject.id}`}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              {subject.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoriesDropdown({ categories }: { categories: Category[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn(navLinkClassName, "gap-1")}>
          Categories
          <ChevronDown className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[min(100vw-2rem,520px)] p-2"
      >
        {categories.length === 0 ? (
          <p className="p-3 text-sm text-muted-foreground">
            No categories available.
          </p>
        ) : (
          <div className="grid max-h-[min(70vh,420px)] gap-1 overflow-y-auto sm:grid-cols-2">
            {categories.map((category) => (
              <CategoryLink key={category.id} item={category} />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DesktopNavItem({ item }: { item: MenuItem }) {
  if (item.title === "Categories" && Array.isArray(item.items)) {
    return <CategoriesDropdown categories={item.items} />;
  }

  return (
    <Link href={item.url} className={navLinkClassName}>
      {item.title}
    </Link>
  );
}

function MobileNavItem({ item }: { item: MenuItem }) {
  if (item.title === "Categories" && Array.isArray(item.items)) {
    const categories = item.items;

    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories" className="border-b-0">
          <AccordionTrigger className="py-0 text-base font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2 space-y-1">
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No categories available.
              </p>
            ) : (
              categories.map((category) => (
                <CategoryLink key={category.id} item={category} />
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Link href={item.url} className="text-base font-semibold">
      {item.title}
    </Link>
  );
}

function UserMenu({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10 border-2 border-primary/10 transition-transform hover:scale-105">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "avatar"}
            />
            <AvatarFallback className="bg-primary/10 font-bold text-primary">
              {user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-semibold">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="mt-1 text-[10px] leading-none font-bold tracking-tighter text-primary uppercase">
              {user.role}
            </p>
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
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-destructive focus:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/skillbridge.svg",
    alt: "logo",
    title: "SkillBridge",
  },
  menu = [
    { title: "Categories", url: "#", items: [] },
    { title: "Browse Tutors", url: "/tutors" },
    { title: "Courses", url: "/courses" },
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

  const authButtons = user ? (
    <UserMenu user={user} onLogout={handleLogout} />
  ) : (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href={auth.login.url}>{auth.login.title}</Link>
      </Button>
      <Button asChild size="sm">
        <Link href={auth.signup.url}>{auth.signup.title}</Link>
      </Button>
    </div>
  );

  return (
    <section className={cn("border-b bg-background py-4 z-50", className)}>
      <div className="container mx-auto px-8">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-16">
            <Link href={logo.url} className="mb-1.5 flex items-center gap-2">
              <Image
                src={logo.src}
                width={24}
                height={24}
                className="dark:invert"
                alt={logo.alt}
              />
              <span className="font-logan text-2xl font-semibold tracking-wider text-primary">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center gap-1">
              {menu.map((item) => (
                <DesktopNavItem key={item.title} item={item} />
              ))}
            </div>
          </div>
          {authButtons}
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="mb-1.5 flex items-center gap-2">
              <Image
                src={logo.src}
                width={24}
                height={24}
                className="h-6 w-6 dark:invert"
                alt={logo.alt}
              />
              <span className="font-logan text-2xl font-semibold tracking-wider text-primary">
                {logo.title}
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <div className="flex flex-col gap-6 p-4">
                  <div className="flex flex-col gap-4">
                    {menu.map((item) => (
                      <MobileNavItem key={item.title} item={item} />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    {user ? (
                      <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.image || undefined}
                              alt={user.name || "avatar"}
                            />
                            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold">{user.name}</p>
                            <p className="text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="justify-start"
                          >
                            <Link href={getDashboardUrl(user.role)}>
                              Dashboard
                            </Link>
                          </Button>
                          <Button
                            onClick={handleLogout}
                            variant="destructive"
                            size="sm"
                            className="justify-start"
                          >
                            Log out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </div>
                    )}
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

export { Navbar };
