import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Checkbox } from "@/components/ui/checkbox";

import { GetNotes, GetQuickNotes, GetGoals, GetJournals } from "@/prisma-db";

import { FaNotesMedical } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { FaBookBookmark } from "react-icons/fa6";
import { GiBullseye } from "react-icons/gi";
import NotesAddButton from "@/components/add-buttons/notes-add-button";
import NotesPreviewButton from "@/components/preview-buttons/notes-preview-button";
import DeleteNoteButton from "../../../components/delete-buttons/delete-note-button";
import JournalAddButton from "@/components/add-buttons/journal-add-buttonn";
import JournalPreviewButton from "@/components/preview-buttons/journal-preview-button";
import DeleteJournalButton from "@/components/delete-buttons/delete-journal-button";

type Note = {
  id: string;
  userId: string | null;
  title: string;
  content: string;
  description: string | null;
  tags: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type QuickNote = {
  id: string;
  userId: string | null;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
};

type Journal = {
  id: string;
  userId: string | null;
  title: string | null;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
};

type Goal = {
  id: string;
  userId: string | null;
  title: string;
  description: string | null;
  isDeleted: boolean;
  createdAt: Date;
  isCompleted: boolean;
  type: "DAILY" | "MONTHLY" | "YEARLY";
};

export default async function DashboardPage() {
  const [notes, quickNotes, journals, goals]: [
    Note[],
    QuickNote[],
    Journal[],
    Goal[]
  ] = await Promise.all([
    GetNotes(),
    GetQuickNotes(),
    GetJournals(),
    GetGoals(),
  ]);
  const dailyGoals: Goal[] = goals.filter((goal) => goal.type === "DAILY");
  const monthlyGoals: Goal[] = goals.filter((goal) => goal.type === "MONTHLY");
  const yearlyGoals: Goal[] = goals.filter((goal) => goal.type === "YEARLY");

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl w-full flex items-center justify-start gap-2">
        {" "}
        <CgNotes /> My Notes
      </h1>{" "}
      <br />
      <br />
      <Carousel className="w-3/4 sm:w-6/7 md:w-9/10">
        <CarouselContent>
          {notes.map((note) => (
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3" key={note.id}>
              <Card className="group">
                <CardHeader>
                  <CardTitle className="text-xl overflow-hidden max-h-8">
                    {note.title}
                  </CardTitle>
                  <CardDescription className="text-xs max-h-5 overflow-hidden">
                    {note.description || "No description"}
                  </CardDescription>
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
            </CarouselItem>
          ))}
          <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
            <div className="flex items-center justify-center h-full cursor-pointer rounded-xl hover:bg-[var(--crad)]">
              <NotesAddButton />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <br />
      <br />
      <h1 className="text-2xl w-full flex items-center justify-start gap-2">
        {" "}
        <FaBookBookmark /> Journals{" "}
      </h1>{" "}
      <br />
      <br />
      <Carousel className="w-3/4 sm:w-6/7 md:w-9/10">
        <CarouselContent>
          {journals.map((journal) => (
            <CarouselItem
              className="sm:basis-1/2 lg:basis-1/3"
              key={journal.id}
            >
              <Card className="group">
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
            </CarouselItem>
          ))}
          <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
            <div className="flex items-center justify-center h-full cursor-pointer rounded-xl hover:bg-[var(--crad)]">
              <JournalAddButton />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <br />
      <br />
      <h1 className="text-2xl w-full flex items-center justify-start gap-2">
        {" "}
        <FaNotesMedical /> Quick Notes
      </h1>{" "}
      <br />
      <br />
      <Carousel className="w-3/4 sm:w-6/7 md:w-9/10">
        <CarouselContent>
          {quickNotes.map((quickNote) => (
            <CarouselItem
              className="sm:basis-1/2 lg:basis-1/3"
              key={quickNote.id}
            >
              <Card>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <br />
      <br />
      <h1 className="text-2xl w-full flex items-center justify-start gap-2">
        {" "}
        <GiBullseye /> Goals{" "}
      </h1>{" "}
      <br />
      <br />
      <Carousel className="w-3/4 sm:w-6/7 md:w-9/10">
        <CarouselContent>
          <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Daily Goals</CardTitle>
              </CardHeader>
              <CardContent className="text-sm flex flex-col gap-2">
                {dailyGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-2">
                    <Checkbox checked={goal.isCompleted} />
                    <span>{goal.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent className="text-sm flex flex-col gap-2">
                {monthlyGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-2">
                    <Checkbox checked={goal.isCompleted} />
                    <span>{goal.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Yearly Goals</CardTitle>
              </CardHeader>
              <CardContent className="text-sm flex flex-col gap-2">
                {yearlyGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-2">
                    <Checkbox checked={goal.isCompleted} />
                    <span>{goal.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
