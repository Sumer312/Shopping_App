import { useParams } from "react-router-dom";
import { useEffect, useState, MouseEvent } from "react";
import axios from "../../api/axios";
import useAuthStore from "../components/store/authStore";
import { prodType } from "../../types";
import useThemeStore from "../components/store/themeStore";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { BsCashCoin } from "react-icons/bs";
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
  <BsCashCoin />;

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  useEffect(() => {
    axios.get(`consumer/getById/${prodId}`).then((res) => {
      console.log(JSON.parse(res.data));
      setTimeout(() => setProd(JSON.parse(res.data)), 500);
    });
  }, [prodId]);
  <BsCashCoin />;

  const placeOrder = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const res = await axios.post(
      `consumer/place-order`,
      { consumerId: ID, prodId: prodId, quantity: quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.status === 200) {
      console.log(res.data);
      navigate("/");
    }
  };

  return prod ? (
    prod.quantity !== 0 ? (
      <main className={styles.main}>
        <h1>{prod.title}</h1>
        <h6>{prod.snippet}</h6>
        <label htmlFor="quantity">Quantity</label>
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
        <button
          className="btn btn-lg btn-outline btn-neutral xs:btn-wide sm:btn-wide gap-2"
          data-theme={stateTheme}
          type="submit"
          onClick={placeOrder}
        >
          <BsCashCoin />
          Place Order
        </button>
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
