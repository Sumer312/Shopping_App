import next, { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Product from "@/components/card";
import Link from "next/link";

const params: string = "Mhoods";

interface cardType {
  _id: string;
  title: string;
  snippet: string;
  description: string;
  quantity: number;
  price: number;
  coverImageUrl: string;
  imageArray: Array<string>;
}

export default function top() {
  const [cards, setCards] = useState<Array<cardType> | undefined>(undefined);
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/consumer/get/${params}`,
    }).then((result) => {
      setCards(result.data);
    });
  }, []);
  return (
    <main className={styles.main}>
      <div className="grid gap-16 xl:grid-cols-4 xl:gap-16 xs:grid-col-1 sm:grid-cols-1 sm:gap-16 md:grid-cols-2 md:gap-16 lg:grid-cols-2 lg:gap-16">
        {cards &&
          cards.map((card) => (
            <Link
              href={`/${card._id}`}
              style={{ cursor: "pointer" }}
            >
              <Product
                title={card.title}
                snippet={card.snippet}
                description={card.description}
                imageUrl={card.coverImageUrl}
                price={card.price}
              />
            </Link>
          ))}
      </div>
      <h1>Hello Men Hoodies</h1>
    </main>
  );
}
