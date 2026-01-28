import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/reach-text-editor";
import { getNotesById } from "@/server/notes";
import type { JSONContent } from "@tiptap/react";

type Params = Promise<{
  noteId: string;
}>;
export default async function NotePage({ params }: { params: Params }) {
  const { noteId } = await params;

  const { note } = await getNotesById(noteId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note?.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note?.notebook?.id}`
        },
        {
          label: note?.title ?? "Note",
          href: `/dashboard/notebook/${note?.notebook?.id}/note/${noteId}`,
        },
      ]}
    >

      <RichTextEditor key={noteId} content={note?.content as JSONContent | undefined} noteId={noteId} note={note} />
    </PageWrapper>
  );
}
