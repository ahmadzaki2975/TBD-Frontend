import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsCaretDownFill, BsX } from "react-icons/bs";
import { toast } from "react-toastify";

export default function BookDetailsAdminPage() {
  const router = useRouter();
  const [book, setBook] = useState({
    bookname: "",
    authorname: "",
    publishername: "",
    publicationyear: "",
    genres: [],
    pages: "",
    price: "",
    authorid: "",
  });
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {loading, setLoading} = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("isAuthenticated")) {
      {
        axios
          .get(`${apiUrl}/authors`)
          .then((res) => {
            setAuthors([{ authorname: "Select", authorid: "" }, ...res.data]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error("An error occured. Please try again.");
            setLoading(false);
          });

        axios
          .get(`${apiUrl}/publishers`)
          .then((res) => {
            setPublishers([
              {
                publishername: "Select",
              },
              ...res.data,
            ]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error("An error occured. Please try again.");
            setLoading(false);
          });

        axios
          .get(`${apiUrl}/genres`)
          .then((res) => {
            setGenres(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error("An error occured. Please try again.");
          });
      }
    } else {
      router.push("/admin");
      toast.error("Admin resources, access denied.");
    }
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen py-10">
      <div className="w-1/4">
        <form>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Book Name"
              value={book.bookname}
              onChange={(e) => setBook({ ...book, bookname: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </label>
            <div className="relative flex justify-center items-center">
              <select
                className="shadow appearance-none border rounded cursor-pointer w-full py-2 px-3 text-gray-700 bg-transparent relative z-[2]"
                onChange={(e) => {
                  setBook({ ...book, authorid: e.target.value });
                  setAuthors((prev) => {
                    return prev.filter((author) => author.authorid !== "");
                  });
                }}
              >
                {authors.map((author) => (
                  <option key={author.authorid} value={author.authorid}>
                    {author.authorname}
                  </option>
                ))}
              </select>
              <BsCaretDownFill className="absolute right-[10px] opacity-75" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publisher
            </label>
            <div className="relative flex justify-center items-center">
              <select
                className="shadow appearance-none border rounded cursor-pointer w-full py-2 px-3 text-gray-700 bg-transparent relative z-[2]"
                onChange={(e) => {
                  setBook({ ...book, publishername: e.target.value });
                  setPublishers((prev) => {
                    return prev.filter(
                      (publisher) => publisher.publishername !== "Select"
                    );
                  });
                }}
              >
                {publishers.map((publisher) => (
                  <option
                    key={publisher.publishername}
                    value={publisher.publishername}
                  >
                    {publisher.publishername}
                  </option>
                ))}
              </select>
              <BsCaretDownFill className="absolute right-[10px] opacity-75" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publication Year
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Publication Year"
              value={book.publicationyear}
              onChange={(e) =>
                setBook({ ...book, publicationyear: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pages
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Price"
              value={book.pages}
              onChange={(e) => setBook({ ...book, pages: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Price"
              value={book.price}
              onChange={(e) => setBook({ ...book, price: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Genres
            </label>
            <div className="flex flex-wrap gap-1 mb-2">
              {selectedGenres.map((genre) => {
                return (
                  <div
                    key={genre.genreid}
                    className="bg-blue-200 rounded-md px-2 py-1 flex items-center gap-1"
                  >
                    {genre.genrename}
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedGenres((prev) => {
                          return prev.filter(
                            (selectedGenre) =>
                              selectedGenre.genreid !== genre.genreid
                          );
                        });
                      }}
                    >
                      <BsX />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="relative flex justify-center items-center">
              <select
                className="shadow appearance-none border rounded cursor-pointer w-full py-2 px-3 text-gray-700 bg-transparent relative z-[2]"
                onChange={(e) => {
                  setSelectedGenres((prev) => {
                    if (prev.find((genre) => genre.genreid === e.target.value))
                      return prev;
                    return [
                      ...prev,
                      {
                        genreid: genres.find(
                          (genre) => genre.genrename === e.target.value
                        ).genreid,
                        genrename: e.target.value,
                      },
                    ];
                  });
                }}
                placeholder="Add genre here"
              >
                {genres.map((genre) => (
                  <option key={genre.genreid} value={genre.genrename}>
                    {genre.genrename}
                  </option>
                ))}
              </select>
              <BsCaretDownFill className="absolute right-[10px] opacity-75" />
            </div>
          </div>
        </form>

        <button
          className="w-full bg-green-400 py-2 mt-10 cursor-pointer hover:bg-green-500 rounded-md"
          onClick={() => {
            console.log({
              bookname: book.bookname,
              pages: book.pages,
              price: book.price,
              publicationyear: book.publicationyear,
              publishername: book.publishername,
              authorid: Number(book.authorid),
              genres: selectedGenres.map((genre) => genre.genreid),
            });
            axios
              .post(`${apiUrl}/books/add`, {
                bookname: book.bookname,
                pages: book.pages,
                price: book.price,
                publicationyear: book.publicationyear,
                publishername: book.publishername,
                authorid: Number(book.authorid),
                genres: selectedGenres.map((genre) => genre.genreid),
              })
              .then((res) => {
                alert("Book added successfully");
                router.push("/admin/books");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Add
        </button>
        <button
          className="w-full bg-blue-400 py-2 mt-5 cursor-pointer hover:bg-blue-500 rounded-md"
          onClick={() => router.push("/admin/books")}
        >
          &larr; Back
        </button>
      </div>
    </main>
  );
}
