import {
  Reducer,
  useReducer,
  MouseEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import useStore from "@/components/store/store";
import { themeEnum } from "@/components/store/store";
import axios from "./api/axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

enum ActionEnum {
  SET_TITLE = "SET_TITLE",
  SET_SNIPPET = "SET_SNIPPET",
  SET_PRICE = "SET_PRICE",
  SET_COVER_IMAGE = "SET_COVER_IMAGE",
  SET_IMAGE_ARRAY = "SET_IMAGE_ARRAY",
  SET_DESCRIPTION = "SET_DESCRIPTION",
  SET_QUANTITY = "SET_QUANTITY",
  SET_CATEGORY = "SET_CATEGORY",
}

interface ActionType {
  type: ActionEnum;
  payload: string;
  payloadFileList: Array<string | ArrayBuffer | null> | undefined;
}

interface StateType {
  title: undefined | string;
  snippet: undefined | string;
  price: undefined | number;
  quantity: undefined | number;
  coverImage: string | undefined;
  imageArray: undefined | Array<string | ArrayBuffer | null>;
  description: undefined | string;
  category: undefined | string;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    //@ts-ignore
    props: { token: req.cookies.seller },
  };
};
//@ts-ignore
export default function AddProd({ token }) {
  const theme = useStore((state) => state.theme);
  const router = useRouter();
  const [stateTheme, setStateTheme] = useState<string>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  const temp = useRef<string | ArrayBuffer | null>(null);
  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    (state: StateType, action: ActionType): StateType => {
      switch (action.type) {
        case ActionEnum.SET_TITLE:
          return {
            title: action.payload,
            snippet: state.snippet,
            price: state.price,
            quantity: state.quantity,
            coverImage: state.coverImage,
            imageArray: state.imageArray,
            description: state.description,
            category: state.category,
          };
        case ActionEnum.SET_SNIPPET:
          return {
            title: state.title,
            snippet: action.payload,
            price: state.price,
            quantity: state.quantity,
            coverImage: state.coverImage,
            imageArray: state.imageArray,
            description: state.description,
            category: state.category,
          };
        case ActionEnum.SET_PRICE:
          return {
            title: state.title,
            snippet: state.snippet,
            price: parseFloat(action.payload),
            quantity: state.quantity,
            coverImage: state.coverImage,
            imageArray: state.imageArray,
            description: state.description,
            category: state.category,
          };
        case ActionEnum.SET_QUANTITY:
          return {
            title: state.title,
            snippet: state.snippet,
            price: state.price,
            quantity: parseFloat(action.payload),
            coverImage: state.coverImage,
            imageArray: state.imageArray,
            description: state.description,
            category: state.category,
          };
        case ActionEnum.SET_COVER_IMAGE:
          return {
            title: state.title,
            snippet: state.snippet,
            price: state.price,
            quantity: state.quantity,
            coverImage: action.payload,
            imageArray: state.imageArray,
            description: state.description,
            category: state.category,
          };
        case ActionEnum.SET_IMAGE_ARRAY:
          return {
            title: state.title,
            snippet: state.snippet,
            price: state.price,
            quantity: state.quantity,
            coverImage: state.coverImage,
            imageArray: action.payloadFileList,
            description: state.description,
            category: state.category,
          };
        case ActionEnum.SET_DESCRIPTION:
          return {
            title: state.title,
            snippet: state.snippet,
            price: state.price,
            quantity: state.quantity,
            coverImage: state.coverImage,
            imageArray: state.imageArray,
            description: action.payload,
            category: state.category,
          };
        case ActionEnum.SET_CATEGORY:
          return {
            title: state.title,
            snippet: state.snippet,
            price: state.price,
            quantity: state.quantity,
            coverImage: state.coverImage,
            imageArray: state.imageArray,
            description: state.description,
            category: action.payload,
          };

        default:
          throw new Error(`Unhandled action type ${action.type}`);
      }
    },
    {
      title: "",
      snippet: "",
      price: undefined,
      quantity: undefined,
      coverImage: "",
      imageArray: undefined,
      description: "",
      category: undefined,
    }
  );

  const fileHandler = (file: File): Promise<string | ArrayBuffer | null> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem converting to base64"));
      };
      reader.readAsDataURL(file);
      reader.onload = () => {
        temp.current = reader.result;
        resolve(temp.current);
      };
    });
  };
  async function handleSubmit(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const {
      title,
      snippet,
      description,
      imageArray,
      coverImage,
      category,
      price,
      quantity,
    } = state;
    if (
      title &&
      snippet &&
      description &&
      price &&
      quantity &&
      coverImage &&
      category
    ) {
      try {
        await axios
          .post(
            `/seller/post`,
            {
              title: title,
              snippet: snippet,
              description: description,
              price: price,
              quantity: quantity,
              coverImage: JSON.parse(coverImage),
              imageArray: imageArray,
              category: category,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          // .then((result) => {
          //   router.push(`/${result.data.category}`);
          // });
      } catch (err) {
        console.log("Data not uploaded, err: " + err);
      }
    }
  }
  return (
    <div
      className={
        "flex overflow-x-scroll scrollbar-hide" +
        (stateTheme === themeEnum.LIGHT ? "-light" : "")
      }
    >
      <div className="flex flex-col w-full sm:flex-col lg:flex-row p-24">
        <div className="grid h-96 flex-grow card place-items-start mb-36 xl:mb-36">
          <label
            className={
              stateTheme === themeEnum.DARK
                ? "block text-gray-100 text-sm font-bold mb-4 mr-96"
                : "block text-gray-900 text-sm font-bold mb-4 mr-96"
            }
            htmlFor="title"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            name="title"
            value={state.title}
            required
            className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-lg p-10"
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_TITLE,
                payload: event.target.value,
                payloadFileList: undefined,
              });
            }}
          />
          <br />
          <label
            className={
              stateTheme === themeEnum.DARK
                ? "block text-gray-100 text-sm font-bold mb-4 mr-96"
                : "block text-gray-900 text-sm font-bold mb-4 mr-96"
            }
            htmlFor="snippet"
          >
            Snippet
          </label>
          <input
            type="text"
            placeholder="Type here"
            name="snippet"
            required
            value={state.snippet}
            className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-lg p-10"
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_SNIPPET,
                payload: event.target.value,
                payloadFileList: undefined,
              });
            }}
          />
          <br />
          <label
            className={
              stateTheme === themeEnum.DARK
                ? "block text-gray-100 text-sm font-bold mb-4"
                : "block text-gray-900 text-sm font-bold mb-4"
            }
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="textarea textarea-accent h-44 lg:h-64 md:h-56 sm:h-56 xl:h-56 w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-lg p-10"
            name="description"
            value={state.description}
            required
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_DESCRIPTION,
                payload: event.target.value,
                payloadFileList: undefined,
              });
            }}
            placeholder="Description"
          ></textarea>
        </div>
        <div className="grid h-96 flex-grow card place-items-start xs:mt-12 xl:-mt-8 lg:-mt-8 xl:ml-36">
          <label
            className={
              stateTheme === themeEnum.DARK
                ? "block text-gray-100 text-sm font-bold mt-8 mb-4 mr-96"
                : "block text-gray-900 text-sm font-bold mt-8 mb-4 mr-96"
            }
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            type="number"
            value={state.quantity}
            className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-sm p-10"
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_QUANTITY,
                payload: event.target.value,
                payloadFileList: undefined,
              });
            }}
            name="quantity"
            required
            placeholder="Enter quantity"
            min="1"
          />
          <br />
          <label
            className={
              stateTheme === themeEnum.DARK
                ? "block text-gray-100 text-sm font-bold mt-8 mb-4 mr-96"
                : "block text-gray-900 text-sm font-bold mt-8 mb-4 mr-96"
            }
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            value={state.price}
            placeholder="Enter price"
            id="price"
            step="10"
            className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-sm p-10"
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_PRICE,
                payload: event.target.value,
                payloadFileList: undefined,
              });
            }}
            required
          />
          <br />
          <label
            className={
              stateTheme === themeEnum.DARK
                ? "block text-gray-100 text-sm font-bold mt-4 mb-4 mr-96"
                : "block text-gray-900 text-sm font-bold mt-4 mb-4 mr-96"
            }
            htmlFor="CoverImage"
          >
            Cover Image
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-sm"
            name="CoverImage"
            accept="image/*"
            required
            data-theme={stateTheme}
            onChange={async (event) => {
              if (event.target.files !== null) {
                const image: File = event.target.files[0];
                fileHandler(image).then((result) => {
                  dispatch({
                    type: ActionEnum.SET_COVER_IMAGE,
                    payload: JSON.stringify(result),
                    payloadFileList: undefined,
                  });
                });
              }
            }}
          />
          <br />
          <label
            className={
              stateTheme === themeEnum.DARK
                ? "block text-gray-100 text-sm font-bold mt-4 mb-4 mr-96"
                : "block text-gray-900 text-sm font-bold mt-4 mb-4 mr-96"
            }
            htmlFor="ImageArray"
          >
            Product Images
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-sm"
            name="ImageArray"
            accept="image/*"
            multiple
            data-theme={stateTheme}
            onChange={async (event) => {
              if (event.target.files !== null) {
                let fileList: Array<string | ArrayBuffer | null> = [];
                for (let i = 0; i < event.target.files.length; i++) {
                  fileHandler(event.target.files[i])
                    .then((result) => fileList.push(result))
                    .then(() => {
                      if (i + 1 === event.target.files!.length) {
                        dispatch({
                          type: ActionEnum.SET_IMAGE_ARRAY,
                          payload: "",
                          payloadFileList: fileList,
                        });
                      }
                    });
                }
              }
            }}
          />
        </div>
        <div className="grid h-96 flex-grow card place-items-center mt-64 sm:mt-64 lg:mt-0 xl:mt-0">
          <label
            htmlFor=""
            className={
              stateTheme === themeEnum.DARK
                ? "block mr-56 -mt-24 text-gray-100 text-sm font-bold"
                : "block mr-56 -mt-24 text-gray-900 text-sm font-bold"
            }
          >
            Category
          </label>
          <select
            className="select select-accent -mt-48 w-full max-w-xs"
            value={state.category}
            data-theme={stateTheme}
            defaultValue="Mtops"
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_CATEGORY,
                payload: event.target.value,
                payloadFileList: undefined,
              });
            }}
          >
            <optgroup label="Men">
              <option value="Mtops">Tops</option>
              <option value="Mbots">Bottoms</option>
              <option value="Mhoods">Hoodies</option>
            </optgroup>
            <optgroup label="Women">
              <option value="Wtops">Tops</option>
              <option value="Wbots">Bottoms</option>
              <option value="Whoods">Hoodies</option>
            </optgroup>
            <optgroup label="Unisex">
              <option value="Utops">Tops</option>
              <option value="Ubots">Bottoms</option>
              <option value="Uhoods">Hoodies</option>
            </optgroup>
          </select>
          <button
            className="btn btn-lg btn-outline btn-accent xs:btn-wide sm:btn-wide"
            data-theme={stateTheme}
            type="submit"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
