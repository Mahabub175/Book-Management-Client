import { IBook, useAddBookMutation } from "@/redux/service/book/bookApi";
import { appendToFormData } from "@/utils/lib/appendToFormData";
import { Button, Modal } from "antd";
import { toast } from "sonner";
import BookForm from "./BookForm";
import CustomForm from "@/components/Reusable/Form/CustomForm";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/redux/hooks";
import dayjs from "dayjs";

interface CreateBookProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBook: React.FC<CreateBookProps> = ({ open, setOpen }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [addBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (values: IBook) => {
    const toastId = toast.loading("Creating Book...");

    try {
      const submittedData = {
        ...values,
        user: user?._id,
        publishedAt: dayjs(values.publishedAt).format("YYYY-MM-DD"),
        coverImage: values?.coverImage[0]?.originFileObj,
      };

      const data = new FormData();

      appendToFormData(submittedData, data);
      const res = await addBook(data);
      if ("error" in res) {
        const errorMessage =
          res.error && "data" in res.error
            ? (res.error as FetchBaseQueryError).data
              ? (res.error.data as { errorMessage?: string })?.errorMessage ||
                "Something Went Wrong!"
              : "Something Went Wrong!"
            : "Something Went Wrong!";
        toast.error(errorMessage, {
          id: toastId,
        });
      }
      if (res?.data?.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Book:", error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="p-5"
      centered
      width={1000}
      destroyOnClose
    >
      <CustomForm onSubmit={onSubmit}>
        <BookForm />
        <div className="flex flex-col lg:flex-row justify-end items-center gap-4 lg:gap-6 mt-10">
          <Button
            onClick={() => setOpen(false)}
            type="default"
            className="!font-bold bg-transparent !text-red-500 px-10 border !border-red-500"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="!font-bold px-10 border !border-primary"
          >
            Add Book
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default CreateBook;
