import { LoadingContext } from "@/contexts/LoadingContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Admin() {
  const password = "apcb1234";
  const [input, setInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setLoading }  = useContext(LoadingContext);

  useEffect(() => { 
    if (localStorage.getItem("isAuthenticated")) {
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, [])

  return (
    <main className="min-h-screen py-20">
      <h1 className="text-center text-[20px] font-bold mb-10">Admin</h1>
      {isAuthenticated ? (
        <div className="grid grid-cols-4 gap-5 mx-[20%]">
          <MenuItem text="Books" link="books" />
          <MenuItem text="Authors" link="authors" />
          <MenuItem text="Publishers" link="publishers" />
          <MenuItem text="Staffs" link="staffs" />
          <MenuItem text="Customers" link="customers" />
          <MenuItem text="Purchases" link="purchases" />
          <MenuItem text="Stores" link="stores" />
          <MenuItem text="SQL Injection Simulator" link="sql"/>
        </div>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          if (input === password) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", true);
          } else {
            toast.error("Password salah!");
          }
        }} className="max-w-[500px] mx-auto">
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
              Enter Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button type="submit" className="mt-2 text-center w-full hover:bg-blue-400 bg-blue-500 text-white py-2 rounded-md">
            Log In
          </button>
        </form>
      )}
    </main>
  );
}

function MenuItem({ text, link }) {
  return (
    <Link href={`/admin/${link}`}>
      <div className="px-5 aspect-square grid place-items-center outline outline-black bg-white cursor-pointer rounded-md transition hover:drop-shadow-[0_0_5px_rgba(0,0,0,.9)]">
        <h1 className="text-center">{text}</h1>
      </div>
    </Link>
  );
}
