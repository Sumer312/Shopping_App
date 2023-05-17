import { useParams } from "react-router-dom";
import { useEffect, useState, MouseEvent } from "react";
import axios from "../../api/axios";
import useAuthStore from "../components/store/authStore";
import { prodType } from "../../types";
import useThemeStore, { themeEnum } from "../components/store/themeStore";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { BsCashCoin } from "react-icons/bs";
import { toast, ToastContainer, Flip } from "react-toastify";
import styles from "../styles/Home.module.css";

export default function BuyProd() {
  const { prodId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [prod, setProd] = useState<prodType>();
  const token = useAuthStore((state) => state.token);
  const ID = useAuthStore((state) => state.ID);
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState(theme);
  const navigate = useNavigate();

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  useEffect(() => {
    axios.get(`consumer/get-by-Id/${prodId}`).then((res) => {
      setTimeout(() => setProd(JSON.parse(res.data)), 500);
    });
  }, [prodId]);

  const notifySuccess = (text: string) => {
    toast.success(text, {
      toastId: "success",
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

  const placeOrder = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    axios
      .post(
        `consumer/place-order`,
        { consumerId: ID, prodId: prodId, quantity: quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          notifySuccess("Order Placed");
          setTimeout(() => {
            navigate("/my-orders");
          }, 3000);
        }
      })
      .catch((err) => {
        notifyError(
          err.response && err.response.data
            ? err.response.data.message
            : err.message
        );
      });
  };

  return prod ? (
    prod.quantity !== 0 ? (
      <main className={styles.main}>
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
          containerId={"success"}
        />
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
        <div className="grid gap-y-36 mt-16">
          <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">{prod.title}</h2>
              <p>{prod.snippet}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <label htmlFor="quantity" className="mt-6">
              Quantity:
            </label>
            <input
              type="number"
              className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-sm p-10"
              id="quantity"
              min="1"
              max={prod.quantity}
              value={quantity}
              onChange={(event) => setQuantity(parseInt(event.target.value))}
              data-theme={stateTheme}
            />
          </div>
          <button
            className="btn btn-lg btn-outline btn-neutral gap-2 -mt-4"
            data-theme={stateTheme}
            type="submit"
            onClick={placeOrder}
          >
            <BsCashCoin />
            Place Order
          </button>
        </div>
      </main>
    ) : (
      <main className={styles.main}>
        <h1>Can't place order because product is out of stock</h1>
      </main>
    )
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
