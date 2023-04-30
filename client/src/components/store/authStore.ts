import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum authEnum {
  SELLER = "seller",
  CONSUMER = "consumer",
  GUEST = "guest",
}

interface authType {
  role: authEnum;
  token: string | null;
  ID: string | null;
  changeRoleToSeller: (token: string, ID: string) => void;
  changeRoleToConsumer: (token: string, ID: string) => void;
  changeRoleToGuest: () => void;
}

const useAuthStore = create<authType>()(
  persist(
    (set) => ({
      role: authEnum.GUEST,
      token: null,
      ID: null,
      changeRoleToSeller: (token, ID) =>
        set(() => ({
          role: authEnum.SELLER,
          token: token,
          ID: ID,
        })),
      changeRoleToConsumer: (token, ID) =>
        set(() => ({
          role: authEnum.CONSUMER,
          token: token,
          ID: ID,
        })),
      changeRoleToGuest: () =>
        set(() => ({
          role: authEnum.GUEST,
          token: null,
          ID: null,
        })),
    }),
    {
      name: "authStore",
    }
  )
);

export default useAuthStore;
