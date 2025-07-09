import { FaNotesMedical } from "react-icons/fa6";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { GetQuickNotes } from "@/prisma-db";
import { auth } from "@clerk/nextjs/server";
import QuickNotesAddButton from "@/components/add-buttons/quick-notes-add-button";
import QuickNotesPreviewButton from "@/components/preview-buttons/quick-notes-preview-button";
import DeleteQuickNoteButton from "@/components/delete-buttons/delete-quick-note-button";

export default async function JournalPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div className="flex items-center justify-center h-full text-red-500">Unauthorized</div>;
  }

  const quickNotes = await GetQuickNotes(userId);

  return (
    <div className="mt-4 ml-5">
      <h1 className="text-3xl flex gap-2 items-center justify-start"> <FaNotesMedical />  Quick Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 p-10">
          {quickNotes.map((quickNote) => (
              <Card key={quickNote.id} className="group">
                <CardHeader className="max-h-2">
                  <CardTitle>Quick Note</CardTitle>
                  <CardAction className="flex gap-2 absolute bottom-4 right-4 opacity-100 sm:top-0 sm:right-0 sm:relative sm: sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <QuickNotesPreviewButton id={quickNote.id} />
                    <DeleteQuickNoteButton id={quickNote.id} />
                  </CardAction>
                </CardHeader>
                <CardContent className="text-sm h-10 overflow-hidden">
                  <p>{quickNote.content}</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <p>
                    Created on {quickNote.createdAt.getDate()}-
                    {quickNote.createdAt.getMonth() + 1}-
                    {quickNote.createdAt.getFullYear()}
                  </p>
                </CardFooter>
              </Card>
          ))}
            <div className="flex items-center justify-center min-h-50 cursor-pointer rounded-xl hover:bg-[var(--crad)]">
              <QuickNotesAddButton/>
            </div>
      </div>
    </div>
  );
}