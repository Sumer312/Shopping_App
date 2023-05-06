import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum themeEnum {
  LIGHT = "retro",
  DARK = "luxury",
}

interface themeType {
  theme: themeEnum;
  changeTheme: () => void;
}

const useThemeStore = create<themeType>()(
  persist(
    (set) => ({
      theme: themeEnum.DARK,
      changeTheme: () =>
        set((state) => ({
          theme: state.theme === themeEnum.LIGHT ? themeEnum.DARK : themeEnum.LIGHT,
        })),
    }),
    {
      name: "themeStore",
    }
  )
);

export default useThemeStore;
