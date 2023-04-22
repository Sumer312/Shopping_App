import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import useStore from "@/components/store/store";
import Carousel from "@/components/carousel";

interface prodType {
  title: string;
  snippet: string;
  description: string;
  coverImageUrl: string;
  imageArray: Array<{ publicId: string; secureUrl: string }>;
  price: number;
  quantity: number;
}

export default function details() {
  const [prod, setProd] = useState<prodType>();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const params = router.query.id;
      axios({
        method: "get",
        url: `http://localhost:5000/consumer/getById/${params}`,
      }).then((result) => {
        console.log(params);
        console.log(result.data);
        setProd(JSON.parse(result.data));
      });
    }
  }, [router.isReady]);

  function CarouselReady(obj: prodType) {
    let combinedArray: Array<string> = [];
    combinedArray.push(obj.coverImageUrl);
    for (let i = 0; i < obj.imageArray.length; i++) {
      combinedArray.push(obj.imageArray[i].secureUrl);
    }
    return combinedArray;
  }

  return (
    <main className={styles.main}>
      { prod ? <Carousel imageArray={CarouselReady(prod)} /> : "" }
      <h1>{prod?.title}</h1>
      <p>{prod?.description}</p>
      <p>{prod?.price}</p>
      <button className="btn btn-lg btn-wide glass ">Buy Now</button>
    </main>
  ) 
}
