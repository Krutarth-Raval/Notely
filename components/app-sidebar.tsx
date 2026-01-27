import * as React from "react";

import { SearchForm } from "@/components/search-form";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
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

         <Logo/>
        </div>
        </Link>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarData data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
