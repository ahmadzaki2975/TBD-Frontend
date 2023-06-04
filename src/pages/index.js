import Image from "next/image";
import BookCard from "@/components/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [books, setBooks] = useState([]);
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
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bookstore DB</h1>
      <div className="grid grid-cols-4 gap-5">
        {books.map((book) => {
          return <BookCard key={book.bookid} book={book} />;
        })}
      </div>
    </main>
  );
}
