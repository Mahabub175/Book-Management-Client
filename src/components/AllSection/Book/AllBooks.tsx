"use client";

import { Button, Input } from "antd";
import { useState } from "react";
import CreateBook from "./CreateBook";
import BookList from "./BookList";
import { FaSearch } from "react-icons/fa";

const AllBooks = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="container mx-auto px-5 my-10 lg:my-20">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <Button
          type="primary"
          onClick={() => setOpenCreate(true)}
          className="px-10 font-bold mb-5 lg:mb-0"
        >
          Add Book
        </Button>
        <Input
          placeholder={`Type to search...`}
          allowClear
          className="lg:w-1/3"
          prefix={<FaSearch className="text-primary" />}
          onChange={handleSearch}
        />
      </div>
      <div>
        <BookList searchQuery={searchQuery} />
      </div>
      <CreateBook open={openCreate} setOpen={setOpenCreate} />
    </section>
  );
};

export default AllBooks;
