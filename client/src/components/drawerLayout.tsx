//components/DrawerLayout.tsx
import React from "react";
import useThemeStore from "./store/themeStore";
import { useSessionStorage } from "usehooks-ts";

type Props = {
  children: React.ReactNode;
};

const DrawerLayout = ({ children }: Props) => {
  const [open, setOpen] = useSessionStorage<boolean>("drawer", false);
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className="drawer" data-theme={theme}>
      <input
        id="app-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
      />
      <div className="drawer-content flex flex-col">{children}</div>
      <div className="drawer-side">
        <label htmlFor="drawer-overlay" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          <button
            className="btn btn-square btn-sm btn-outline btn-neutral-content place-self-end"
            onClick={() => setOpen(false)}
          >
            X
          </button>
          <div className="collapse">
            <input type="checkbox" />
            <div className=" collapse-title btn bg-transparent border-none hover:bg-transparent place-content-start text-lg text-accent">
              Men
            </div>
            <ul tabIndex={0} className="collapse-content menu bg-base-100 w-52 -my-4">
              <li>
                <a href="/men/tops" onClick={() => setOpen(!open)}>Tops</a>
              </li>
              <li>
                <a href="/men/bottoms" onClick={() => setOpen(!open)}>Bottoms</a>
              </li>
              <li>
                <a href="/men/hoodies" onClick={() => setOpen(!open)}>Hoodies</a>
              </li>
            </ul>
          </div>
          <div className="collapse">
            <input type="checkbox" />
            <div className=" collapse-title btn bg-transparent border-none hover:bg-transparent place-content-start text-lg text-accent">
              Women
            </div>
            <ul tabIndex={0} className="collapse-content menu bg-base-100 w-52 -my-4">
              <li>
                <a href="/women/tops" onClick={() => setOpen(!open)}>Tops</a>
              </li>
              <li>
                <a href="/women/bottoms" onClick={() => setOpen(!open)}>Bottoms</a>
              </li>
              <li>
                <a href="/women/hoodies" onClick={() => setOpen(!open)}>Hoodies</a>
              </li>
            </ul>
          </div>
          <div className="collapse">
            <input type="checkbox" />
            <div className=" collapse-title btn bg-transparent border-none hover:bg-transparent place-content-start text-lg text-accent">
              Unisex
            </div>
            <ul tabIndex={0} className="collapse-content menu bg-base-100 w-52 -my-4">
              <li>
                <a href="/unisex/tops" onClick={() => setOpen(!open)}>Tops</a>
              </li>
              <li>
                <a href="/unisex/bottoms" onClick={() => setOpen(!open)}>Bottoms</a>
              </li>
              <li>
                <a href="/unisex/hoodies" onClick={() => setOpen(!open)}>Hoodies</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DrawerLayout;
