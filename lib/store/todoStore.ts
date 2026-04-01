import { create } from "zustand";

export interface Item {
  id: number;
  heading: string;
  description: string;
}

interface ItemsState {
  items: Item[];

  // actions
  addItem: (item: Item) => void;
  updateItem: (id: number, updatedItem: Partial<Item>) => void;
  deleteItem: (id: number) => void;
  setItems: (items: Item[]) => void;
}

export const useItemsStore = create<ItemsState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setItems: (items) => set({ items }),
}));