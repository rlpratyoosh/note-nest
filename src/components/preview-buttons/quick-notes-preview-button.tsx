"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getQuickNotesById } from "@/actions";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { MdOutlineOpenInFull } from "react-icons/md";
import QuickNotesEditButton from "../edit-buttons/quick-note-edit-button";

type QuickNote = {
  id: string;
  userId: string | null;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
};

export default function QuickNotesPreviewButton(props: { id: string }) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<QuickNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchQuickNote();
    }
  }, [open]);

  const fetchQuickNote = async () => {
    try {
      setLoading(true);
      const fetchedNote = await getQuickNotesById(id);
      setNote(fetchedNote);
    } catch (err) {
      setError("Failed to load note");
      console.error("Error fetching note:", err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer"
          >
            <MdOutlineOpenInFull />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80vw] max-w-[80vw] h-5/10">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-8 w-8 text-gray-500 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <div className="text-lg">Loading...</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !note) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <MdOutlineOpenInFull />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80vw] max-w-[80vw] h-5/10">
          <div className="flex items-center justify-center h-full">
            <div className="text-red-500">{error || "Note not found"}</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer z-50">
          <MdOutlineOpenInFull />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[80vw] max-w-[80vw] h-5/10"
      >
        <DialogHeader>
          <DialogTitle className="flex gap-4 items-center justify-between">
            Quick Note
            <QuickNotesEditButton note={note} setPrevOpen={setOpen}/>
          </DialogTitle>
          <div className="mt-4 border rounded-xl p-4 overflow-auto h-9/10">
              {note.content}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
