import { useEffect, useRef, useState } from "react";
import CartCard from "../components/cartCard";
import useAuthStore from "../components/store/authStore";
import styles from "../styles/Home.module.css";
import axios from "../../api/axios";
import { cartCardType } from "../../types";
import { Triangle } from "react-loader-spinner";
import { BsCartX, BsCashCoin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import useThemeStore, { themeEnum } from "../components/store/themeStore";

export default function MyCart() {
  const ID = useAuthStore((state) => state.ID);
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState(theme);
  const token = useAuthStore((state) => state.token);
  const [noStock, setNoStock] = useState<boolean>(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState<Array<cartCardType>>();
  const totalPrice = useRef<number>(0);

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

  useEffect(() => {
    axios
      .get(`/consumer/get-cart/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.cart.length; i++) {
          if (res.data.cart[i].quantity > res.data.cart[i].maxQuantity) {
            setNoStock(true);
          }
          totalPrice.current +=
            res.data.cart[i].price * res.data.cart[i].quantity;
        }
        return res;
      })
      .then((res) => {
        setTimeout(() => {
          setCart(res.data.cart);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ID, token]);

  const placeOrder = async () => {
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        axios
          .post(
            `consumer/place-order`,
            { consumerId: ID, prodId: cart[i].id, quantity: cart[i].quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            if (res.status === 200) {
              navigate("/my-orders");
            }
          })
          .catch((err) => {
            notifyError(
              err.response && err.response.data
                ? err.response.data.message
                : err.message
            );
          });
      }
    }
  };
  const clearCart = async () => {
    if (cart) {
      axios
        .delete(`/consumer/clear-cart/${ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/");
          }
        })
        .catch((err) => {
          notifyError(
            err.response && err.response.data
              ? err.response.data.message
              : err.message
          );
        });
    }
  };
  return cart ? (
    <>
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
      <main className={styles.main}>
        <div className="grid gap-16 xl:grid-cols-4 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {cart.map((ele, index) => (
            <CartCard
              key={index}
              title={ele.title}
              snippet={ele.snippet}
              quantity={ele.quantity}
              price={ele.price}
              id={ele.id}
              maxQuantity={ele.maxQuantity}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-72">
          <p className="font-light text-lg">Total amount is </p>
          <p className=" font-extrabold text-accent-content text-xl">
            {totalPrice.current} $
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:flex lg:flex md:flex mt-8">
          <button
            className={
              noStock
                ? "btn btn-lg btn-wide btn-disabled gap-2"
                : "btn btn-lg btn-wide btn-outline btn-accent gap-2"
            }
            onClick={placeOrder}
          >
            <BsCashCoin />
            Place Order
          </button>
          <button
            className="btn btn-lg btn-wide btn-outline btn-error gap-2"
            onClick={clearCart}
          >
            <BsCartX />
            Clear Cart
          </button>
        </div>
      </main>
    </>
  ) : (
    <main className={styles.main}>
      <Triangle
        height="200"
        width="200"
        color="hsl(var(--a))"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </main>
  );
}
