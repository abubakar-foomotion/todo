"use client";

import { useItemsStore } from "@/lib/store/todoStore";


export default function ItemsComponent() {
  const { items, addItem, updateItem, deleteItem } = useItemsStore();

  return (
    <div>
      <button
        onClick={() =>
          addItem({
            id: Date.now(),
            heading: "New Item",
            description: "Some description",
          })
        }
      >
        Add Item
      </button>

      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.heading}</h3>
          <p>{item.description}</p>

          <button
            onClick={() =>
              updateItem(item.id, { heading: "Updated Heading" })
            }
          >
            Update
          </button>

          <button onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}