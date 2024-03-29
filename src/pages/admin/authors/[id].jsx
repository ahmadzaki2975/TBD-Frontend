import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookDetailsAdminPage() {
  const router = useRouter();
  const { id } = router.query;
  const [author, setAuthor] = useState({
    authorname: "",
    authorid: "",
    yearborn: "",
    yeardied: "",
  });
  const { loading, setLoading } = useContext(LoadingContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);
    if (id && localStorage.getItem("isAuthenticated")) {
      axios
        .get(`${apiUrl}/authors/${id}`)
        .then((res) => {
          setAuthor(res.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // alert("Error. Make sure the API is running.");
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
              Author Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Book Name"
              value={author.authorname}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, bookname: e.target.value })
              // }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author ID
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Book Name"
              value={author.authorid}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, bookname: e.target.value })
              // }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Year Born
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Year Born"
              value={author.yearborn}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, yearborn: e.target.value })
              // }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Year Died
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              placeholder="Year Died"
              value={author.yeardied == null ? "" : author.yeardied}
              disabled
              // onChange={(e) =>
              //   setAuthor({ ...author, yeardied: e.target.value })
              // }
            />
          </div>
        </form>

        {/* <button
          className="w-full bg-green-400 py-2 mt-10 cursor-pointer hover:bg-green-500 rounded-md"
          onClick={() => {
            axios
              .post(`${apiUrl}/books/update/${id}`, author)
              .then((res) => {
                alert("Book updated successfully");
                router.push("/admin/books");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Update
        </button> */}
        <button
          className="w-full bg-red-400 py-2 mt-5 cursor-pointer hover:bg-red-500 rounded-md"
          onClick={() => {
            axios
              .delete(`${apiUrl}/authors/delete/${id}`)
              .then((res) => {
                toast.success("Author deleted successfully");
                router.push("/admin/authors");
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
          onClick={() => router.push("/admin/authors")}
        >
          &larr; Back
        </button>
      </div>
    </main>
  );
}
