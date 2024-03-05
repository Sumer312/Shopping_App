import { Link } from "react-router-dom";
import useStore, { themeEnum } from "./store/themeStore";
import { useEffect, useState } from "react";
import useAuthStore, { authEnum } from "./store/authStore";
import {
  BsFillBrightnessHighFill,
  BsFillBrightnessLowFill,
  BsFillPersonFill,
  BsDatabaseFill,
  BsPlusCircleFill,
  BsCartFill,
} from "react-icons/bs";

import { CiLogout, CiCreditCard1, CiLogin } from "react-icons/ci";
import {
  RiLoginBoxFill,
  RiMenuFill,
  RiArrowDropDownLine,
} from "react-icons/ri";
import { useSessionStorage } from "usehooks-ts";
import { toast, ToastContainer, Flip } from "react-toastify";
import axios from "../../api/axios";

export default function Navbar() {
  const [open, setOpen] = useSessionStorage<boolean>("drawer", false);
  const theme = useStore((state) => state.theme);
  const changeTheme = useStore((state) => state.changeTheme);
  const [stateTheme, setStateTheme] = useState<string>();

  const role = useAuthStore((state) => state.role);
  const [stateRole, setStateRole] = useState<authEnum>();
  const changeRoleToGuest = useAuthStore((state) => state.changeRoleToGuest);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setStateRole(role);
  }, [role]);

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  const notifyError = (text: string) => {
    toast.error(text, {
      toastId: "error",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: stateTheme === themeEnum.LIGHT ? "colored" : "dark",
      transition: Flip,
    });
  };

  const logout = () => {
    axios
      .delete("/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          changeRoleToGuest();
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };
  const SellerNavbar = () => {
    return (
      <>
        <div className="hidden fixed z-40 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            limit={1}
            containerId={"error"}
          />
          <div className="flex-1">
            <Link
              className="btn btn-ghost btn-lg text-xl hover:btn-accent"
              to="/"
            >
              <img width="64" height="64" src="https://img.icons8.com/cotton/64/forester-shirt.png" alt="forester-shirt" />
              Clothing App
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
                  {stateTheme === themeEnum.DARK ? <BsFillBrightnessHighFill size="1.5rem" /> : <BsFillBrightnessLowFill size="1.5rem" />}
                </a>
              </li>
            </ul>
            <div className="dropdown dropdown-bottom dropdown-end">
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
                <li onClick={logout}>
                  <a>
                    <CiLogout />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="fixed z-40 md:hidden lg:hidden xl:hidden navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            limit={1}
            containerId={"error"}
          />
          <div className="flex-1">
            <Link
              className="btn btn-ghost btn-lg text-xl hover:btn-accent"
              to="/"
            >
              <img width="64" height="64" src="https://img.icons8.com/cotton/64/forester-shirt.png" alt="forester-shirt" />
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <a onClick={changeTheme} className="btn btn-ghost">
              {stateTheme === themeEnum.DARK ? <BsFillBrightnessHighFill size="1.5rem" /> : <BsFillBrightnessLowFill size="1.5rem" />}
            </a>
            <button className="btn btn-circle btn-ghost mr-6">
              <BsFillPersonFill size="1.5rem" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-md rounded-box w-52 bg-base-100 backdrop-filter backdrop-blur-lg bg-opacity-60"
            >
              <li>
                <Link to="/add-product">
                  <BsPlusCircleFill />
                  Add Product
                </Link>
              </li>
              <li>
                <Link to="/my-products">
                  <BsDatabaseFill />
                  My Products
                </Link>
              </li>
              <li onClick={logout}>
                <a>
                  <CiLogout />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const ConsumerNavbar = () => {
    return (
      <>
        <div className="hidden fixed z-40 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            limit={1}
            containerId={"error"}
          />
          <div className="flex-1">
            <Link
              className="btn btn-ghost btn-lg text-xl hover:btn-accent"
              to="/"
            >
              <img width="64" height="64" src="https://img.icons8.com/cotton/64/forester-shirt.png" alt="forester-shirt" />
              Clothing App
            </Link>
          </div>
          <div className="flex-none">
            <div className="menu menu-horizontal gap-4">
              <ul className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <li tabIndex={0}>
                  <a>
                    Men
                    <RiArrowDropDownLine size="1.25rem" />
                  </a>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40 rounded-box w-52">
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
              </ul>
              <ul className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <li tabIndex={0}>
                  <a>
                    Women
                    <RiArrowDropDownLine size="1.25rem" />
                  </a>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40 rounded-box w-52">
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
              </ul>
              <ul className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <li tabIndex={0}>
                  <a>
                    Unisex
                    <RiArrowDropDownLine size="1.25rem" />
                  </a>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40 rounded-box w-52">
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
              </ul>
              <a onClick={changeTheme} className="mt-2 cursor-pointer">
                {stateTheme === themeEnum.DARK ? <BsFillBrightnessHighFill size="1.5rem" /> : <BsFillBrightnessLowFill size="1.5rem" />}
              </a>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full">
                    <BsFillPersonFill size="1.5rem" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40 rounded-box w-52"
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
                  <li onClick={logout}>
                    <a>
                      <CiLogout />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-40 md:hidden lg:hidden xl:hidden navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            limit={1}
            containerId={"error"}
          />
          <div className="flex-none">
            <button
              className="btn btn-ghost drawer-button"
              onClick={() => setOpen(!open)}
            >
              <RiMenuFill size="1.5rem" />
            </button>
          </div>
          <div className="flex-1">
            <Link
              className="btn btn-ghost btn-lg text-xl hover:btn-accent"
              to="/"
            >
              <img width="64" height="64" src="https://img.icons8.com/cotton/64/forester-shirt.png" alt="forester-shirt" />
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <a onClick={changeTheme} className="btn btn-ghost">
              {stateTheme === themeEnum.DARK ? <BsFillBrightnessHighFill size="1.5rem" /> : <BsFillBrightnessLowFill size="1.5rem" />}
            </a>
            <button className="btn btn-circle btn-ghost mr-6">
              <BsFillPersonFill size="1.5rem" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-md rounded-box w-52 bg-base-100 backdrop-filter backdrop-blur-lg bg-opacity-60"
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
              <li onClick={logout}>
                <a>
                  <CiLogout />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const GuestNavbar = () => {
    return (
      <>
        <div className="hidden fixed z-40 md:navbar lg:navbar xl:navbar bg-base-100 backdrop-filter backdrop-blur-lg bg-opacity-40">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            limit={1}
            containerId={"error"}
          />
          <div className="flex-1">
            <Link
              className="btn btn-ghost btn-lg text-xl hover:btn-accent"
              to="/"
            >
              <img width="64" height="64" src="https://img.icons8.com/cotton/64/forester-shirt.png" alt="forester-shirt" />
              Clothing App
            </Link>
          </div>
          <div className="flex-none">
            <div className="menu menu-horizontal gap-4">
              <ul className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <li tabIndex={0}>
                  <a>
                    Men
                    <RiArrowDropDownLine size="1.25rem" />
                  </a>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40 rounded-box w-52">
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
              </ul>
              <ul className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <li tabIndex={0}>
                  <a>
                    Women
                    <RiArrowDropDownLine size="1.25rem" />
                  </a>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40 rounded-box w-52">
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
              </ul>
              <ul className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <li tabIndex={0}>
                  <a>
                    Unisex
                    <RiArrowDropDownLine size="1.25rem" />
                  </a>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40 rounded-box w-52">
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
              </ul>
              <li tabIndex={0}>
                <a onClick={changeTheme}>
                  {stateTheme === themeEnum.DARK ? <BsFillBrightnessHighFill size="1.5rem" /> : <BsFillBrightnessLowFill size="1.5rem" />}
                </a>
              </li>
            </div>
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
        <div className="fixed z-40 md:hidden lg:hidden xl:hidden navbar bg-base-100 backdrop-filter backdrop-blur-md bg-opacity-40">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            limit={1}
            containerId={"error"}
          />
          <div className="flex-none">
            <button className="btn btn-ghost" onClick={() => setOpen(!open)}>
              <RiMenuFill size="1.5rem" />
            </button>
          </div>
          <div className="flex-1">
            <Link
              className="btn btn-ghost btn-lg text-xl hover:btn-accent"
              to="/"
            >
              <img width="64" height="64" src="https://img.icons8.com/cotton/64/forester-shirt.png" alt="forester-shirt" />
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <a onClick={changeTheme} className="btn btn-ghost">
              {stateTheme === themeEnum.DARK ? <BsFillBrightnessHighFill size="1.5rem" /> : <BsFillBrightnessLowFill size="1.5rem" />}
            </a>
            <button className="btn btn-circle btn-ghost mr-6">
              <RiLoginBoxFill size="1.5rem" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-md rounded-box w-52 bg-base-100 backdrop-filter backdrop-blur-lg bg-opacity-60"
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
      </>
    );
  };

  return stateRole === authEnum.SELLER
    ? SellerNavbar()
    : stateRole === authEnum.CONSUMER
      ? ConsumerNavbar()
      : GuestNavbar();
}
