import { Link } from "react-router-dom";
import useStore, { themeEnum } from "./store/themeStore";
import { useEffect, useState } from "react";
import useAuthStore, { authEnum } from "./store/authStore";
import {
  BsFillBrightnessHighFill,
  BsFillMoonStarsFill,
  BsFillPersonFill,
  BsDatabaseFill,
  BsPlusCircleFill,
  BsCartFill,
} from "react-icons/bs";
import { GiRobinHoodHat } from "react-icons/gi";

import { CiLogout, CiCreditCard1, CiLogin } from "react-icons/ci";
import { RiLoginBoxFill } from "react-icons/ri";

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
            <Link
              className="btn btn-ghost btn-lg text-xl hover:bg-accent"
              to="/"
            >
              <GiRobinHoodHat size="4rem" />
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 mr-3">
              <li tabIndex={0}>
                <Link to="/add-product">
                  <BsPlusCircleFill />
                  Add Product
                </Link>
              </li>
              <li tabIndex={0}>
                <a onClick={changeTheme}>
                  {stateTheme === themeEnum.DARK ? (
                    <BsFillBrightnessHighFill size="1.5rem" />
                  ) : (
                    <BsFillMoonStarsFill size="1.1rem" />
                  )}
                </a>
              </li>
            </ul>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                  <BsFillPersonFill size="2rem" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/my-products">
                    <BsDatabaseFill />
                    My Products
                  </Link>
                </li>
                <li onClick={() => changeRoleToGuest()}>
                  <a>
                    <CiLogout />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
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
            <Link className="btn btn-ghost btn-lg text-xl" to="/">
              <GiRobinHoodHat size="4rem" />
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
            <Link
              className="btn btn-ghost btn-lg text-xl hover:bg-accent"
              to="/"
            >
              <GiRobinHoodHat size="4rem" />
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 mr-3">
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
                <a onClick={changeTheme}>
                  {stateTheme === themeEnum.DARK ? (
                    <BsFillBrightnessHighFill size="1.5rem" />
                  ) : (
                    <BsFillMoonStarsFill size="1.1rem" />
                  )}
                </a>
              </li>
            </ul>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                  <BsFillPersonFill size="2rem" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/my-orders">
                    <CiCreditCard1 />
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/my-cart">
                    <BsCartFill />
                    My Cart
                  </Link>
                </li>
                <li onClick={() => changeRoleToGuest()}>
                  <a>
                    <CiLogout />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
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
            <Link className="btn btn-ghost btn-lg text-xl" to="/">
              <GiRobinHoodHat size="4rem" />
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
            <Link
              className="btn btn-ghost btn-lg text-xl hover:bg-accent"
              to="/"
            >
              <GiRobinHoodHat size="4rem" />
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 mr-3">
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
                    <Link to="/unisex/hoodies">Hoodies</Link>{" "}
                    <a onClick={changeTheme}>
                      {stateTheme === themeEnum.DARK ? (
                        <BsFillBrightnessHighFill size="1.5rem" />
                      ) : (
                        <BsFillMoonStarsFill size="1.1rem" />
                      )}
                    </a>
                  </li>
                  <li>
                    <Link to="/unisex/bottoms">Bottoms</Link>
                  </li>
                </ul>
              </li>
              <li tabIndex={0}>
                <a onClick={changeTheme}>
                  {stateTheme === themeEnum.DARK ? (
                    <BsFillBrightnessHighFill size="1.5rem" />
                  ) : (
                    <BsFillMoonStarsFill size="1.1rem" />
                  )}
                </a>
              </li>
            </ul>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                  <RiLoginBoxFill size="2rem" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/auth/seller/login">
                    <CiLogin /> Seller
                  </Link>
                </li>
                <li>
                  <Link to="/auth/consumer/login">
                    <CiLogin /> Consumer
                  </Link>
                </li>
              </ul>
            </div>
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
            <Link className="btn btn-ghost btn-lg text-xl" to="/">
              <GiRobinHoodHat size="4rem" />
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
