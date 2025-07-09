import { IoTrash } from "react-icons/io5";
import { GetAllTrashedItems } from "@/prisma-db";
import DeleteAllTrashButton from "@/components/delete-buttons/delete-all-trash";
import RestoreTrashButton from "@/components/delete-buttons/restore-trash-button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";

export default async function TrashPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Unauthorized
      </div>
    );
  }
  const { notes, quickNotes, journals } = await GetAllTrashedItems(userId);

  return (
    <div className="mt-4 ml-5">
      <h1 className="text-3xl flex gap-2 items-center justify-between pr-10">
        <div className="flex gap-2 items-center justify-center">
          <IoTrash /> Trash{" "}
        </div>
        <DeleteAllTrashButton />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 p-10">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {note.title}
              </CardTitle>
              <CardAction className="text-xs text-muted-foreground">
                <RestoreTrashButton type="note" id={note.id} />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
          </Card>
        ))}

        {quickNotes.map((quickNote) => (
          <Card key={quickNote.id}>
            <CardHeader>
              <CardTitle className="text-xl">Quick Note</CardTitle>
              <CardAction className="text-xs text-muted-foreground ml-6">
                <RestoreTrashButton type="quickNote" id={quickNote.id} />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>{quickNote.content}</p>
            </CardContent>
          </Card>
        ))}

        {journals.map((journal) => (
          <Card key={journal.id}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {journal.title}
              </CardTitle>
              <CardAction className="text-xs text-muted-foreground">
                <RestoreTrashButton type="journal" id={journal.id} />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>{journal.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
