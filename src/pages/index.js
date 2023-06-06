import Image from "next/image";
import BookCard from "@/components/BookCard";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoadingContext } from "@/contexts/LoadingContext";
import { toast } from "react-toastify";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [books, setBooks] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/books`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occured, please try again.");
        setLoading(false);
      });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center py-20">
      <h1 className="text-center text-[20px] font-bold mb-10">Books</h1>
      <div className="grid grid-cols-4 gap-5">
        {books.map((book) => {
          return <BookCard key={book.bookid} book={book} />;
        })}
      </div>
    </main>
  );
}
