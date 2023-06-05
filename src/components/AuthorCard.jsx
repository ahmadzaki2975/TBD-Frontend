import { BsPersonFill } from "react-icons/bs";

export default function AuthorCard({ author }) {
  return (
    <div className="w-fit">
      <div className="h-[250px] relative grid place-items-center aspect-[3/4] bg-gradient-to-tr from-green-500 to-yellow-300">
        <BsPersonFill className="absolute text-white text-[50px]" />
        <div className="absolute bottom-0 bg-gradient-to-b from-transparent from-[30%] to-white/90 w-full pt-10 px-2 pb-1">
          <h1 className="font-semibold text-center">{author.authorname}</h1>
        </div>
      </div>
    </div>
  );
}
