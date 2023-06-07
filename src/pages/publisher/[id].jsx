import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PublisherDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [publisher, setPublisher] = useState({});
  const [books, setBooks] = useState([]); 
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    setLoading(true);
    if (id) {
      axios
        .get(`${apiUrl}/publishers/${id}`)
        .then((res) => {
          console.log(res.data)
          setPublisher(res.data[0]);
          res.data.forEach(publisher => {
            setBooks(prev => [...prev, publisher.bookname])
          })
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred.");
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <main className="min-h-screen py-20 relative flex flex-col justify-center items-center">
      <div className="w-[150px] aspect-square rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white grid place-items-center">
        Ini gambar
      </div>
      <div className="w-1/4">
        <h1 className="font-bold text-center text-[20px] mb-3">{id}</h1>
        <h2 className="text-center text-[16px] font-semibold">City</h2>
        <h2 className="text-center text-[16px]">{publisher?.city}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Country</h2>
        <h2 className="text-center text-[16px]">{publisher?.country}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Founded</h2>
        <h2 className="text-center text-[16px]">{publisher?.yearfounded}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">Phone</h2>
        <h2 className="text-center text-[16px]">{publisher?.pages}</h2>
        <hr className="my-1" />
        <h2 className="text-center text-[16px] font-semibold">
          Books Published
        </h2>
        <h2 className="text-center text-[16px]">
          {books?.map((genre) => genre).join(", ")}
        </h2>
      </div>
    </main>
  );
}
