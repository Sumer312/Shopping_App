import { Link } from "react-router-dom";
import useStore, { themeEnum } from "./store/themeStore";
import { useEffect, useState } from "react";
import useAuthStore, { authEnum } from "./store/authStore";

export default function Navbar() {
  const theme = useStore((state) => state.theme);
  const changeTheme = useStore((state) => state.changeTheme);
  const [stateTheme, setStateTheme] = useState<string>();

  const role = useAuthStore((state) => state.role);
  const [stateRole, setStateRole] = useState<authEnum>();
  const changeRoleToGuest = useAuthStore((state) => state.changeRoleToGuest);

  useEffect(() => {
    setStateRole(role);
  }, [role]);

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  const SellerNavbar = () => {
    return (
      <>
        <div className="hidden fixed z-50 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-20">
          <div className="flex-1">
            <Link className="btn btn-ghost normal-case text-xl" to="/">
              Clothing Website
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 mr-8">
              <li tabIndex={0}>
                <Link to="/add-product">Add Product</Link>
              </li>
              <li tabIndex={0}>
                <Link to="/my-products">My Products</Link>
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
              <li onClick={() => changeRoleToGuest()}>
                <a>Logout</a>
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
            <Link className="btn btn-ghost normal-case text-xl" to="/">
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
    return (
      <>
        <div className="hidden fixed z-50 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-20">
          <div className="flex-1">
            <Link className="btn btn-ghost normal-case text-xl" to="/">
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
                    <Link to="/men/tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/men/hoodies">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/men/bottoms">Bottoms</Link>
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
                    <Link to="/women/tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/women/hoodies">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/women/bottoms">Bottoms</Link>
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
                    <Link to="/unisex/tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/unisex/hoodies">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/unisex/bottoms">Bottoms</Link>
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
              <li onClick={() => changeRoleToGuest()}>Logout</li>
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
            <Link className="btn btn-ghost normal-case text-xl" to="/">
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
    return (
      <>
        <div className="hidden fixed z-50 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-20">
          <div className="flex-1">
            <Link className="btn btn-ghost normal-case text-xl" to="/">
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
                    <Link to="/men/tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/men/hoodies">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/men/bottoms">Bottoms</Link>
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
                    <Link to="/women/tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/women/hoodies">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/women/bottoms">Bottoms</Link>
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
                    <Link to="/unisex/tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/unisex/hoodies">Hoodies</Link>
                  </li>
                  <li>
                    <Link to="/unisex/bottoms">Bottoms</Link>
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
            <Link className="btn btn-ghost normal-case text-xl" to="/">
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

  return stateRole === authEnum.SELLER
    ? SellerNavbar()
    : stateRole === authEnum.CONSUMER
    ? ConsumerNavbar()
    : GuestNavbar();
}
