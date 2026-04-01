"use client";

import TodoInput from "@/components/TodoInput";
import { useState } from "react";
import { useItemsStore } from "@/lib/store/todoStore";

interface TodoObj {
  heading: string;
  description: string;
}

export default function Todo() {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showTodoInput, setTodoInput] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoObj[]>([]);
  const [heading, setHeading] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //EVENT HANDLER
  function addTodo(): void {
    setShowButton(false);
    setTodoInput(true);
  }

  //delete todo function
  function deleteTodo(index : number) : void {
    const newTodos = todos.filter(todo => todos.indexOf(todo) !== index);
    setTodos(newTodos);
  }

  //UPDATE TODO FUNCTION
  function updateTodo(index:number) : void {
    setTodoInput(true);
  }
   const { items } = useItemsStore();
  // COMPONENT JSX
  return (
    <div>
      <h1 className="bg-black-200">this is todo page..!!</h1>
      {/* {todos.length > 0 && (
        <div>
          {todos.map(({ heading, description }, index) => (
            <div className="border border-blue-400 p-2 m-4" key={index}>
            
              <h3>{heading}</h3>
              <p>{description}</p>
              <p onClick={()=> updateTodo(index)}>UPDATE.!</p>
              <span onClick={() => deleteTodo(index)}>&#10060;</span>
            </div>
          ))}
        </div>
      )} */}
      {items.length > 0 && (
        <div>
          {items.map(({ heading, description }, index) => (
            <div className="border border-blue-400 p-2 m-4" key={index}>
            
              <h3>{heading}</h3>
              <p>{description}</p>
              <p onClick={()=> updateTodo(index)}>UPDATE.!</p>
              <span onClick={() => deleteTodo(index)}>&#10060;</span>
            </div>
          ))}
        </div>
      )}

      {/* //BUTTON TO SHOW TODO INPUT */}
      {showButton && (
        <button type="button" onClick={addTodo}>
          {" "}
          + Add Task
        </button>
      )}

      {/* //TODO INPUT COMPONENT */}
      {showTodoInput && (
        <TodoInput
          addButtonFunction={setShowButton}
          todoInputBoxDispaly={setTodoInput}
          addTodoFunction={setTodos}
        />
      )}
    </div>
  );
}
