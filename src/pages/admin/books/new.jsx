import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookDetailsAdminPage() {
  const router = useRouter();
  const [book, setBook] = useState({
    bookname: "",
    authorname: "",
    publishername: "",
    publicationyear: "",
    genres: [],
    pages: "",
    price: "",
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <main className="flex flex-col items-center min-h-screen py-10">
      <div className="w-1/4">
        <form>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Book Name"
              value={book.bookname}
              onChange={(e) => setBook({ ...book, bookname: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publisher Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Publisher Name"
              value={book.publishername}
              onChange={(e) =>
                setBook({ ...book, publishername: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publication Year
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Publication Year"
              value={book.publicationyear}
              onChange={(e) =>
                setBook({ ...book, publicationyear: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pages
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Price"
              value={book.pages}
              onChange={(e) => setBook({ ...book, pages: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Price"
              value={book.price}
              onChange={(e) => setBook({ ...book, price: e.target.value })}
            />
          </div>
        </form>

        <button
          className="w-full bg-green-400 py-2 mt-10 cursor-pointer hover:bg-green-500 rounded-md"
          onClick={() => {
            axios
              .post(`${apiUrl}/books/add`, book)
              .then((res) => {
                alert("Book added successfully")
                router.push("/admin/books");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Add
        </button>
        <button
          className="w-full bg-blue-400 py-2 mt-5 cursor-pointer hover:bg-blue-500 rounded-md"
          onClick={() => router.push("/admin/books")}
        >
          &larr; Back
        </button>
      </div>
    </main>
  );
}
