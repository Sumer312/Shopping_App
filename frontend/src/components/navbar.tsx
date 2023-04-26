import Link from "next/link";
import useStore, { themeEnum } from "../components/store/store";
import { useEffect, useState } from "react";
import useAuthStore, { authEnum } from "./store/authStore";

const SellerNavbar = () => {
  const theme = useStore((state) => state.theme);
  const changeTheme = useStore((state) => state.changeTheme);
  const [stateTheme, setStateTheme] = useState<string>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <>
      <div className="hidden fixed z-50 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-20">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Clothing Website
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 mr-8">
            <li tabIndex={0}>
              <Link href="/add-product">Add Product</Link>
            </li>
            <li tabIndex={0}>
              <Link href="/my-products">My Products</Link>
            </li>
            <li tabIndex={0}>
              <img
                src={
                  stateTheme === themeEnum.LIGHT
                    ? "https://img.icons8.com/ios-glyphs/256/bright-moon--v2.png"
                    : "https://img.icons8.com/material-rounded/96/FFFFFF/sun--v1.png"
                }
                alt="Theme"
                width="60"
                height="40"
                onClick={changeTheme}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed z-50 md:hidden lg:hidden xl:hidden navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-60">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Clothing Website
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const ConsumerNavbar = () => {
  const theme = useStore((state) => state.theme);
  const changeTheme = useStore((state) => state.changeTheme);
  const [stateTheme, setStateTheme] = useState<string>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <>
      <div className="hidden fixed z-50 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-20">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Clothing Website
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 mr-8">
            <li tabIndex={0}>
              <a>
                Men
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a href="/men/tops">Tops</a>
                </li>
                <li>
                  <a href="/men/hoodies">Hoodies</a>
                </li>
                <li>
                  <a href="/men/bottoms">Bottoms</a>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <a>
                Women
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a href="/women/tops">Tops</a>
                </li>
                <li>
                  <a href="/women/hoodies">Hoodies</a>
                </li>
                <li>
                  <a href="/women/bottoms">Bottoms</a>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <a>
                Unisex
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a href="/unisex/tops">Tops</a>
                </li>
                <li>
                  <a href="/unisex/hoodies">Hoodies</a>
                </li>
                <li>
                  <a href="/unisex/bottoms">Bottoms</a>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <img
                src={
                  stateTheme === themeEnum.LIGHT
                    ? "https://img.icons8.com/ios-glyphs/256/bright-moon--v2.png"
                    : "https://img.icons8.com/material-rounded/96/FFFFFF/sun--v1.png"
                }
                alt="Theme"
                width="60"
                height="40"
                onClick={changeTheme}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed z-50 md:hidden lg:hidden xl:hidden navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-60">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Clothing Website
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const GuestNavbar = () => {
  const theme = useStore((state) => state.theme);
  const changeTheme = useStore((state) => state.changeTheme);
  const [stateTheme, setStateTheme] = useState<string>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <>
      <div className="hidden fixed z-50 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-20">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Clothing Website
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 mr-8">
            <li tabIndex={0}>
              <a>
                Men
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a href="/men/tops">Tops</a>
                </li>
                <li>
                  <a href="/men/hoodies">Hoodies</a>
                </li>
                <li>
                  <a href="/men/bottoms">Bottoms</a>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <a>
                Women
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a href="/women/tops">Tops</a>
                </li>
                <li>
                  <a href="/women/hoodies">Hoodies</a>
                </li>
                <li>
                  <a href="/women/bottoms">Bottoms</a>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <a>
                Unisex
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a href="/unisex/tops">Tops</a>
                </li>
                <li>
                  <a href="/unisex/hoodies">Hoodies</a>
                </li>
                <li>
                  <a href="/unisex/bottoms">Bottoms</a>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <img
                src={
                  stateTheme === themeEnum.LIGHT
                    ? "https://img.icons8.com/ios-glyphs/256/bright-moon--v2.png"
                    : "https://img.icons8.com/material-rounded/96/FFFFFF/sun--v1.png"
                }
                alt="Theme"
                width="60"
                height="40"
                onClick={changeTheme}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed z-50 md:hidden lg:hidden xl:hidden navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-60">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            Clothing Website
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default function Navbar() {
  const role = useAuthStore((state) => state.role);
  const changeRoleToSeller = useAuthStore((state) => state.changeRoleToSeller);
  const changeRoleToConsumer = useAuthStore((state) => state.changeRoleToConsumer);
  const [stateRole, setStateRole] = useState<authEnum>();
  useEffect(() => {
    setStateRole(role);
  }, [role]);
  return stateRole === authEnum.SELLER
    ? SellerNavbar()
    : stateRole === authEnum.CONSUMER
    ? ConsumerNavbar()
    : GuestNavbar();
}
