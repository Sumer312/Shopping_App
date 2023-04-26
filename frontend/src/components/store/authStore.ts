import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export enum authEnum {
  SELLER = "seller",
  CONSUMER = "consumer",
  GUEST = "guest",
}

interface authType {
  role: authEnum;
  changeRoleToSeller: () => void;
  changeRoleToConsumer: () => void;
}

const useAuthStore = create<authType>()(
  persist(
    (set) => ({
      role: authEnum.GUEST,
      changeRoleToSeller: () =>
        set((state) => ({
          role: authEnum.SELLER,
        })),
      changeRoleToConsumer: () =>
        set((state) => ({
          role: authEnum.CONSUMER,
        })),
    }),
    {
      name: "theme",
    }
  )
);

export default useAuthStore;
