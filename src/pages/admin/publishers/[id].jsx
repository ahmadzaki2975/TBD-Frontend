import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookDetailsAdminPage() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, setLoading } = useContext(LoadingContext);
  const [publisher, setPublisher] = useState({
    publishername: "",
    city: "",
    country: "",
    phone: "",
    yearfoundation: "",
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);
    if (id && localStorage.getItem("isAuthenticated")) {
      axios
        .get(`${apiUrl}/publishers/${id}`)
        .then((res) => {
          setPublisher(res.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred.");
          setLoading(false);
        });
    } else {
      router.push("/admin");
      toast.error("Admin resources, access denied.");
      setLoading(false);
    }
  }, [id]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="w-1/4">
        <form>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publisher Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Book Name"
              value={publisher.publishername}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, bookname: e.target.value })
              // }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Book Name"
              value={publisher.city}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, bookname: e.target.value })
              // }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Year Born"
              value={publisher.country}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, yearborn: e.target.value })
              // }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Year Died"
              value={publisher.phone}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, yeardied: e.target.value })
              // }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Year of Foundation
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Year Died"
              value={publisher.yearfounded}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, yeardied: e.target.value })
              // }
            />
          </div>
        </form>
        <button
          className="w-full bg-red-400 py-2 mt-5 cursor-pointer hover:bg-red-500 rounded-md"
          onClick={() => {
            axios.delete(`${apiUrl}/publishers/delete/${id}`).then((res) => {
              toast.success("Publisher deleted successfully.");
              router.push("/admin/publishers");
            })
            .catch((err) => {
              console.log(err);
              toast.error("An error occurred.");
            });
          }}
        >
          Delete
        </button>
        <button
          className="w-full bg-blue-400 py-2 mt-5 cursor-pointer hover:bg-blue-500 rounded-md"
          onClick={() => router.push("/admin/publishers")}
        >
          &larr; Back
        </button>
      </div>
    </main>
  );
}
