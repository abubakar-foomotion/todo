"use client";

import { useState } from "react";


interface TodoInput1props {
  description: string;
  heading: string;
  onClickFunction: (head : string, descrip: string) => void;
}

export default function TodoInput({
  description,
  heading,
  onClickFunction,
}: TodoInput1props) {
  //START OF THE FUNCTION

  const [descrip,setDiscrip] = useState<string>(description);
  const [head,setHead] = useState<string>(heading);

  //COMPONENT JSX
  return (
    <div>
      <form className="border border-gray-400 rounded-lg p-2 m-4 bg-gray-200">
        <h3>write Heading</h3>
        <input
          type="text"
          placeholder="HEADING"
          // ref={headingRef}
          value={head}
          onChange={(e)=>setHead(e.target.value)}
          className="p-1 border rounded-md"
        />
        <h3>write Description</h3>
        <input
          type="text"
          placeholder="DESCRIPTION"
          value={descrip}
          onChange={(e) => setDiscrip(e.target.value)}
          className="p-1 border rounded-md"
        />
        <br />
        <button type="button" onClick={() => onClickFunction(head, descrip)} className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-20">
          ADD
        </button>
      </form>
    </div>
  );
}
