"use client";

interface TodoCardProps {
  id: string;
  heading: string;
  description: string;
  deleteFunction: (id: string) => void;
  updateFunction: (id: string) => void;
}

export default function TodoCard({
  id,
  heading,
  description,
  deleteFunction,
  updateFunction,
}: TodoCardProps) {
  return (
    <div className="border border-gray-400 rounded-lg p-2 bg-gray-200 ">
      <div className="border p-4 rounded-lg shadow-xl">
        <h3 className="text-2xl sm:text-4xl font-extrabold italic">HEADING : {heading}</h3>
        <p>DESSCRIPTION : {description}</p>
      </div>
      <p
        onClick={() => updateFunction(id)}
        className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-20 hover:bg-sky-200"
      >
        UPDATE
      </p>
      <span
        onClick={async () => {
          //
          deleteFunction(id);
        }}
      >
        &#10060;
      </span>
    </div>
  );
}
