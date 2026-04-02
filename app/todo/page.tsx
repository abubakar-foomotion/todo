"use client";

import TodoInput from "@/components/TodoInput";
import { useEffect, useState } from "react";
import { useItemsStore } from "@/lib/store/todoStore";
import { uuid } from "drizzle-orm/gel-core";
import { getAllTodos } from "@/services/todos";

export default function Todo() {
  //STATES
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showTodoInput, setTodoInput] = useState<boolean>(false);
  const [udpdateId, setUdpateId] = useState<number>(-1);

  //EVENT HANDLER
  function addTodo(): void {
    setShowButton(false);
    setTodoInput(true);
  }
  //ACCESSING THE TODO STORE
  const { items, deleteItem, addItem, updateItem, setItems } = useItemsStore();

  //GETTING THE TODO ITEMS FROM DB ON RENDER
  useEffect(() => {
    async function fetchData() {
      const res = await getAllTodos();
      setItems(res);
    }
    fetchData();
  }, []);
  // COMPONENT JSX
  return (
    <div>
      <h1 className="bg-black-200">this is todo page..!!</h1>

      {/* NEWER VERSION */}
      {items.length > 0 && (
        <div>
          {items.map(({ heading, description, id }) => {
            if (id === udpdateId) {
              return (
                <TodoInput
                  key={id}
                  heading={heading}
                  description={description}
                  onClickFunction={(head, descrip) => {

                    updateItem(id, { heading: head, description: descrip });
                    setUdpateId(-1);
                  }}
                />
              );
            }
            return (
              <div className="border border-blue-400 p-2 m-4" key={id}>
                <h3>{heading}</h3>
                <p>{description}</p>
                <p onClick={() => setUdpateId(id)}>UPDATE.!</p>
                <span onClick={async () => {
                  await fetch("/api/todo", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: id,
                    }),
                  }); 
                  deleteItem(id);
                  }}>&#10060;</span>
              </div>
            );
          })}
        </div>
      )}

      {/* //BUTTON TO SHOW TODO INPUT */}
      {showButton && (
        <button type="button" onClick={addTodo}>
          {" "}
          + Add Task
        </button>
      )}

      {/* //TODO INPUT COMPONENT FOR NEW ENTRY*/}
      {showTodoInput && (
        <TodoInput
          description=""
          heading=""
          onClickFunction={async (head, descrip) => {
            //TODO: REPLACE THE HARDCODED USERID WITH DYNAMIC ONE
            const userId = "d94ae1d3-8f9a-4699-a761-b4eabee29a48";
            await fetch("/api/todo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: userId,
                heading: head,
                description: descrip,
              }),
            });
            addItem({ id: Date.now(), heading: head, description: descrip });
            setShowButton(true);
            setTodoInput(false);
          }}
        />
        // />
      )}
    </div>
  );
}
