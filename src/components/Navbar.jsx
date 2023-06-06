import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);

  return (
    <nav className="flex justify-between items-center //absolute top-0 w-full bg-blue-500 py-4 px-5 text-white">
      <Link href="/">
        <div className="font-bold text-[20px]">Good Reading Bookstore</div>
      </Link>
      <div className="flex gap-5">
        <Link className={pathname == "/" ? "underline underline-offset-4" : ""} href="/">Books</Link>
        <Link className={pathname == "/author" ? "underline underline-offset-4" : ""} href="/author">Authors</Link>
        <Link className={pathname == "/publisher" ? "underline underline-offset-4" : ""} href="/publisher">Publishers</Link>
        <Link className={pathname.includes("/admin") ? "underline underline-offset-4" : ""} href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
