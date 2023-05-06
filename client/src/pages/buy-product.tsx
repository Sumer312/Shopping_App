import { useParams } from "react-router-dom";
import { useEffect, useState, MouseEvent } from "react";
import axios from "../../api/axios";
import useAuthStore from "../components/store/authStore";
import { prodType } from "../../types";
import useThemeStore from "../components/store/themeStore";
import { useNavigate } from "react-router-dom";
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
    axios.get(`consumer/getById/${prodId}`).then((res) => {
      setProd(res.data);
    });
  });

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

  return (
    <main className={styles.main}>
      <h1>{prod ? prod.title : ""}</h1>
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-sm p-10"
        id="quantity"
        min="1"
        value={quantity}
        onChange={(event) => setQuantity(parseInt(event.target.value))}
        data-theme={stateTheme}
      />
      <button
        className="btn btn-lg btn-outline btn-accent xs:btn-wide sm:btn-wide"
        data-theme={stateTheme}
        type="submit"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </main>
  );
}
