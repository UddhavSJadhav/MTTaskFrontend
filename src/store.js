import { create } from "zustand";

const useStore = create((set) => ({
  auth: false,
  setAuth: (user) => set(() => ({ auth: user })),
  logOut: () => set(() => ({ auth: false })),
}));

export default useStore;
