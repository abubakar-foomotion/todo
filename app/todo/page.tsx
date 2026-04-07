"use client";
import TodoInput from "@/components/TodoInput";
import TodoCard from "@/components/TodoCard";
import { useEffect, useState } from "react";
import { useItemsStore } from "@/lib/store/todoStore";
import {
  getAllTodos,
  updateTodo,
  addTodoApiCall,
  deleteTodo,
} from "@/services/todos";
import { useUserStore } from "@/lib/store/userStore";
import CustomButton from "@/components/CustomButton";
import AddNewTodo from "@/components/AddNewTodo";
import toast from "react-hot-toast";
import Image from "next/image";

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
      {/* //DISPLAY UPDATE TODO AND ADD NEW TODO */}
      <div>
        <form className="border border-gray-400 rounded-lg p-2 m-4 bg-[#FFFFFF]">
          <h3>write Heading</h3>
          <input
            type="text"
            placeholder="HEADING"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="p-1 border rounded-md w-full"
          />
          <h3>write Description</h3>
          <input
            type="text"
            placeholder="DESCRIPTION"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-1 border rounded-md w-full"
          />
          <br />
          <button
            type="button"
            onClick={async () => {
              if (udpdateId !== "") {
                updateItem(udpdateId, { heading, description });
                await updateTodo(udpdateId, description, heading);
                setDescription("");
                setHeading("");
                setUdpateId("");
              } else {
                if (heading.length > 0 && description.length > 0) {
                  const { id } = await addTodoApiCall(
                    userId,
                    heading,
                    description,
                  );
                  addItem({ id, heading, description });
                  setDescription("");
                  setHeading("");
                  toast.success("TODO ADDED SUCCESSFULLYYY..!!!");
                } else {
                  toast.error("PLEASE WRITE SOMETHING..!!");
                }
              }
            }}
            className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-20 bg-[#918cf7]"
          >
            {udpdateId === "" ? "ADD" : "UPDATE"}
          </button >
          {udpdateId !== "" && (
            <button
              onClick={() => {
                setUdpateId("");
                setDescription("");
                setHeading("");
              }}
              className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-20 bg-[#918cf7]"
              
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      {/* //DISPLAYYING LIST OF TODOS */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 gap-4 p-4">
          {items.map(({ heading, description, id }) => {
            return (
              <div className="rounded-lg p-2  flex justify-between bg-[#FFFFFF] shadow-2xl">
                <div className="p-4">
                  <h3 className="text-2xl sm:text-xl font-bold italic">
                    {heading}
                  </h3>
                  <p>{description}</p>
                </div>
                <div>
                  <div className="flex gap-2 items-center justify-between h-full w-17 mr-8 ">
                    <div className="w-6 h-6 hover:bg-[#FAFAFA] cursor-pointer">
                      <Image
                        src="/edit.png"
                        alt="Company Logo"
                        width={100}
                        height={100}
                        onClick={() => {
                          //EDIT FUNCTION
                          setHeading(heading);
                          setDescription(description);
                          setUdpateId(id);
                        }}
                      />
                    </div>
                    <span
                      onClick={async () => {
                        //DELETE FUNCTION

                        await deleteTodo(id);
                        deleteItem(id);
                      }}
                      className="cursor-pointer"
                    >
                      &#10060;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
