"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaNotesMedical } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { FaBookBookmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoTrash } from "react-icons/io5";
import { UserButton, useUser } from "@clerk/nextjs";

export function AppSidebar() {
  const { user, isLoaded } = useUser();

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
      name: "Trash",
      href: "/trash",
      icon: <IoTrash />,
    },
  ];

  const currentPath = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => (
                <SidebarMenuItem
                  key={page.name}
                  className={
                    currentPath === page.href
                      ? "bg-muted text-primary rounded-sm"
                      : ""
                  }
                >
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
      <SidebarFooter className="flex items-center justify-center ml-12">
        {isLoaded ? (
          <div className="flex justify-start items-center p-4 w-50 gap-2 rounded-xl hover:bg-[var(--bg-hover)] cursor-pointer">
            <UserButton />
            <span className="mt-1">{user?.username || user?.firstName}</span>
          </div>
        ) : (
          <div className="h-18"></div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
