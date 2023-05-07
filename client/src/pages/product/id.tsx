import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import Carousel from "../../components/carousel";
import { prodType } from "../../../types";
import useThemeStore from "../../components/store/themeStore";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  const [prod, setProd] = useState<prodType>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/consumer/getById/${params.prodId}`,
    }).then((result) => {
      setProd(JSON.parse(result.data));
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

  return (
    <main className={styles.main}>
      {prod ? (
        <Carousel key={prod.title} imageArray={CarouselReady(prod)} />
      ) : (
        ""
      )}
      <h1>{prod?.title}</h1>
      <p>{prod?.description}</p>
      <p>{prod?.price}</p>
      <button
        data-theme={stateTheme}
        className="btn btn-lg btn-wide btn-outline btn-accent "
        onClick={() => navigate(`/buy-product/${params.prodId}`)}
      >
        Buy Now
      </button>
    </main>
  );
}
