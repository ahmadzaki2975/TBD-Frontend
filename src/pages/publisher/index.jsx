import PublisherCard from "@/components/PublisherCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/publishers`)
      .then((res) => {
        setPublishers(res.data);
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-center text-[20px] font-bold mb-10">Publishers</h1>
      <div className="grid grid-cols-4 gap-5">
        {publishers.map((publisher) => {
          return <PublisherCard key={publisher.id} publisher={publisher} />;
        })}
      </div>
    </main>
  );
}
