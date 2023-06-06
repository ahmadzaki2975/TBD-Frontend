import PublisherCard from "@/components/PublisherCard";
import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/publishers`)
      .then((res) => {
        setPublishers(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("An error occured. Please try again.");
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-20">
      <h1 className="text-center text-[20px] font-bold mb-10">Publishers</h1>
      <div className="grid grid-cols-4 gap-5">
        {publishers.map((publisher) => {
          return <PublisherCard key={publisher.publishername} publisher={publisher} />;
        })}
      </div>
    </main>
  );
}
