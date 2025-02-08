import {
  IBook,
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/service/book/bookApi";
import { appendToFormData } from "@/utils/lib/appendToFormData";
import { Button, Modal } from "antd";
import { toast } from "sonner";
import BookForm from "./BookForm";
import CustomForm from "@/components/Reusable/Form/CustomForm";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/redux/hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Field,
  transformDefaultValues,
} from "@/utils/lib/transformedDefaultValues";

interface EditBookProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: string;
}

const EditBook: React.FC<EditBookProps> = ({
  modalOpen,
  setModalOpen,
  itemId,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [fields, setFields] = useState<Field[]>([]);

  const { data: bookData, isFetching: isBookFetching } = useGetSingleBookQuery(
    itemId,
    {
      skip: !itemId,
    }
  );

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const onSubmit = async (values: IBook) => {
    const toastId = toast.loading("Updating Brand...");
    try {
      const submittedData = {
        ...values,
        user: user?._id,
        publishedAt: dayjs(values.publishedAt).format("YYYY-MM-DD"),
      };

      if (
        values?.coverImage &&
        Array.isArray(values.coverImage) &&
        !values.coverImage[0]?.url
      ) {
        submittedData.coverImage = values.coverImage[0].originFileObj;
      } else {
        delete submittedData.coverImage;
      }

      const updatedBrandData = new FormData();
      appendToFormData(submittedData, updatedBrandData);

      const updatedData = {
        id: itemId,
        data: updatedBrandData,
      };

      const res = await updateBook(updatedData);

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
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating Brand:", error);
      toast.error("An error occurred while updating the Brand.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(bookData, []));
  }, [bookData]);

  return (
    <Modal
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      footer={null}
      className="p-5"
      centered
      width={1000}
      destroyOnClose
      loading={isBookFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <BookForm attachment={bookData?.coverImage} />
        <div className="flex justify-end items-center gap-6 mt-10">
          <Button
            onClick={() => setModalOpen(false)}
            type="default"
            className="!font-bold bg-transparent !text-red-500 px-10 border !border-red-500"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="font-bold px-10 border !border-primary"
          >
            Update Book
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default EditBook;
