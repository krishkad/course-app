"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface HtmlEditorClientProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function HtmlEditorClient({
  value,
  onChange,
  disabled = false,
}: HtmlEditorClientProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[150px] border rounded-md p-2 bg-muted text-muted-foreground">
        Loading editor...
      </div>
    );
  }

  return (
    <div
      className={`min-h-[150px] border rounded-md p-2 bg-white ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <EditorContent editor={editor} className="h-full" placeholder="Type here..." />
    </div>
  );
}
