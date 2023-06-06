import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthorDetailPage() {
  const [author, setAuthor] = useState({});
  const [bookwritten, setBookWritten] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (id) {
      axios
        .get(`${apiUrl}/authors/${id}`)
        .then((response) => {
          setAuthor(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${apiUrl}/authors/books/${id}`)
        .then((response) => {
          setBookWritten(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <main className="flex flex-col items-center min-h-screen justify-center">
      <div className="w-[150px] aspect-[3/4] bg-gradient-to-br from-violet-500 to-blue-500 text-white grid place-items-center">
        Ini gambar
      </div>
      <div className="w-1/4">
        <h1 className="font-bold text-center text-[20px] mb-3">
          {author.authorname}
        </h1>
        <h2 className="text-center text-[16px] font-semibold">Name</h2>
        <h2 className="text-center text-[16px]">{author.authorname}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Year of Birth</h2>
        <h2 className="text-center text-[16px]">{author.yearborn}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Year of Death</h2>
        <h2 className="text-center text-[16px]">
          {author.yeardeath ? author.yeardeath : "Alive"}
        </h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Books Written ({bookwritten.length})</h2>
        <h2 className="text-center text-[16px]">{bookwritten.map(book => {
          return book.bookname
        })}</h2>
      </div>
    </main>
  );
}
