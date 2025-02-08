import React from "react";
import { useGetAllBooksQuery } from "@/redux/service/book/bookApi";
import BookCard from "./BookCard";
import { Skeleton } from "antd";
import { motion, AnimatePresence } from "framer-motion";

interface BookListProps {
  searchQuery: string;
}

const BookList: React.FC<BookListProps> = ({ searchQuery }) => {
  const { data: books, isFetching, isError } = useGetAllBooksQuery(undefined);

  const filteredBooks =
    books?.results?.filter(
      (book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.price.toString().includes(searchQuery)
    ) || books?.results;

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isFetching &&
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-4"
            >
              <Skeleton.Image active className="w-full h-56" />
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 2 }}
                className="mt-2"
              />
            </div>
          ))}
      </div>

      {isError && !isFetching && (
        <p className="text-center text-red-500 col-span-full">
          Failed to load books. Please try again later.
        </p>
      )}

      {!isFetching && !isError && filteredBooks?.length === 0 && (
        <p className="text-center text-gray-500 col-span-full mt-10 bg-white shadow p-5 rounded-xl border">
          No books available at the moment.
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 lg:gap-20 lg:mt-10">
        <AnimatePresence>
          {!isFetching &&
            filteredBooks?.map((item) => (
              <motion.div
                key={item?._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard item={item} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookList;
