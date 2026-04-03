import { create } from "zustand";

interface userState {
    userId: string;
    setId : (id:string) => void;
}

export const useUserStore = create<userState>((set) => ({
    userId : "",
    setId : (id :string) => set({userId : id}),
}))