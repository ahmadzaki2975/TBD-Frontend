import AuthorCard from "@/components/AuthorCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AuthorPage({ author }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiUrl}/authors`)
      .then((res) => {
        setAuthors(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="min-h-screen py-10 flex flex-col justify-center items-center">
      <h1 className="text-center text-[20px] font-bold mb-10">Authors</h1>
      <div className="mx-auto gap-5 w-fit grid grid-cols-4">
        {authors.map((author) => (
          <AuthorCard key={author.authorid} author={author} />
        ))}
      </div>
    </main>
  );
}
