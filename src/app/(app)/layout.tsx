import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { GiNestBirds } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";
import { Toggle } from "@/components/ui/toggle";
import { MdLightMode } from "react-icons/md";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="p-2 flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <SidebarTrigger />
            <Toggle className="cursor-pointer">
              <span className="text-xs">
                <MdLightMode />
              </span>
            </Toggle>
          </div>
          <div className="flex items-center justify-center gap-2 ml-4">
            <Input
              type="text"
              placeholder="Search Notes..."
              className="w-40 sm:w-64 text-xs rounded-2xl"
            />
            <Button variant="outline" className="rounded-2xl cursor-pointer">
              <IoSearchSharp />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 mr-2">
            <GiNestBirds />
            NoteNest
          </div>
        </header>
        <div className="ml-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
