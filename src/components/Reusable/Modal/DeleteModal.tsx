import { Button, Modal } from "antd";
import { toast } from "sonner";
import deleteImage from "@/assets/images/Trash-can.png";
import Image from "next/image";

interface DeleteModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  itemId: string;
  func: (
    id: string
  ) => Promise<{ data?: { success: boolean; message: string } } | void>;
  text: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  modalOpen,
  setModalOpen,
  itemId,
  func,
  text,
}) => {
  const handleDelete = async () => {
    try {
      const res = await func(itemId);

      if (res && res.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res?.data?.message || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <Modal
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <div className="p-8">
        <Image
          height={60}
          width={60}
          src={deleteImage}
          alt="delete image"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h2 className="text-center text-2xl font-bold">
          Are you sure you want to permanently delete this {text}?
        </h2>
        <div className="lg:flex mt-10 gap-6 items-center justify-center">
          <Button
            onClick={() => setModalOpen(false)}
            type="text"
            className="!font-bold bg-transparent !text-red-500 px-10 py-4 border !border-red-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            type="text"
            className="!font-bold bg-red-500 !text-white px-10 py-4 border !border-red-500"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
