import { useEffect, useRef, useState } from "react";
import useStore from "@/components/store/store";
import { cardPropType } from "types";

//"https://jojo-news.com/wp-content/uploads/2021/07/JJLEnding-1024x576.png"

export default function Product(props: cardPropType) {
  const theme = useStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <div className="card w-96 hover:bg-accent" data-theme={stateTheme}>
      <figure>
        <img
          className="card-img-top"
          src={props.imageObj.secureUrl}
          alt="image!"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.snippet}</p>
        <div className="card-actions justify-end px-4 py-4">
          <h2>{props.price}</h2>
        </div>
      </div>
    </div>
  );
}
