import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export enum themeEnum {
  LIGHT = "cupcake",
  DARK = "luxury",
}

interface themeType {
  theme: themeEnum;
  changeTheme: () => void;
}

const useStore = create<themeType>()(
  persist(
    (set) => ({
      theme: themeEnum.DARK,
      changeTheme: () =>
        set((state) => ({
          theme: state.theme === themeEnum.LIGHT ? themeEnum.DARK : themeEnum.LIGHT,
        })),
    }),
    {
      name: "theme",
    }
  )
);

export default useStore;
