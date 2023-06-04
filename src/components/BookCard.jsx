export default function BookCard({ book }) {
  return (
    <a href={`/book/${book.bookid}`} className="w-full block cursor-pointer">
      <div className="relative w-full aspect-[3/4] h-[250px] bg-gradient-to-br from-violet-500 to-blue-500">
        <div className="absolute bottom-0 bg-gradient-to-b from-transparent from-[20%] to-white/90 w-full pt-10 px-2 pb-1">
          <h1 className="text-/center font-bold">{book.bookname}</h1>
          {/* <h2>ID: {book.bookid}</h2> */}
          <h2>{book.authorname}</h2>
          {/* <h2>Publisher: {book.publishername}</h2> */}
          <h2>{book.price}$</h2>
        </div>
      </div>
    </a>
  );
}
