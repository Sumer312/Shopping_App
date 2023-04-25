import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "@/components/card";
import Link from "next/link";

const params: string = "Wtops";

interface cardType {
  _id: string;
  title: string;
  snippet: string;
  description: string;
  quantity: number;
  price: number;
  coverImage: { publicId: string; secureUrl: string };
  imageArray: Array<{ publicId: string; secureUrl: string }>;
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
            <Link href={`/product/${card._id}`} style={{ cursor: "pointer" }}>
              <Product
                title={card.title}
                snippet={card.snippet}
                description={card.description}
                imageObj={card.coverImage}
                price={card.price}
              />
            </Link>
          ))}
      </div>
      <h1>Hello Men Hoodies</h1>
    </main>
  );
}
