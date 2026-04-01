"use client";

import TodoInput from "@/components/TodoInput";
import { useState } from "react";

export default function Todo() {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showTodoInput, setTodoInput] = useState<boolean>(false);
  function addTodo(): void {
    setShowButton(false);
    setTodoInput(true);
  }
  return (
    <div>
      <h1>this is todo page..!!</h1>
      {showButton && <button type="button" onClick={addTodo}> + Add Task</button>}
      {showTodoInput && (
        <TodoInput
          addButtonFunction={setShowButton}
          todoInputBoxDispaly={setTodoInput}
        />
      )}
    </div>
  );
}
