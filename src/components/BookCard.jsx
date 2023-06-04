export default function BookCard({ book }) {
  return(
    <div className="w-full">
      <div className="aspect-[3/4] bg-gradient-to-br from-violet-500 to-blue-500"></div>
      <h1 className="text-/center font-bold">{book.bookname}</h1>
      <h2>ID: {book.bookid}</h2>
      <h2>Release: {book.publicationyear}</h2>
      <h2>Publisher: {book.publisher}</h2>
      <h2>Pages: {book.pages}</h2>
      <h2>Price: {book.price}$</h2>

    </div>
  )
}