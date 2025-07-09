import { FaBookBookmark } from "react-icons/fa6";
import { GetJournals } from "@/prisma-db";
import { auth } from "@clerk/nextjs/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

import DeleteJournalButton from "@/components/delete-buttons/delete-journal-button";
import JournalPreviewButton from "@/components/preview-buttons/journal-preview-button";
import JournalAddButton from "@/components/add-buttons/journal-add-buttonn";

export default async function JournalPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div className="flex items-center justify-center h-full text-red-500">Unauthorized</div>;
  }

  const journals = await GetJournals(userId);

  return (
    <div className="mt-4 ml-5">
      <h1 className="text-3xl flex gap-2 items-center justify-start"> <FaBookBookmark />  My Journal</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 p-10">
          {journals.map((journal) => (
              <Card key={journal.id} className="group">
                <CardHeader className="max-h-5">
                  <CardTitle className="text-xl overflow-hidden max-h-8">
                    {journal.title || "Untitled"}
                  </CardTitle>
                  <CardAction className="flex gap-2 absolute bottom-4 right-4 opacity-100 sm:top-0 sm:right-0 sm:relative sm: sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <JournalPreviewButton id={journal.id} />
                    <DeleteJournalButton id={journal.id} />
                  </CardAction>
                </CardHeader>
                <CardContent className="text-sm h-15 overflow-hidden">
                  <p>{journal.content}</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <p>
                    Created on {journal.createdAt.getDate()}-
                    {journal.createdAt.getMonth() + 1}-
                    {journal.createdAt.getFullYear()}
                  </p>
                </CardFooter>
              </Card>
          ))}
            <div className="flex items-center justify-center min-h-50 cursor-pointer rounded-xl hover:bg-[var(--crad)]">
              <JournalAddButton />
            </div>
      </div>
    </div>
  );
}