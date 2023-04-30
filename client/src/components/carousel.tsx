import { useEffect, useState } from "react";
import useStore, { themeEnum } from "./store/themeStore";
import { imageArray } from "../../types";

export default function Carousel(props: imageArray) {
  const theme = useStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<themeEnum>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <>
      <div className="carousel w-full" data-theme={stateTheme}>
        {props.imageArray.map((ele, index) => (
          <div id={`slide${index}`} className="carousel-item relative w-full">
            <img src={ele} className="w-full" />
            <div className="absolute hidden xl:flex lg:flex md:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index - 1}`}
                className="btn btn-circle btn-accent"
              >
                ❮
              </a>
              <a
                href={`#slide${index + 1}`}
                className="btn btn-circle btn-accent"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {props.imageArray.map((ele, index) => (
          <a
            href={`#slide${index}`}
            data-theme={stateTheme}
            className="btn btn-xs btn-accent"
          >
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
}
