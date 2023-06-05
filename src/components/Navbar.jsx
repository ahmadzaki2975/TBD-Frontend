import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between //absolute top-0 w-full bg-blue-500 py-4 px-5 text-white">
      <Link href="/">
        <div className="font-bold">BookstoreDB</div>
      </Link>
      <div className="flex gap-5">
        <Link href="/">Books</Link>
        <Link href="/author">Authors</Link>
        <Link href="/publisher">Publishers</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
