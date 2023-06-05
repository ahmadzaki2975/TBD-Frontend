import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function AdminBookPage() {
  const [books, setBooks] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [refresh, setRefresh] = useState(false); 
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert("Error. Make sure the API is running.");
      });
  }, [refresh]);

  return (
    <main className="min-h-screen py-20">
      <h1 className="text-center text-[20px] font-bold mb-5">Admin - Books</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchKey === "") {
            setRefresh(!refresh);
          } else {
            const result = books.filter((book) =>
              book.bookname
                .toLowerCase()
                .includes(searchKey.trim().toLowerCase())
            );
            setBooks(result);
          }
        }}
        className="flex w-fit mx-auto mb-5"
      >
        <input
          type="text"
          className="outline outline-1 rounded-l-md px-2 py-1"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit" className="outline outline-1 px-2 rounded-r-md">
          <BsSearch />
        </button>
      </form>
      <div className="grid grid-cols-4 gap-5 mx-[20%]">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}

function BookCard({ book }) {
  return (
    <Link href={`/admin/books/${book.bookid}`}>
      <div className="aspect-square grid place-items-center outline outline-black bg-white cursor-pointer rounded-md transition hover:drop-shadow-[0_0_5px_rgba(0,0,0,.9)]">
        <h1 className="text-center">{book.bookname}</h1>
      </div>
    </Link>
  );
}
