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
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineSync, AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer, Flip } from "react-toastify";

enum ActionEnum {
  SET_TITLE = "SET_TITLE",
  SET_SNIPPET = "SET_SNIPPET",
  SET_PRICE = "SET_PRICE",
  SET_DESCRIPTION = "SET_DESCRIPTION",
  SET_QUANTITY = "SET_QUANTITY",
  FETCH = "fetch",
}

interface StateType {
  title: string;
  snippet: string;
  price: number | undefined;
  quantity: number | undefined;
  description: string;
}

interface ActionType {
  type: ActionEnum;
  payload: string;
  FetchPayload: StateType;
}

export default function EditProd() {
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  const token = useAuthStore((state) => state.token);
  const ID = useAuthStore((state) => state.ID);
  const { prodId } = useParams();
  const dataFetched = useRef({
    title: "",
    snippet: "",
    price: undefined,
    quantity: undefined,
    description: "",
  });

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    (state: StateType, action: ActionType): StateType => {
      switch (action.type) {
        case ActionEnum.FETCH:
          if (action.FetchPayload) {
            return {
              title: action.FetchPayload.title,
              snippet: action.FetchPayload.snippet,
              price: action.FetchPayload.price,
              quantity: action.FetchPayload.quantity,
              description: action.FetchPayload.description,
            };
          }
          return dataFetched.current;
        case ActionEnum.SET_TITLE:
          return {
            title: action.payload,
            snippet: state.snippet,
            price: state.price,
            quantity: state.quantity,
            description: state.description,
          };
        case ActionEnum.SET_SNIPPET:
          return {
            title: state.title,
            snippet: action.payload,
            price: state.price,
            quantity: state.quantity,
            description: state.description,
          };
        case ActionEnum.SET_PRICE:
          return {
            title: state.title,
            snippet: state.snippet,
            price: parseFloat(action.payload),
            quantity: state.quantity,
            description: state.description,
          };
        case ActionEnum.SET_QUANTITY:
          return {
            title: state.title,
            snippet: state.snippet,
            price: state.price,
            quantity: parseFloat(action.payload),
            description: state.description,
          };
        case ActionEnum.SET_DESCRIPTION:
          return {
            title: state.title,
            snippet: state.snippet,
            price: state.price,
            quantity: state.quantity,
            description: action.payload,
          };

        default:
          throw new Error(`Unhandled action type ${action.type}`);
      }
    },
    dataFetched.current
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
    toast.success(text, {
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

  useEffect(() => {
    axios
      .get(`/seller/get-product/${prodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dataFetched.current = res.data.product;
        dispatch({
          type: ActionEnum.FETCH,
          payload: "",
          FetchPayload: res.data.product,
        });
        console.log(dataFetched.current);
      });
  }, [prodId, token]);

  async function handleUpdate(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const { title, snippet, description, price, quantity } = state;
    if (
      title !== "" &&
      snippet !== "" &&
      description !== "" &&
      price &&
      quantity
    ) {
      axios
        .post(
          `/seller/edit-product`,
          {
            title: title,
            snippet: snippet,
            description: description,
            price: price,
            quantity: quantity,
            sellerId: ID,
            prodId: prodId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            notifySuccess(response.data.message);
            setTimeout(() => {
              navigate(`/`);
            }, 3000);
          }
        })
        .catch((err) => {
          notifyError(err.message);
        });
    }
  }

  async function handleDelete(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const { title, snippet, description, price, quantity } = state;
    if (
      title !== "" &&
      snippet !== "" &&
      description !== "" &&
      price &&
      quantity
    ) {
      axios
        .post(
          `/seller/delete-product`,
          {
            sellerId: ID,
            prodId: prodId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            notifySuccess(response.data.message);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch((err) => notifyError(err.message));
    }
  }
  return (
    <div
      className={
        "flex overflow-y-hidden overflow-x-scroll scrollbar-hide" +
        (stateTheme === themeEnum.LIGHT ? "-light" : "")
      }
    >
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
            className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-lg p-10"
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_TITLE,
                payload: event.target.value,
                FetchPayload: dataFetched.current,
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
            value={state.snippet}
            className="input input-bordered input-accent w-72 xs:w-full xs:max-w-xs sm:max-w-sm sm:w-full md:max-w-sm md:w-full lg:w-full lg:max-w-sm xl:w-full xl:max-w-lg p-10"
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_SNIPPET,
                payload: event.target.value,
                FetchPayload: dataFetched.current,
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
            data-theme={stateTheme}
            onChange={(event) => {
              dispatch({
                type: ActionEnum.SET_DESCRIPTION,
                payload: event.target.value,
                FetchPayload: dataFetched.current,
              });
            }}
            placeholder="Description"
          ></textarea>
        </div>
        <div className="grid h-96 flex-grow card place-items-start mb-24 xs:mt-12 xl:-mt-8 lg:-mt-8 xl:ml-36">
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
                FetchPayload: dataFetched.current,
              });
            }}
            name="quantity"
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
                FetchPayload: dataFetched.current,
              });
            }}
            min="1"
          />
          <button
            className="btn btn-lg btn-outline btn-neutral xs:btn-wide sm:btn-wide gap-2 mt-8"
            data-theme={stateTheme}
            type="submit"
            onClick={handleUpdate}
          >
            <AiOutlineSync />
            Update Product
          </button>
          <button
            className="btn btn-lg btn-outline btn-error xs:btn-wide sm:btn-wide gap-2 mt-8"
            data-theme={stateTheme}
            type="submit"
            onClick={handleDelete}
          >
            <AiFillDelete />
            Delete Product
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}
