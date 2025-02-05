import { useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface CustomTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const CustomTextEditor: React.FC<CustomTextEditorProps> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef(null);

  const config = {
    readonly: false,
    theme: "light",
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "fontsize",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "fullsize",
      "selectall",
      "print",
      "|",
      "video",
      "cut",
      "copy",
      "paste",
      "find",
    ],
    placeholder: "Start typing...",
  };

  return (
    <JoditEditor
      ref={editorRef}
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)}
    />
  );
};

export default CustomTextEditor;
