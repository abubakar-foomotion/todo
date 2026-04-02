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
      <form>
        <h3>write Heading</h3>
        <input
          type="text"
          placeholder="HEADING"
          // ref={headingRef}
          value={head}
          onChange={(e)=>setHead(e.target.value)}
        />
        <h3>write Description</h3>
        <input
          type="text"
          placeholder="DESCRIPTION"
          // ref={descriptionRef}
          value={descrip}
          onChange={(e) => setDiscrip(e.target.value)}
        />
        <br />
        <button type="button" onClick={() => onClickFunction(head, descrip)}>
          ADD
        </button>
      </form>
    </div>
  );
}
