import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookPage() {
  const router = useRouter();
  const [book, setBook] = useState({});
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (router.query.id) {
      axios
        .get(`${apiUrl}/books/${router.query.id}`)
        .then((response) => {
          console.log(response.data);
          setBook(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.query.id]);
  return (
    <main className="flex flex-col items-center min-h-screen py-10">
      <div
        onClick={() => router.replace("/")}
        className="cursor-pointer hover:underline absolute top-0 left-0 m-2"
      >
        &larr; Back
      </div>
      <div className="w-[200px] aspect-[3/4] bg-gradient-to-br from-violet-500 to-blue-500 text-white grid place-items-center">Ini gambar</div>
      <div className="w-1/4">
        <h1 className="font-bold text-center text-[20px] mb-3">
          {book.bookname}
        </h1>
        <h2 className="text-center text-[16px] font-semibold">Author</h2>
        <h2 className="text-center text-[16px]">{book.authorname}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Publisher</h2>
        <h2 className="text-center text-[16px]">{book.publishername}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">
          Publication Year
        </h2>
        <h2 className="text-center text-[16px]">{book.publicationyear}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Genres</h2>
        <h2 className="text-center text-[16px]">
          {book.genres?.map((genre) => genre).join(", ")}
        </h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Pages</h2>
        <h2 className="text-center text-[16px]">{book.pages}</h2>

        <button
          className="w-full bg-green-400 py-2 mt-10 cursor-pointer hover:bg-green-500 rounded-md"
          onClick={() => alert("dari mana duitnya")}
        >
          Buy for {book.price}$ each
        </button>
      </div>
    </main>
  );
}
