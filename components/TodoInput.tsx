"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { useItemsStore } from "@/lib/store/todoStore";

interface TodoInput1props {
  addButtonFunction: Dispatch<SetStateAction<boolean>>;
  todoInputBoxDispaly: Dispatch<SetStateAction<boolean>>;
  addTodoFunction: Dispatch<SetStateAction<Todo[]>>;
}
interface Todo {
  heading: string;
  description: string;
}
export default function TodoInput({
  addButtonFunction,
  todoInputBoxDispaly,
  addTodoFunction,
}: TodoInput1props) {
  //START OF THE FUNCTION
  const { addItem } = useItemsStore();
  const headingRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  //EVENT HANDLER
  function showFurther(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const heading = headingRef.current?.value ?? "";
    const description = descriptionRef.current?.value ?? "";
    // addTodoFunction((prev: Todo[]) => [
    //   ...prev,
    //   { heading: heading, description: description },
    // ]);
    addItem({
      id: Date.now(),
      heading : heading,
      description:description,
    });
    todoInputBoxDispaly(false);
    addButtonFunction(true);
  }

  //COMPONENT JSX
  return (
    <div>
      <form>
        <h3>write Heading</h3>
        <input type="text" placeholder="HEADING" ref={headingRef} />
        <h3>write Description</h3>
        <input type="text" placeholder="DESCRIPTION" ref={descriptionRef} />
        <br />
        <button type="button" onClick={showFurther}>
          ADD
        </button>
      </form>
    </div>
  );
}
