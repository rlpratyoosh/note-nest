"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ReactMarkdown from "react-markdown";
import {
  Components,
  ReactMarkdownProps,
} from "react-markdown/lib/ast-to-react";
import { getJournalsById } from "@/actions";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { MdOutlineOpenInFull } from "react-icons/md";
import JournalEditButton from "../edit-buttons/journal-edit-button";

type journal = {
  id: string;
  userId: string | null;
  title: string | null;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
};

export default function JournalPreviewButton(props: { id: string }) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const [journal, setJournal] = useState<journal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchJournal();
    }
  }, [open]);

  const fetchJournal = async () => {
    try {
      setLoading(true);
      const fetchedJournal = await getJournalsById(id);
      setJournal(fetchedJournal);
    } catch (err) {
      setError("Failed to load Journal");
      console.error("Error fetching Journal:", err);
    } finally {
      setLoading(false);
    }
  };

  const components: Components = {
    h1: ({ node, ...props }: ReactMarkdownProps) => (
      <h1 className="text-3xl font-bold mb-4" {...props} />
    ),
    h2: ({ node, ...props }: ReactMarkdownProps) => (
      <h2 className="text-2xl font-semibold mb-3" {...props} />
    ),
    h3: ({ node, ...props }: ReactMarkdownProps) => (
      <h3 className="text-xl font-semibold mb-2" {...props} />
    ),
    h4: ({ node, ...props }: ReactMarkdownProps) => (
      <h4 className="text-lg font-semibold mb-2" {...props} />
    ),
    h5: ({ node, ...props }: ReactMarkdownProps) => (
      <h5 className="text-base font-semibold mb-1" {...props} />
    ),
    h6: ({ node, ...props }: ReactMarkdownProps) => (
      <h6 className="text-sm font-semibold mb-1" {...props} />
    ),
    p: ({ node, ...props }: ReactMarkdownProps) => (
      <p className="mb-4 leading-relaxed" {...props} />
    ),
    ul: ({
      node,
      ordered,
      ...props
    }: ReactMarkdownProps & { ordered?: boolean }) => (
      <ul className="list-disc list-inside mb-4 space-y-1" {...props} />
    ),
    ol: ({
      node,
      ordered,
      ...props
    }: ReactMarkdownProps & { ordered?: boolean }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />
    ),
    li: ({
      node,
      ordered,
      ...props
    }: ReactMarkdownProps & { ordered?: boolean }) => (
      <li className="leading-relaxed" {...props} />
    ),
    strong: ({ node, ...props }: ReactMarkdownProps) => (
      <strong className="font-semibold" {...props} />
    ),
    em: ({ node, ...props }: ReactMarkdownProps) => (
      <em className="italic" {...props} />
    ),
    blockquote: ({ node, ...props }: ReactMarkdownProps) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic mb-4"
        {...props}
      />
    ),
    code: ({
      inline,
      children,
      ...props
    }: ReactMarkdownProps & { inline?: boolean }) => (
      <code
        className={`bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono ${
          (props as any).className || ""
        }`}
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ node, ...props }: ReactMarkdownProps) => (
      <pre
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"
        {...props}
      />
    ),
    hr: ({ node, ...props }: ReactMarkdownProps) => (
      <hr className="border-t border-gray-500 w-full my-4" {...props} />
    ),
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
        <DialogContent className="w-[90vw] max-w-[90vw] h-9/10">
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

  if (error || !journal) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <MdOutlineOpenInFull />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] max-w-[90vw] h-9/10">
          <div className="flex items-center justify-center h-full">
            <div className="text-red-500">{error || "Journal not found"}</div>
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
        className="w-[90vw] max-w-[90vw] h-9/10"
        style={{ width: "90vw", maxWidth: "90vw" }}
      >
        <DialogHeader>
          <DialogTitle className="flex gap-4 items-center justify-between">
            {journal.title || "Untitled Journal"}
            <JournalEditButton journal={journal} setPrevOpen={setOpen}/>
          </DialogTitle>
          <div className="mt-4 border rounded-xl p-4 overflow-auto h-9/10">
            <ReactMarkdown className="w-full" components={components}>
              {journal.content}
            </ReactMarkdown>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
