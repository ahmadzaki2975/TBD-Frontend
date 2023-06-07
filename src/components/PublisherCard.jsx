import Link from "next/link";

export default function PublisherCard({ publisher }) {
  return (
    <Link href={`/publisher/${publisher.publishername}`}>
      <div className="flex justify-center items-center flex-col text-white">
        <div className="bg-gradient-to-br from-red-400 to-yellow-500 aspect-square w-[120px] rounded-full grid place-items-center">
          <h1 className="text-center">{publisher.publishername}</h1>
        </div>
      </div>
    </Link>
  );
}
