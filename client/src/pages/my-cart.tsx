import { useEffect, useState } from "react";
import CartCard from "../components/cartCard";
import useAuthStore from "../components/store/authStore";
import styles from "../styles/Home.module.css";
import axios from "../../api/axios";
import { cartCardType } from "../../types";
import { Triangle } from "react-loader-spinner";
import { BsCartX, BsCashCoin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function MyCart() {
  const ID = useAuthStore((state) => state.ID);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [cart, setCart] = useState<Array<cartCardType>>();
  useEffect(() => {
    axios
      .get(`/consumer/get-cart/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setCart(res.data.cart);
        }, 500);
      });
  }, [ID, token]);

  const placeOrder = async () => {
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        const res = await axios.post(
          `consumer/place-order`,
          { consumerId: ID, prodId: cart[i].id, quantity: cart[i].quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          console.log(res.data);
          navigate("/");
        }
      }
    }
  };
  const clearCart = async () => {
    if (cart) {
      const res = await axios.delete(`/consumer/clear-cart/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        navigate("/");
      }
    }
  };
  return cart ? (
    <main className={styles.main}>
      <div className="grid gap-16 xl:grid-cols-4 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {cart.map((ele, index) => (
          <CartCard
            key={index}
            title={ele.title}
            snippet={ele.snippet}
            quantity={ele.quantity}
            id={ele.id}
            maxQuantity={ele.maxQuantity}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 xl:flex lg:flex md:flex mt-8">
        <button
          className="btn btn-lg btn-wide btn-outline btn-accent gap-2"
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
