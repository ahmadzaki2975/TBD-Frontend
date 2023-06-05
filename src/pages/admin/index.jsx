import Link from "next/link";

export default function Admin() {
  return (
    <main className="min-h-screen py-20">
      <h1 className="text-center text-[20px] font-bold mb-10">Admin</h1>
      <div className="grid grid-cols-4 gap-5 mx-[20%]">
        <MenuItem text="Books" />
        <MenuItem text="Authors" />
        <MenuItem text="Publishers" />
        <MenuItem text="Staffs" />
        <MenuItem text="Customers" />
        <MenuItem text="Orders" />
        <MenuItem text="Stores" />
        <MenuItem text="Genres" />
      </div>
    </main>
  );
}

function MenuItem({ text }) {
  return (
    <Link href={`/admin/${text.toLowerCase()}`}>
      <div className="aspect-square grid place-items-center outline outline-black bg-white cursor-pointer rounded-md transition hover:drop-shadow-[0_0_5px_rgba(0,0,0,.9)]">
        {text}
      </div>
    </Link>
  );
}
