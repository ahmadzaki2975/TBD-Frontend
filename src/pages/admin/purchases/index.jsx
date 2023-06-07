import { LoadingContext } from "@/contexts/LoadingContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

export default function AdminBookPage() {
  const [purchases, setPurchases] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [refresh, setRefresh] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("isAuthenticated")) {
      axios
        .get(`${apiUrl}/purchases`)
        .then((res) => {
          console.log(res.data);
          setPurchases(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // alert("Error. Make sure the API is running.");
        });
    } else {
      router.push("/admin");
      toast.error("Admin resources, access denied.");
    }
  }, [refresh]);

  return (
    <main className="min-h-screen py-20 relative">
      <h1 className="text-center text-[20px] font-bold mb-5">Admin - Stores</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchKey === "") {
            setRefresh(!refresh);
          } else {
            const result = purchases.filter(
              (purchase) =>
                purchase.bookname
                  .toLowerCase()
                  .includes(searchKey.trim().toLowerCase()) ||
                purchase.customername
                  .toLowerCase()
                  .includes(searchKey.trim().toLowerCase())
            );
            setPurchases(result);
          }
        }}
        className="flex w-fit mx-auto mb-5"
      >
        <input
          type="text"
          className="outline outline-1 rounded-l-md px-2 py-1"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit" className="outline outline-1 px-2 rounded-r-md">
          <BsSearch />
        </button>
      </form>
      <div className="flex flex-col gap-5 w-1/2 mx-auto">
        {purchases.map((purchase) => (
          <BookCard key={purchase.orderid} customer={purchase} />
        ))}
      </div>
    </main>
  );
}

function BookCard({ customer: purchase }) {
  return (
    <div className="p-2 outline outline-black bg-white cursor-pointer rounded-md transition hover:drop-shadow-[0_0_5px_rgba(0,0,0,.9)]">
      <h1 className="font-bold">Order ID: {purchase.orderid}</h1>
      <h2 className="font-semibold">Ordered By</h2>
      <p>{purchase.customername}</p>
      <hr className="my-1" />
      <h2 className="font-semibold">Book Ordered</h2>
      <p>{purchase.bookname}</p>
      <hr className="my-1" />
      <h2 className="font-semibold">Quantity</h2>
      <p>{purchase.quantity}</p>
      <hr className="my-1" />
      <h2 className="font-semibold">Total Price</h2>
      <p>{purchase.totalprice}</p>
      {/* <hr className="my-1" />
      <h2 className="font-semibold">Order Date</h2>
      <p>{purchase.boughtat}</p> */}
    </div>
  );
}
