import { DatePicker, Form } from "antd";
import type { DatePickerProps } from "antd";
import { FC } from "react";

interface CustomDatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  picker?: DatePickerProps["picker"];
  format?: string | string[];
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  name,
  label,
  placeholder,
  required = false,
  picker,
  format,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: `${label} is required` }]}
    >
      <DatePicker
        size="large"
        allowClear
        picker={picker}
        placeholder={placeholder ?? `Please Select ${label}`}
        format={format}
        className="w-full"
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
