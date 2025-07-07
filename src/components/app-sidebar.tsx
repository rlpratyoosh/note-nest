import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaNotesMedical } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { FaBookBookmark } from "react-icons/fa6";
import { GiBullseye } from "react-icons/gi";

export function AppSidebar() {
  // Defining the navigation items
  const pages = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Quick Notes",
      href: "/quick-notes",
      icon: <FaNotesMedical />,
    },
    {
      name: "My Notes",
      href: "/notes",
      icon: <CgNotes />,
    },
    {
      name: "Journal",
      href: "/journals",
      icon: <FaBookBookmark />,
    },
    {
      name: "Goals",
      href: "/goals",
      icon: <GiBullseye />,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => (
                <SidebarMenuItem key={page.name}>
                  <SidebarMenuButton asChild>
                    <Link href={page.href}>
                      {page.icon}
                      <span>{page.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
