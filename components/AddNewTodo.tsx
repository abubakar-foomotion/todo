"use client";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { text } from "stream/consumers";

interface TodoInput1props {
  description: string;
  heading: string;
  onClickFunction: (head: string, descrip: string) => void;
}

export default function AddNewTodo({
  description,
  heading,
  onClickFunction,
}: TodoInput1props) {
  const [descrip, setDiscrip] = useState<string>(description);
  const [head, setHead] = useState<string>(heading);

  return (
    <form className="inset-shadow-sm inset-shadow-indigo-500 rounded-lg p-2 m-4 bg-[#FFFFFF] sm:flex sm:justify-between sm:p-8 sm:">
      <div className="sm:w-1/2">
        <h3>write Heading</h3>
        <input
          type="text"
          placeholder="HEADING"
          value={head}
          onChange={(e) => setHead(e.target.value)}
          className="p-1 inset-shadow-sm inset-shadow-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent w-full"
        />
        <h3>write Description</h3>
        <input
          type="text"
          placeholder="DESCRIPTION"
          value={descrip}
          onChange={(e) => setDiscrip(e.target.value)}
          className="p-1 inset-shadow-sm inset-shadow-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent w-full"
        />
      </div>
      <button
        type="button"
        onClick={() => (onClickFunction(head, descrip),setDiscrip(""),setHead(""))}
        className="mt-4 text-xl sm:text-3xl"
      >
        &#9989;
      </button>
    </form>
  );
}
