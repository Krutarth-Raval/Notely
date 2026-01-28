import * as React from "react";

import { SearchForm } from "@/components/search-form";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FileText, Github, Instagram, Mail, Shield } from "lucide-react";
import { getNotebooks } from "@/server/notebooks";
import { SidebarData } from "./sidebar-data";
import Link from "next/link";
import { Logo } from "./logo";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();
  // This is sample data.
  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/notebook/${notebook.id}`,
        items:
          notebook.notes.map((note) => ({
            title: note.title,
            url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
          })) || [],
      })) ?? []),
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/dashboard" >
          <div className="px-2 flex items-center select-none py-2">

            <Logo />
          </div>
        </Link>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarData data={data} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Contact">
              <Link href="/contact">
                <Mail />
                <span>Contact</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Privacy Policy">
              <Link href="/privacy-policy">
                <Shield />
                <span>Privacy Policy</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Terms & Conditions">
              <Link href="/terms">
                <FileText />
                <span>Terms & Conditions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <div className="mt-4 flex w-full items-center justify-start pl-4 gap-6 py-2 border-t">
            <Link
              href="https://github.com/Krutarth-Raval"
              target="_blank"
              className="text-muted-foreground bg-accent p-2 rounded-full hover:text-foreground transition-colors"
            >
              <Github className="size-5" />
            </Link>
            <Link
              href="https://www.instagram.com/raval_krutarth"
              target="_blank"
              className="text-muted-foreground bg-accent p-2 rounded-full hover:text-foreground transition-colors"
            >
              <Instagram className="size-5" />
            </Link>
            <Link
              href="mailto:ravalkrutarth22@gmail.com"
              className="text-muted-foreground bg-accent p-2 rounded-full hover:text-foreground transition-colors"
            >
              <Mail className="size-5" />
            </Link>
          </div>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
