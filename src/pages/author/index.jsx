import AuthorCard from "@/components/AuthorCard";
import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AuthorPage({ author }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [authors, setAuthors] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/authors`)
      .then((res) => {
        setAuthors(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("An error occured. Please try again.");
        setLoading(false);
      });
  }, []);
  return (
    <main className="min-h-screen py-20 flex flex-col items-center">
      <h1 className="text-center text-[20px] font-bold mb-10">Authors</h1>
      <div className="mx-auto gap-5 w-fit grid grid-cols-4">
        {authors.map((author) => (
          <AuthorCard key={author.authorid} author={author} />
        ))}
      </div>
    </main>
  );
}
