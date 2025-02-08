import { useRef } from "react";
import dynamic from "next/dynamic";
import { Form } from "antd";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface CustomTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  name: string;
  label: string;
  required?: boolean;
}

const CustomTextEditor: React.FC<CustomTextEditorProps> = ({
  value,
  onChange,
  name,
  label,
  required = false,
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
    <Form.Item
      label={label}
      name={name}
      required={required}
      rules={[{ required, message: `${label} is required` }]}
    >
      <JoditEditor
        config={config}
        ref={editorRef}
        value={value}
        onBlur={(newContent) => onChange?.(newContent)}
      />
    </Form.Item>
  );
};

export default CustomTextEditor;
