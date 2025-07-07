"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Components,
  ReactMarkdownProps,
} from "react-markdown/lib/ast-to-react";

export default function NotesAddButton() {
  const [content, setContent] = useState<string>("");

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

  return (
    <Dialog>
      <DialogTrigger className="text-4xl opacity-50 flex items-center justify-center h-full w-full border cursor-pointer rounded-xl hover:bg-[var(--card)]">
        +
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] max-w-[90vw] h-9/10"
        style={{ width: "90vw", maxWidth: "90vw" }}
      >
        <DialogHeader>
          <DialogTitle className="flex gap-4">
            <Input
              placeholder="Write your title here..."
              className="max-w-100"
            />{" "}
            <Button className="rounded-2xl cursor-pointer">Save</Button>
          </DialogTitle>
          <div className="flex gap-5 h-full mt-2">
            <Textarea
              className="h-full p-4 whitespace-pre overflow-x-auto"
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="w-full hidden md:flex border rounded-xl p-4 overflow-auto">
              <div className="markdown-content w-full">
                <ReactMarkdown className="w-full" components={components}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
