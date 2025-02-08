import React from "react";
import { useGetAllBooksQuery } from "@/redux/service/book/bookApi";
import BookCard from "./BookCard";
import { Skeleton } from "antd";

const BookList: React.FC = () => {
  const { data: books, isFetching, isError } = useGetAllBooksQuery(undefined);

  const filteredBooks = books?.results;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {isFetching &&
        Array.from({ length: 3 }).map((_, index) => (
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

      <div className="grid grid-cols-1 ">
        {!isFetching &&
          filteredBooks?.map((item) => (
            <BookCard key={item?._id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default BookList;
