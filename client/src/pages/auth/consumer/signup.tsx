import { useReducer, Reducer, MouseEvent, useEffect, useState } from "react";
import axios from "../../../../api/axios";
import useThemeStore, { themeEnum } from "../../../components/store/themeStore";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../components/store/authStore";
import { ToastContainer, toast } from "react-toastify";

enum ActionEnum {
  SET_NAME = "SET_NAME",
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
  SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD",
}

interface StateType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ActionType {
  type: ActionEnum;
  payload: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string | undefined>(undefined);
  const changeRoleToConsumer = useAuthStore(
    (state) => state.changeRoleToConsumer
  );

  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);

  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    (state: StateType, action: ActionType): StateType => {
      switch (action.type) {
        case ActionEnum.SET_NAME:
          return {
            name: action.payload,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
          };
        case ActionEnum.SET_EMAIL:
          return {
            name: state.name,
            email: action.payload,
            password: state.password,
            confirmPassword: state.confirmPassword,
          };
        case ActionEnum.SET_PASSWORD:
          return {
            name: state.name,
            email: state.email,
            password: action.payload,
            confirmPassword: state.confirmPassword,
          };
        case ActionEnum.SET_CONFIRM_PASSWORD:
          return {
            name: state.name,
            email: state.email,
            password: state.password,
            confirmPassword: action.payload,
          };
        default:
          throw new Error(`Unhandled action type ${action.type}`);
      }
    },
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  );

  const notifyError = (text: string) => {
    toast.error(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: stateTheme === themeEnum.LIGHT ? "light" : "dark",
    });
  };
  async function postData(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const { name, email, password, confirmPassword } = state;
    if (!confirmPassword || !name || !password || !email) {
      return;
    } else if (password !== confirmPassword) {
      notifyError("Passwords don't match");
      return;
    } else {
      axios
        .post(`/consumer/signup`, {
          name: name,
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 201) {
            navigate("/");
            changeRoleToConsumer(response.data.token, response.data.id);
          }
        })
        .catch((err) => notifyError(err.message));
    }
  }
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />
      <div className="relative py-3 max-w-xl sm:mx-auto mt-20 mb-20">
        <div className="relative px-4 py-10 bg-accent shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1
                className={
                  "text-2xl text" +
                  (stateTheme === themeEnum.LIGHT ? "-secondary" : "-neutral") +
                  "-content font-semibold"
                }
              >
                Sign Up
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="name"
                    name="text"
                    type="text"
                    className={
                      "peer placeholder-transparent bg-accent h-10 w-full border-b-2 border-primary text" +
                      (stateTheme === themeEnum.LIGHT
                        ? "-secondary"
                        : "-neutral") +
                      "-content focus:outline-none focus:borer-rose-600"
                    }
                    placeholder="Name"
                    value={state.name}
                    onChange={(event) =>
                      dispatch({
                        type: ActionEnum.SET_NAME,
                        payload: event.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="name"
                    className={
                      "absolute left-0 -top-3.5 text-gray-100 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primary" +
                      (stateTheme === themeEnum.DARK ? "-content" : "") +
                      " peer-focus:text-sm"
                    }
                  >
                    Name
                  </label>
                </div>
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
                  <input
                    autoComplete="off"
                    id="ConfirmPassword"
                    name="ConfirmPassword"
                    type="password"
                    className={
                      "peer placeholder-transparent bg-accent h-10 w-full border-b-2 border-primary text" +
                      (stateTheme === themeEnum.LIGHT
                        ? "-secondary"
                        : "-neutral") +
                      "-content focus:outline-none focus:borer-rose-600"
                    }
                    placeholder="Confirm Password"
                    value={state.confirmPassword}
                    onChange={(event) =>
                      dispatch({
                        type: ActionEnum.SET_CONFIRM_PASSWORD,
                        payload: event.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="ConfirmPassword"
                    className={
                      "absolute left-0 -top-3.5 text-gray-100 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primary" +
                      (stateTheme === themeEnum.DARK ? "-content" : "") +
                      " peer-focus:text-sm"
                    }
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    onClick={(event) => postData(event)}
                    className="btn btn-primary"
                    data-theme={theme}
                  >
                    Submit
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
                    Already have an account{" "}
                    <Link
                      className="text-accent-content text-lg hover:underline"
                      to="/auth/consumer/login"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
