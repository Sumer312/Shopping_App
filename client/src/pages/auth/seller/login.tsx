import { useReducer, Reducer, MouseEvent, useEffect, useState } from "react";
import axios from "../../../../api/axios";
import useThemeStore, { themeEnum } from "../../../components/store/themeStore";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../components/store/authStore";
import { ToastContainer, toast, Flip } from "react-toastify";

enum ActionEnum {
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
}

interface StateType {
  email: undefined | string;
  password: undefined | string;
}

interface ActionType {
  type: ActionEnum;
  payload: string;
}

export default function Login() {
  const changeRoleToSeller = useAuthStore((state) => state.changeRoleToSeller);
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    (state: StateType, action: ActionType): StateType => {
      switch (action.type) {
        case ActionEnum.SET_EMAIL:
          return {
            email: action.payload,
            password: state.password,
          };
        case ActionEnum.SET_PASSWORD:
          return {
            email: state.email,
            password: action.payload,
          };
        default:
          throw new Error(`Unhandled action type ${action.type}`);
      }
    },
    {
      email: undefined,
      password: undefined,
    }
  );

  const notifyError = (text: string) => {
    toast.error(text, {
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

  async function postData(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const { email, password } = state;
    if (!password || !email) {
      return;
    } else {
      axios
        .post(`/seller/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
            changeRoleToSeller(response.data.token, response.data.id);
          }
        })
        .catch((err) => {
          notifyError(
            err.response && err.response.data
              ? err.response.data.message
              : err.message
          );
        });
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center py-12">
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
      />
      <div className="relative mx-auto py-3 sm:max-w-xl">
        <div className="relative bg-accent shadow-lg rounded-xl p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl text-accent-content font-semibold">Seller Login</h1>
            <div className="divide-y divide-gray-200">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className={
                        "peer placeholder-transparent bg-accent h-10 w-full border-b-2 border-primary text" +
                        (stateTheme === themeEnum.LIGHT
                          ? "-secondary"
                          : "-neutral") +
                        "-content focus:outline-none focus:borer-rose-600"
                      }
                      placeholder="Email address"
                      value={state.email}
                      onChange={(event) =>
                        dispatch({
                          type: ActionEnum.SET_EMAIL,
                          payload: event.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="email"
                      className={
                        "absolute left-0 -top-3.5 text-gray-100 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primary" +
                        (stateTheme === themeEnum.DARK ? "-content" : "") +
                        " peer-focus:text-sm"
                      }
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className={
                        "peer placeholder-transparent bg-accent h-10 w-full border-b-2 border-primary text" +
                        (stateTheme === themeEnum.LIGHT
                          ? "-secondary"
                          : "-neutral") +
                        "-content focus:outline-none focus:borer-rose-600"
                      }
                      placeholder="Password"
                      value={state.password}
                      onChange={(event) =>
                        dispatch({
                          type: ActionEnum.SET_PASSWORD,
                          payload: event.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="password"
                      className={
                        "absolute left-0 -top-3.5 text-gray-100 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primary" +
                        (stateTheme === themeEnum.DARK ? "-content" : "") +
                        " peer-focus:text-sm"
                      }
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(event) => postData(event)}
                      className="btn btn-primary"
                      data-theme={theme}
                    >
                      Login
                    </button>
                    <p
                      className={
                        "mt-4 text" +
                        (stateTheme === themeEnum.LIGHT
                          ? "-secondary"
                          : "-neutral") +
                        "-content text-sm"
                      }
                    >
                      Don't have an account?{" "}
                      <Link
                        className="text-accent-content text-lg hover:underline"
                        to="/auth/seller/signup"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
