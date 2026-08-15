"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";

import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
  StarterKit,

  Underline,

  Highlight,

  TextStyle,

  Color,

  Link,

  Image,

  Youtube,

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
],
    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (
      editor &&
      value !== editor.getHTML()
    ) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          Bold
        </button>
        <button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleHeading({ level: 1 }).run()
  }
>
  H1
</button>

<button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleHeading({ level: 2 }).run()
  }
>
  H2
</button>

<button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleHeading({ level: 3 }).run()
  }
>
  H3
</button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          Bullet
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          Number
        </button>

        
        <button
type="button"
onClick={() =>
editor.chain().focus().toggleHeading({ level: 1 }).run()
}
>
H1
</button>

<button
type="button"
onClick={() =>
editor.chain().focus().toggleHeading({ level: 2 }).run()
}
>
H2
</button>

<button
type="button"
onClick={() =>
editor.chain().focus().toggleHeading({ level: 3 }).run()
}
>
H3
</button>
<button
type="button"
onClick={() =>
editor.chain().focus().toggleUnderline().run()
}
>
U
</button>
<button
type="button"
onClick={() =>
editor.chain().focus().toggleHighlight().run()
}
>
Highlight
</button>
<input
type="color"
onInput={(e) =>
editor
.chain()
.focus()
.setColor(
(e.target as HTMLInputElement).value
)
.run()
}
/>
<button
type="button"
onClick={() =>
editor.chain().focus().setTextAlign("left").run()
}
>
⬅
</button>
<button
type="button"
onClick={() =>
editor.chain().focus().setTextAlign("center").run()
}
>
⬌
</button>
<button
type="button"
onClick={() =>
editor.chain().focus().setTextAlign("right").run()
}
>
➡
</button>
<button
type="button"
onClick={() => {
const url = prompt("Enter URL");

if (url) {
editor.chain().focus().setLink({ href: url }).run();
}
}}
>
🔗
</button>
<button
type="button"
onClick={() => {
const url = prompt("Image URL");

if (url) {
editor.chain().focus().setImage({ src: url }).run();
}
}}
>
🖼
</button>
<button
type="button"
onClick={() => {
const url = prompt("YouTube URL");

if (url) {
editor.commands.setYoutubeVideo({
src: url,
width: 640,
height: 480,
});
}
}}
>
📺
</button>
<button
          type="button"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        >
          Undo
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
          Redo
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}