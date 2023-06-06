export default function PublisherCard({ publisher }) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="bg-gradient-to-br from-red-400 to-yellow-500 aspect-square w-[120px] rounded-full grid place-items-center">
        <h1 className="text-center">{publisher.publishername}</h1>
      </div>
    </div>
  );
}
