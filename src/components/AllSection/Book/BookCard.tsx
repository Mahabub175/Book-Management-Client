import DeleteModal from "@/components/Reusable/Modal/DeleteModal";
import { useAppSelector } from "@/redux/hooks";
import { useDeleteBookMutation } from "@/redux/service/book/bookApi";
import Image from "next/image";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditBook from "./EditBook";
interface Book {
  _id: string;
  name: string;
  author: string;
  coverImage: string;
  description: string;
  price: number;
  language: string;
  publishedAt: string;
  user: {
    _id: string;
  };
}

const BookCard: React.FC<{ item: Book }> = ({ item }) => {
  const user = useAppSelector((state) => state.auth.user);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [itemId, setItemId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setItemId(id);
    setDeleteModal(true);
  };

  const handleEdit = (id: string) => {
    setItemId(id);
    setEditModal(true);
  };

  const [deleteBook] = useDeleteBookMutation();

  const isOwner = user?._id === item?.user?._id;

  return (
    <div className="w-[160px] lg:w-[250px] h-[450px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 relative group">
      <div className="overflow-hidden">
        <Image
          src={item.coverImage}
          alt={item.name}
          width={100}
          height={100}
          className="w-full h-[150px] lg:h-[200px] object-contain group-hover:scale-110 duration-500"
        />
      </div>

      <div className="p-4">
        <h2 className="lg:text-xl font-bold text-gray-900 mb-2">{item.name}</h2>

        <p className="text-sm text-gray-600">By {item.author}</p>

        <p className="mt-2 text-gray-700 text-sm line-clamp-3 lg:hidden">
          {item.description.replace(/(<([^>]+)>)/gi, "").slice(0, 30)}...
        </p>
        <p className="mt-2 text-gray-700 text-sm line-clamp-3 hidden lg:block">
          {item.description.replace(/(<([^>]+)>)/gi, "").slice(0, 100)}...
        </p>

        <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
          <span className="text-lg font-semibold text-indigo-600">
            ${item.price}
          </span>
          <span className="text-xs text-gray-500">
            Published: {new Date(item.publishedAt).toDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {item.language}
          </span>
        </div>

        <div className="flex justify-end gap-4 mt-4 absolute bottom-2 right-5">
          {/* <button
            className="bg-green-500 text-white p-2 rounded flex items-center gap-1 hover:bg-green-600 duration-300"
            onClick={() => handleEdit(item._id)}
          >
            <TbListDetails />
          </button> */}
          {isOwner && (
            <>
              <button
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-1 hover:bg-blue-600 duration-300"
                onClick={() => handleEdit(item._id)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded flex items-center gap-1 hover:bg-red-600 duration-300"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>

      {editModal && itemId && (
        <EditBook
          modalOpen={editModal}
          setModalOpen={setEditModal}
          itemId={itemId}
        />
      )}
      {deleteModal && itemId && (
        <DeleteModal
          modalOpen={deleteModal}
          setModalOpen={setDeleteModal}
          itemId={itemId}
          func={deleteBook}
          text="book"
        />
      )}
    </div>
  );
};

export default BookCard;
