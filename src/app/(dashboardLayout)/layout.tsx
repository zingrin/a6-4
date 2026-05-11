
export const dynamic = "force-dynamic";

import { AppSidebar } from "@/components/layout/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service"

export default async function DashboardLayout({admin, student, tutor, institute, mentor, moderator} : {children : React.ReactNode, admin : React.ReactNode, student : React.ReactNode, tutor : React.ReactNode, institute: React.ReactNode, mentor: React.ReactNode, moderator: React.ReactNode}) {

  const data = await userService.getSession();

  return (
    <SidebarProvider>
      <AppSidebar user={data?.data?.user}/>
      <SidebarInset>
        <header className="flex items-center justify-between shrink-0 border-b px-4">
          <div className="flex h-16 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          </div>
          {/* <ModeToggle /> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 container mx-auto max-w-6xl">
          {(data?.data?.user?.role === Roles.admin) ? admin : 
           (data?.data?.user?.role === Roles.student) ? student : 
           (data?.data?.user?.role === Roles.tutor) ? tutor : 
           (data?.data?.user?.role === Roles.institute) ? institute :
           (data?.data?.user?.role === Roles.mentor) ? mentor :
           (data?.data?.user?.role === Roles.moderator) ? moderator : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
