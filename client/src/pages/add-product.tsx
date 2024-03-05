import {
  Reducer,
  useReducer,
  MouseEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import useThemeStore from "../components/store/themeStore";
import { themeEnum } from "../components/store/themeStore";
import axios from "../../api/axios";
import useAuthStore from "../components/store/authStore";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { toast, ToastContainer, Flip } from "react-toastify";
import { Triangle } from "react-loader-spinner";

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

export default function AddProd() {
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  const token = useAuthStore((state) => state.token);
  const [overlay, setOverlay] = useState(false);

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

  const notifySuccess = (text: string) => {
    toast.success(text, {
      toastId: "success",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: stateTheme === themeEnum.LIGHT ? "colored" : "dark",
      transition: Flip,
    });
  };

  const notifyError = (text: string) => {
    toast.error(text, {
      toastId: "error",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: stateTheme === themeEnum.LIGHT ? "colored" : "dark",
      transition: Flip,
    });
  };

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
    setOverlay(true);
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
      axios
        .post(
          `/seller/add-product`,
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
        .then((response) => {
          if (response.status === 200) {
            notifySuccess("Product added");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch((err) =>
          notifyError(
            err.response && err.response.data
              ? err.response.data.message
              : err.message
          )
        );
    }
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
        limit={1}
        containerId={"success"}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
        limit={1}
        containerId={"error"}
      />
      {overlay && (
        <div
          className="fixed"
          style={{ zIndex: "99999999", right: "45%", top: "10%" }}
        >
          <Triangle
            height="200"
            width="200"
            color="hsl(var(--a))"
            ariaLabel="triangle-loading"
            wrapperClass=""
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      )}
      <div className={overlay ? " pointer-events-none opacity-60" : ""}>
        <div
          className={
            "flex scrollbar-hide" +
            (stateTheme === themeEnum.LIGHT ? "-light" : "")
          }
        >
          <div className="flex xl:flex-row flex-col w-screen xl:p-24 py-24 px-12">
            <div className="grid h-96 flex-grow card mb-36 xl:mb-36">
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
                maxLength={100}
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
                    const fileList: Array<string | ArrayBuffer | null> = [];
                    for (let i = 0; i < event.target.files.length; i++) {
                      fileHandler(event.target.files[i])
                        .then((result) => fileList.push(result))
                        .then(() => {
                          if (
                            event.target.files &&
                            i + 1 === event.target.files.length
                          ) {
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
                className="btn btn-lg btn-outline btn-neutral xs:btn-wide sm:btn-wide gap-2"
                data-theme={stateTheme}
                type="submit"
                onClick={handleSubmit}
              >
                <BsPlusCircleFill />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
