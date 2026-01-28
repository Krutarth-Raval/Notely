"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import SuperscriptExtension from "@tiptap/extension-superscript";
import SubscriptExtension from "@tiptap/extension-subscript";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Plus,
  Menu,
  X,
  CheckSquare,
  type LucideIcon,
} from "lucide-react";
import { Underline as UnderlineIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface RichTextEditorProps {
  content?: JSONContent;
  noteId?: string;
  note?: { title?: string; notebookId?: string };
}

interface ToolbarButtonProps {
  onClick: () => void;
  disabled: boolean | undefined;
  isActive?: boolean;
  icon: LucideIcon;
  label: string;
}

const RichTextEditor = ({ content, noteId, note }: RichTextEditorProps) => {
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedContentRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState(note?.title || "");
  const titleRef = useRef(note?.title || "");
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  // insertImage defined after editor initialization

  const saveNote = useCallback(
    async (id: string, payload: { title: string; content: JSONContent; notebookId: string }) => {
      try {
        await fetch(`/api/notes/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        // swallow for now; could add toast
      }
    },
    []
  );
  const editor = useEditor({
    extensions: [
      // Configure StarterKit to exclude the default list extensions
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      // Add the list extensions separately with proper configuration
      BulletList.configure({
        HTMLAttributes: {
          class: 'prose-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'prose-ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'prose-list-item',
        },
      }),
      SuperscriptExtension,
      SubscriptExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'prose-link',
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'prose-image',
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      if (!noteId || !note) return;
      const latestContent = editor.getJSON();
      const latestContentString = JSON.stringify(latestContent);

      // Skip if content hasn't changed (prevents initial unnecessary save)
      if (lastSavedContentRef.current === latestContentString) return;

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveNote(noteId, {
          title: titleRef.current,
          content: latestContent as unknown as JSONContent,
          notebookId: note?.notebookId || "",
        });
        lastSavedContentRef.current = latestContentString;
      }, 500);
    },
    content: content ?? {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Getting started" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome to the " },
            {
              type: "text",
              text: "Simple Editor",
              marks: [{ type: "italic" }],
            },
            { type: "text", text: " template! This template integrates " },
            { type: "text", text: "open source", marks: [{ type: "bold" }] },
            {
              type: "text",
              text: " UI components and Tiptap extensions licensed under ",
            },
            { type: "text", text: "MIT", marks: [{ type: "bold" }] },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Try creating lists:" }
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "First bullet point" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Second bullet point" }],
                },
              ],
            },
          ],
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "First numbered item" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Second numbered item" }],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Integrate it by following the " },
            {
              type: "text",
              text: "Tiptap UI Components docs",
              marks: [{ type: "code" }],
            },
            { type: "text", text: " or using our CLI tool." },
          ],
        },
        {
          type: "codeBlock",
          content: [{ type: "text", text: "npx @tiptap/cli init" }],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features" }],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                },
                { type: "text", text: "**", marks: [{ type: "bold" }] },
                { type: "text", text: " or use keyboard shortcuts " },
                { type: "text", text: "⌘+B", marks: [{ type: "code" }] },
                { type: "text", text: " for most all common markdown marks." },
              ],
            },
          ],
        },
      ],
    },
  });

  const insertImage = useCallback(
    (src: string) => {
      if (!src) return;
      if (!editor) return;
      editor.chain().focus().setImage({ src, alt: "" }).run();
    },
    [editor]
  );

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {};
      return {
        isBold: ctx.editor?.isActive("bold"),
        canBold: ctx.editor?.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor?.isActive("italic"),
        canItalic: ctx.editor?.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor?.isActive("strike"),
        canStrike: ctx.editor?.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor?.isActive("code"),
        canCode: ctx.editor?.can().chain().focus().toggleCode().run(),
        isUnderline: ctx.editor?.isActive("underline"),
        canUnderline: ctx.editor?.can().chain().focus().toggleUnderline().run(),
        isParagraph: ctx.editor?.isActive("paragraph"),
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }),
        isBulletList: ctx.editor?.isActive("bulletList"),
        isOrderedList: ctx.editor?.isActive("orderedList"),
        isCodeBlock: ctx.editor?.isActive("codeBlock"),
        isBlockquote: ctx.editor?.isActive("blockquote"),
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
        canToggleBulletList: ctx.editor?.can().chain().focus().toggleBulletList().run(),
        canToggleOrderedList: ctx.editor?.can().chain().focus().toggleOrderedList().run(),
        isTaskList: ctx.editor?.isActive('taskList'),
        canToggleTaskList: ctx.editor?.can().chain().focus().toggleTaskList().run(),
      };
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    titleRef.current = newTitle;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (!noteId || !editor) return;
      saveNote(noteId, {
        title: newTitle,
        content: editor.getJSON() as unknown as JSONContent,
        notebookId: note?.notebookId || "",
      });
    }, 500);
  };

  const getActiveHeading = () => {
    if (editorState?.isHeading1) return "H1";
    if (editorState?.isHeading2) return "H2";
    if (editorState?.isHeading3) return "H3";
    return "H1";
  };

  const ToolbarButton = ({ onClick, disabled, isActive, icon: Icon, label }: ToolbarButtonProps) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          disabled={disabled}
          className={`size-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className="flex flex-col w-full min-h-[500px] relative  shadow-sm">
      {/* Top Bar: Title and Menu Toggle */}
      <div className="sticky top-0 z-50 flex items-center gap-2 justify-between p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <Input
          value={title}
          onChange={handleTitleChange}
          className="text-xl md:text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-2 h-auto bg-transparent w-full"
          placeholder="Note Title"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setIsToolbarOpen(!isToolbarOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isToolbarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isToolbarOpen ? "Close Toolbar" : "Open Toolbar"}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-1 w-full h-full" onClick={() => editor?.chain().focus().run()}>
        {/* Editor Content */}
        <div className="flex-1 w-full p-2 md:p-8 cursor-text">
          <div className="max-w-[100vw] lg:max-w-7xl mx-auto bg-card rounded-xl shadow-sm p-4 min-h-[calc(100vh-150px)]">
            <EditorContent
              editor={editor}
              className="prose prose-neutral dark:prose-invert max-w-none w-full break-all focus:outline-none 
               [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:w-full
            [&_a]:break-all [&_a]:break-words
            [&_.ProseMirror_h1]:text-4xl [&_.ProseMirror_h1]:font-extrabold [&_.ProseMirror_h1]:leading-tight [&_.ProseMirror_h1]:mb-1 [&_.ProseMirror_h1]:mt-2
            [&_.ProseMirror_h2]:text-3xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:leading-tight [&_.ProseMirror_h2]:mb-1 [&_.ProseMirror_h2]:mt-2
            [&_.ProseMirror_h3]:text-2xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:leading-tight [&_.ProseMirror_h3]:mb-1 [&_.ProseMirror_h3]:mt-1
            [&_.ProseMirror_p]:leading-normal [&_.ProseMirror_p]:mb-1
            [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-4
            [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:my-4
            [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-sm
            [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ul]:mb-4
            [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_ol]:mb-4
            [&_.ProseMirror_li]:mb-1
            [&_.prose-bullet-list]:list-disc [&_.prose-bullet-list]:ml-6 [&_.prose-bullet-list]:mb-4
            [&_.prose-ordered-list]:list-decimal [&_.prose-ordered-list]:ml-6 [&_.prose-ordered-list]:mb-4
            [&_.prose-list-item]:mb-1
            [&_ul[data-type='taskList']]:!list-none [&_ul[data-type='taskList']]:!p-0 [&_ul[data-type='taskList']]:!m-0
            [&_li[data-type='taskItem']]:!flex [&_li[data-type='taskItem']]:!items-start [&_li[data-type='taskItem']]:!gap-2 [&_li[data-type='taskItem']]:!my-1 [&_li[data-type='taskItem']]:!p-0
            [&_li[data-type='taskItem']>label]:!flex [&_li[data-type='taskItem']>label]:!items-center [&_li[data-type='taskItem']>label]:!select-none [&_li[data-type='taskItem']>label]:!m-0 [&_li[data-type='taskItem']>label]:!mt-[0.25em]
            [&_li[data-type='taskItem']>div]:!flex-1 [&_li[data-type='taskItem']>div]:!min-w-0 [&_li[data-type='taskItem']>div]:!m-0
            [&_li[data-type='taskItem']_p]:!m-0 [&_li[data-type='taskItem']_p]:!leading-normal
            [&_li[data-checked='true']>div]:line-through [&_li[data-checked='true']>div]:text-muted-foreground [&_li[data-checked='true']>div]:opacity-50
            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-6"
            />
          </div>
        </div>

        {/* Right Sidebar Toolbar */}
        <div
          className={`flex flex-col items-center gap-2 border rounded-md bg-background/50 backdrop-blur-sm duration-300 ease-in-out transition-all sticky top-[65px] h-max overflow-y-auto ${isToolbarOpen ? "w-16 p-2 opacity-100" : "w-0 p-0 opacity-0 overflow-hidden border-none"
            }`}
        >
          {/* Undo/Redo */}
          <ToolbarButton onClick={() => editor?.chain().focus().undo().run()} disabled={!editorState?.canUndo} icon={Undo} label="Undo" />
          <ToolbarButton onClick={() => editor?.chain().focus().redo().run()} disabled={!editorState?.canRedo} icon={Redo} label="Redo" />

          <div className="w-8 h-px bg-border my-1" />

          {/* Formatting */}
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} disabled={!editorState?.canBold} isActive={editorState?.isBold} icon={Bold} label="Bold" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={!editorState?.canItalic} isActive={editorState?.isItalic} icon={Italic} label="Italic" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleStrike().run()} disabled={!editorState?.canStrike} isActive={editorState?.isStrike} icon={Strikethrough} label="Strikethrough" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleCode().run()} disabled={!editorState?.canCode} isActive={editorState?.isCode} icon={Code} label="Code" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor?.chain().focus().toggleUnderline().run();
                }}
                disabled={!editorState?.canUnderline}
                className={`size-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors ${editorState?.isUnderline
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left"><p>Underline</p></TooltipContent>
          </Tooltip>

          <div className="w-8 h-px bg-border my-1" />

          {/* Headings - simplified for sidebar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <span className="text-xs font-bold">{getActiveHeading()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border" side="left">
              <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
                Heading 3
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor?.chain().focus().setParagraph().run()}>
                Paragraph
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Lists */}
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={!editorState?.canToggleBulletList} isActive={editorState?.isBulletList} icon={List} label="Bullet List" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} disabled={!editorState?.canToggleOrderedList} isActive={editorState?.isOrderedList} icon={ListOrdered} label="Ordered List" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleTaskList().run()} disabled={!editorState?.canToggleTaskList} isActive={editorState?.isTaskList} icon={CheckSquare} label="Task List" />

          <div className="w-8 h-px bg-border my-1" />

          <ToolbarButton
            onClick={() => {
              const previousUrl = editor?.getAttributes("link").href as string | undefined;
              const url = window.prompt("Enter URL", previousUrl ?? "https://");
              if (url === null) return;
              if (url === "" || url === undefined) {
                editor?.chain().focus().unsetLink().run();
                return;
              }
              editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }}
            disabled={!editor}
            icon={Link}
            label="Link"
          />

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="left"><p>Insert</p></TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="bg-popover border" side="left">
              <DropdownMenuItem
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Alignment */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="left"><p>Align</p></TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="bg-popover border" side="left">
              <DropdownMenuItem onClick={() => editor?.chain().focus().setTextAlign("left").run()}>
                <AlignLeft className="h-4 w-4 mr-2" /> Left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor?.chain().focus().setTextAlign("center").run()}>
                <AlignCenter className="h-4 w-4 mr-2" /> Center
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor?.chain().focus().setTextAlign("right").run()}>
                <AlignRight className="h-4 w-4 mr-2" /> Right
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor?.chain().focus().setTextAlign("justify").run()}>
                <AlignJustify className="h-4 w-4 mr-2" /> Justify
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hidden Input for Images */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                insertImage(dataUrl);
                // reset input so same file can be selected again
                if (fileInputRef.current) fileInputRef.current.value = "";
              };
              reader.readAsDataURL(file);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;