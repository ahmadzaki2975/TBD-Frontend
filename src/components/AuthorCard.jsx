export default function AuthorCard({ author }) {
  return (
    <div className="w-fit">
      <div className="h-[250px] relative aspect-[3/4] bg-red-500">
        <div className="absolute bottom-0 bg-gradient-to-b from-transparent from-[30%] to-white/90 w-full pt-10 px-2 pb-1">
          <h1 className="font-semibold text-center">{author.authorname}</h1>
        </div>
      </div>
    </div>
  );
}
