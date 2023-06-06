import axios from "axios";
import { useEffect, useState } from "react";

export default function FreeSQL() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${apiUrl}/sql`, { query })
      .then((res) => {
        setResult(JSON.stringify(res.data));
      })
      .catch((err) => {
        setResult(JSON.stringify(err));
      });
  }

  return (
    <main className="min-h-screen py-20 relative">
      <h1 className="text-center text-[20px] font-bold mb-5">
        Admin - Free SQL
      </h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="max-w-[600px] mx-auto"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
            SQL Query
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="SQL Query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-500 cursor-pointer rounded-md py-2"
          >
            SEND
          </button>
        </div>
      </form>
      <h1 className="text-center mt-10">RESULT</h1>
      <p className="max-w-[600px] p-5 mx-auto outline outline-1 rounded-md min-h-[200px]">
        {result}
      </p>
    </main>
  );
}
