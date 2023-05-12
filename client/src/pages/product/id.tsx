import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import styles from "../../styles/Home.module.css";
import Carousel from "../../components/carousel";
import { prodType } from "../../../types";
import useThemeStore from "../../components/store/themeStore";
import { useNavigate, useParams } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { BsCartPlus } from "react-icons/bs";
import useAuthStore from "../../components/store/authStore";

export default function Details() {
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  const [prod, setProd] = useState<prodType>();
  const [cartQuantity, setCartQuantity] = useState<number>(1);
  const ID = useAuthStore((state) => state.ID);
  const token = useAuthStore((state) => state.token)
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  useEffect(() => {
    axios.get(`/consumer/getById/${params.prodId}`).then((result) => {
      setTimeout(() => setProd(JSON.parse(result.data)), 500);
    });
  }, [params.prodId]);

  function CarouselReady(obj: prodType) {
    const combinedArray: Array<string> = [];
    combinedArray.push(obj.coverImage.secureUrl);
    for (let i = 0; i < obj.imageArray.length; i++) {
      combinedArray.push(obj.imageArray[i].secureUrl);
    }
    return combinedArray;
  }

  return prod ? (
    <main className={styles.main}>
      {<Carousel key={prod.title} imageArray={CarouselReady(prod)} />}
      <h1>{prod.title}</h1>
      <p>{prod.description}</p>
      <p>{prod.price}</p>
      <div className="grid grid-cols-1 gap-4">
        <button
          data-theme={stateTheme}
          className={
            prod.quantity !== 0
              ? "btn btn-lg btn-wide btn-outline btn-neutral"
              : "btn btn-disabled btn-wide btn-lg"
          }
          onClick={() => navigate(`/buy-product/${params.prodId}`)}
        >
          {prod.quantity !== 0 ? "Buy Now" : "Out Of Stock"}
        </button>
        <div tabIndex={0} className={prod.quantity > 0 ? "collapse" : "hidden"}>
          <input type="checkbox" />
          <div
            date-theme={stateTheme}
            className="collapse-title btn btn-wide btn-lg btn-accent"
          >
            Add to cart
          </div>
          <div className="collapse-content grid gap-8 grid-cols-1">
            <label htmlFor="cartQuantity" className="mt-4">
              Quantity
            </label>
            <input
              type="number"
              className="input input-bordered input-accent w-56 p-10"
              id="cartQuantity"
              min="1"
              max={prod.quantity}
              value={cartQuantity}
              onChange={(event) =>
                setCartQuantity(parseInt(event.target.value))
              }
              data-theme={stateTheme}
            />
            <button
              className="btn btn-accent btn-outline btn-lg btn-square"
              onClick={() => {
                axios
                  .post(
                    "/consumer/add-to-cart",
                    {
                      consumerId: ID,
                      prodId: params.prodId,
                      quantity: cartQuantity,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/my-cart");
                    }
                  });
              }}
            >
              <BsCartPlus />
            </button>
          </div>
        </div>
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
