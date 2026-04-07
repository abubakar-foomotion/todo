"use client";
import TodoInput from "@/components/TodoInput";
import TodoCard from "@/components/TodoCard";
import { useEffect, useState } from "react";
import { useItemsStore } from "@/lib/store/todoStore";
import { getAllTodos, updateTodo, addTodoApiCall } from "@/services/todos";
import { useUserStore } from "@/lib/store/userStore";
import CustomButton from "@/components/CustomButton";
import AddNewTodo from "@/components/AddNewTodo";
import toast from "react-hot-toast";

export default function Todo() {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showTodoInput, setTodoInput] = useState<boolean>(false);
  const [udpdateId, setUdpateId] = useState<string>("");
  const { userId } = useUserStore();
  const { items, deleteItem, addItem, updateItem, setItems } = useItemsStore();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  function addTodo(): void {
    setShowButton(false);
    setTodoInput(true);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getAllTodos(userId);
      setItems(res);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-center text-4xl">TODOLOGYY</h1>
      <AddNewTodo
        heading={heading}
        description={description}
        onClickFunction={async (heading: string, description: string) => {
          if (heading.length > 0 && description.length > 0) {
            const res = await addTodoApiCall(userId, heading, description);
            addItem({ id: res.id, heading: heading, description: description });
            toast.success("TODO has been written successfully 🎉");
          }
          else {
            toast.error("please write something.!!")
          }
        }}
      />
      {items.length > 0 && (
        <div className="grid grid-cols-1 gap-4 p-4">
          {items.map(({ heading, description, id }) => {
            if (id === udpdateId) {
              return (
                <TodoInput
                  key={id}
                  heading={heading}
                  description={description}
                  onClickFunction={async (head, descrip) => {
                    const updatedData = await updateTodo(id, head, descrip);
                    const { description, heading } = updatedData;
                    updateItem(id, {
                      heading: heading,
                      description: description,
                    });
                    setUdpateId("");
                  }}
                />
              );
            }
            return (
              <TodoCard
                key={id}
                id={id}
                heading={heading}
                description={description}
                deleteFunction={(id: string) => deleteItem(id)}
                updateFunction={(id: string) => setUdpateId(id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
