"use client";

import React from "react";
export default function CustomButton({onClickFunction,text} : {onClickFunction: (e: React.MouseEvent<HTMLButtonElement>) => void ,text:string}) {
    return(
           <button
          type="button"
          onClick={onClickFunction}
          className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-24"
        >
          {" "}
          {text}
        </button>
    )
}