"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createQuickNote } from "@/actions";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IoMdSave } from "react-icons/io";
import { CiSaveUp2 } from "react-icons/ci";

export default function QuickNotesAddButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await createQuickNote(content);
      setContent("");
      setOpen(false);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-4xl opacity-50 flex items-center justify-center h-full w-full border cursor-pointer rounded-xl hover:bg-[var(--card)]">
        +
      </DialogTrigger>
      <DialogContent
        className="w-[80vw] max-w-[80vw] h-5/10"
      >
        <DialogHeader>
          <DialogTitle className="flex gap-4 items-center justify-between ">
            Quick Note
            <Button
              className="rounded-2xl cursor-pointer mr-4"
              onClick={handleSave}
            >
              {loading ? <CiSaveUp2 /> : <IoMdSave />}
            </Button>
          </DialogTitle>
          <div className="flex items-center ml-2">
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}{" "}
          </div>
          <div className="flex gap-5 h-full mt-2">
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <Textarea
                className="p-4 h-full"
                placeholder="Write your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
