"use client";

import { Dispatch, SetStateAction } from "react";
interface TodoInput1props {
  addButtonFunction: Dispatch<SetStateAction<boolean>>;
  todoInputBoxDispaly: Dispatch<SetStateAction<boolean>>;
}
export default function TodoInput({
  addButtonFunction,
  todoInputBoxDispaly,
}: TodoInput1props) {
  function showFurther(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    todoInputBoxDispaly(false);
    addButtonFunction(true);
  }
  return (
    <div>
      <form>
        <h3>write Heading</h3>
        <input type="text" placeholder="HEADING"/>
        <h3>write Description</h3>
        <input type="text" placeholder="DESCRIPTION"/>
        <br />
        <button type="button" onClick={showFurther}>
          ADD
        </button>
      </form>
    </div>
  );
}
