import { Form, Input } from "antd";
import { FC } from "react";

interface CustomInputProps {
  type?: "text" | "password" | "textarea" | "number" | "email";
  name: string;
  label: string;
  max?: number;
  value?: string | number;
  required?: boolean;
  prefix?: React.ReactNode;
  placeholder?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  type = "text",
  name,
  label,
  max,
  value,
  required = false,
  prefix,
  placeholder,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: `${label} is required` }]}
    >
      {type === "password" ? (
        <Input.Password
          placeholder={placeholder ?? `Please Enter ${label}`}
          size="large"
          allowClear
          maxLength={max}
          prefix={prefix ?? null}
        />
      ) : type === "textarea" ? (
        <Input.TextArea
          placeholder={placeholder ?? `Please Enter ${label}`}
          size="large"
          allowClear
          maxLength={max}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder ?? `Please Enter ${label}`}
          size="large"
          allowClear
          value={value}
          maxLength={max}
          min={type === "number" ? 0 : undefined}
          prefix={prefix ?? null}
          onWheel={(e) => type === "number" && (e.target as HTMLElement).blur()}
        />
      )}
    </Form.Item>
  );
};

export default CustomInput;
