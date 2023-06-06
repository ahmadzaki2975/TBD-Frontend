import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewAuthor() {
  const router = useRouter();
  const [author, setAuthor] = useState({
    authorname: "",
    authorid: "",
    yearborn: "",
    yeardied: "",
  });
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Author Name"
              value={author.authorname}
              onChange={(e) =>
                setAuthor({ ...author, authorname: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Year of Birth
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Year of Birth"
              value={author.yearborn}
              onChange={(e) =>
                setAuthor({ ...author, yearborn: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Year of Death
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Year of Death"
              value={author.yeardied}
              onChange={(e) => setAuthor({ ...author, yeardied: e.target.value })}
            />
          </div>
        </form>

        <button
          className="w-full bg-green-400 py-2 mt-10 cursor-pointer hover:bg-green-500 rounded-md"
          onClick={() => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            console.log({
              authorname: author.authorname,
              yearborn: Number(author.yearborn),
              yeardied: Number(author.yeardied),
            })
            axios
              .post(`${apiUrl}/authors/add`, {
                authorname: author.authorname,
                yearborn: Number(author.yearborn),
                yeardied: Number(author.yeardied),
              })
              .then((res) => {
                toast.success("Author added successfully");
                router.push("/admin/authors");
              })
              .catch((err) => {
                toast.error("An error occured.");
                console.log(err);
              });
          }}
        >
          Add
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
