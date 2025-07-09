import { CgNotes } from "react-icons/cg";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

import DeleteNoteButton from "@/components/delete-buttons/delete-note-button";
import NotesPreviewButton from "@/components/preview-buttons/notes-preview-button";
import NotesAddButton from "@/components/add-buttons/notes-add-button";
import { GetNotes } from "@/prisma-db";
import { auth } from "@clerk/nextjs/server";

export default async function NotesPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div className="flex items-center justify-center h-full text-red-500">Unauthorized</div>;
  }

  const notes = await GetNotes(userId);

  return (
    <div className="mt-4 ml-5">
      <h1 className="text-3xl flex gap-2 items-center justify-start"> <CgNotes />  My Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 p-10">
          {notes.map((note) => (
              <Card key={note.id} className="group">
                <CardHeader>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl overflow-hidden max-h-8">
                    {note.title}
                  </CardTitle>
                  <CardDescription className="text-xs max-h-5 overflow-hidden">
                    {note.description || "No description"}
                  </CardDescription>
                  </div>
                  <CardAction className="flex gap-2 absolute bottom-4 right-4 opacity-100 sm:top-0 sm:right-0 sm:relative sm: sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <NotesPreviewButton id={note.id} />
                    <DeleteNoteButton id={note.id} />
                  </CardAction>
                </CardHeader>
                <CardContent className="text-sm h-15 overflow-hidden">
                  <p>{note.content}</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <p>
                    Created on {note.createdAt.getDate()}-
                    {note.createdAt.getMonth() + 1}-
                    {note.createdAt.getFullYear()}
                  </p>
                </CardFooter>
              </Card>
          ))}
            <div className="flex items-center justify-center min-h-60 cursor-pointer rounded-xl hover:bg-[var(--crad)]">
              <NotesAddButton />
            </div>
      </div>
    </div>
  );
}