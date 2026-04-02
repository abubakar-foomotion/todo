"use client";

import TodoInput from "@/components/TodoInput";
import { useState } from "react";
import { useItemsStore } from "@/lib/store/todoStore";
import { uuid } from "drizzle-orm/gel-core";



export default function Todo() {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showTodoInput, setTodoInput] = useState<boolean>(false);
 
  const [udpdateId, setUdpateId] = useState<number>(-1);

  //EVENT HANDLER
  function addTodo(): void {
    setShowButton(false);
    setTodoInput(true);
  }

 
  const { items, deleteItem, addItem, updateItem } = useItemsStore();
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
                  onClickFunction={(head, descrip) => (
                    updateItem(id, { heading: head, description: descrip }),
                    setUdpateId(-1)
                  )}
                />
              );
            }
            return (
              <div className="border border-blue-400 p-2 m-4" key={id}>
                <h3>{heading}</h3>
                <p>{description}</p>
                <p onClick={() => setUdpateId(id)}>UPDATE.!</p>
                <span onClick={() => deleteItem(id)}>&#10060;</span>
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
          // onClickFunction={(head, descrip) => (
          //   addItem({ id: Date.now(), heading: head, description: descrip }),
          //   setShowButton(true),
          //   setTodoInput(false)
          // )}
          onClickFunction={(head, descrip) => {
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
