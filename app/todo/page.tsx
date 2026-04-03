"use client";

import TodoInput from "@/components/TodoInput";
import { useEffect, useState } from "react";
import { useItemsStore } from "@/lib/store/todoStore";
import { getAllTodos, updateTodo, addTodoApiCall } from "@/services/todos";
import { useUserStore } from "@/lib/store/userStore";

export default function Todo() {
  //STATES
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showTodoInput, setTodoInput] = useState<boolean>(false);
  const [udpdateId, setUdpateId] = useState<string>("");
  const { userId } = useUserStore();

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
      const res = await getAllTodos(userId);
      setItems(res);
    }
    fetchData();
  }, []);
  // COMPONENT JSX
  return (
    <div>
      <h1 className="font-bold text-center text-2xl">
        this is todo Application..!!
      </h1>

      {/* NEWER VERSION */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {items.map(({ heading, description, id }) => {
            if (id === udpdateId) {
              return (
                <TodoInput
                  key={id}
                  heading={heading}
                  description={description}
                  onClickFunction={async (head, descrip) => {
                    await updateTodo(id, head, descrip);
                    updateItem(id, { heading: head, description: descrip });
                    setUdpateId("");
                  }}
                />
              );
            }
            return (
              <div
                className="border border-gray-400 rounded-lg p-2 bg-gray-200 "
                key={id}
              >
                <h3>{heading}</h3>
                <p>{description}</p>
                <p
                  onClick={() => setUdpateId(id)}
                  className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-20"
                >
                  UPDATE
                </p>
                <span
                  onClick={async () => {
                    //
                    deleteItem(id);
                  }}
                >
                  &#10060;
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* //BUTTON TO SHOW TODO INPUT */}
      {showButton && (
        <button
          type="button"
          onClick={addTodo}
          className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-24"
        >
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
            const res = await addTodoApiCall(userId, head, descrip);
            addItem({ id: res.id, heading: head, description: descrip });
            setShowButton(true);
            setTodoInput(false);
          }}
        />
      )}
    </div>
  );
}
