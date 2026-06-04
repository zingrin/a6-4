import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { studentRoutes } from "@/routes/studentRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"
import { instituteRoutes } from "@/routes/instituteRoutes"
import { mentorRoutes } from "@/routes/mentorRoutes"
import { moderatorRoutes } from "@/routes/moderatorRoutes"
import { NavUser } from "@/components/ui/nav-user"
import { Route, User, UserRoles } from "@/types"
import Image from "next/image"
import { Roles } from "@/constants/roles"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Write Blog",
          url: "/dashboard/write-blog",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "User dashboard",
          url: "/dashboard",
        },
        {
          title: "Admin Dashboard",
          url: "/admin-dashboard",
        },
      ],
    },
  ],
}

export function AppSidebar({user, ...props }: {user : User} & React.ComponentProps<typeof Sidebar>) {

  let routes : Route[] = [];

  switch (user?.role) {
    case Roles.admin :
      routes = adminRoutes;
      break;
    case Roles.student:
      routes = studentRoutes;
      break;
    case Roles.tutor:
      routes = tutorRoutes;
      break;
    case Roles.institute:
      routes = instituteRoutes;
      break;
    case Roles.mentor:
      routes = mentorRoutes;
      break;
    case Roles.moderator:
      routes = moderatorRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>

      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 mb-1.5 p-1">
              <img
                src="/skillbridge.svg"
                className="w-6 max-h-6 invert"
                alt="skillbridge logo"
              />
              <span className={`text-2xl text-sidebar-foreground tracking-wider font-semibold font-logan`}>
                SkillBridge
              </span>
            </Link>
      </SidebarHeader>

      <SidebarContent className="gap-12">
        {/* We create a SidebarGroup for each parent. */}
        {/* {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))} */}
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url} className="flex items-center gap-2">
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
