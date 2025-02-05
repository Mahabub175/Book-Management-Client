import { Form } from "antd";
import { toast } from "sonner";
import { ReactNode } from "react";

interface CustomFormProps {
  onSubmit: (values: any) => void;
  children: ReactNode;
  fields?: { name: string; value: any }[];
}

const CustomForm: React.FC<CustomFormProps> = ({
  onSubmit,
  children,
  fields = [],
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, any>) => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        onSubmit(values);
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  };

  const onFinishFailed = () => {
    toast.error("Please select all the fields");
  };

  return (
    <Form
      form={form}
      fields={fields}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="on"
    >
      {children}
    </Form>
  );
};

export default CustomForm;
