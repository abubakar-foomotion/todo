"use client";
import { deleteTodo } from "@/services/todos";
import Image from "next/image";

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
    <div className="rounded-lg p-2  flex justify-between bg-[#FFFFFF] shadow-2xl">
      <div className="p-4">
        <h3 className="text-2xl sm:text-xl font-bold italic">{heading}</h3>
        <p>{description}</p>
      </div>
      <div>
        <div className="flex gap-2 items-center justify-between h-full w-17 mr-8 ">
          <div className="w-6 h-6 hover:bg-[#FAFAFA]">
            <Image
              src="/edit.png"
              alt="Company Logo"
              width={100}
              height={100}
              onClick={() => updateFunction(id)}
            />
            </div>
          <span
            onClick={async () => {
              await deleteTodo(id);
              deleteFunction(id);
            }}
          >
            &#10060;
          </span>
        </div>
      </div>
    </div>
  );
}
