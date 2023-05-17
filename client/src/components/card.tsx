import { useEffect, useState } from "react";
import useThemeStore from "./store/themeStore";
import { cardPropType } from "../../types";

export default function Product(props: cardPropType) {
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  return (
    <div
      className="card w-96 bg-neutral bg-opacity-60 text-neutral-content hover:bg-accent"
      data-theme={stateTheme}
    >
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
          <h2 className="font-extrabold text-lg text-primary">{props.price} $</h2>
        </div>
      </div>
    </div>
  );
}
