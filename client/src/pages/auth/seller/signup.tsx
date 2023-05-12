import { useReducer, Reducer, MouseEvent, useEffect, useState } from "react";
import axios from "../../../../api/axios";
import useThemeStore, { themeEnum } from "../../../components/store/themeStore";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../components/store/authStore";

enum ActionEnum {
  SET_NAME = "SET_NAME",
  SET_EMAIL = "SET_EMAIL",
  SET_PASSWORD = "SET_PASSWORD",
  SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD",
}

interface StateType {
  name: undefined | string;
  email: undefined | string;
  password: undefined | string;
  confirmPassword: undefined | string;
}

interface ActionType {
  type: ActionEnum;
  payload: string;
}

export default function SignUp() {
  const changeRoleToSeller = useAuthStore((state) => state.changeRoleToSeller);
  const navigate = useNavigate()
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();

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

  async function postData(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const { name, email, password, confirmPassword } = state;
    if (!confirmPassword || !name || !password || !email) {
      return;
    } else if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    } else {
      try {
        const response = await axios.post(`/seller/signup`, {
          name: name,
          email: email,
          password: password,
        });
        if (response.status === 201) {
          navigate("/")
          changeRoleToSeller(response.data.token, response.data.id);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className={
            stateTheme === themeEnum.DARK
              ? "absolute inset-0 bg-gradient-to-r from-violet-200 to-violet-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
              : "absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
          }
        ></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl text-black font-semibold">
                Seller Sign Up
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="name"
                    name="text"
                    type="text"
                    className="peer placeholder-transparent bg-white h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
                    className="peer placeholder-transparent bg-white h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
                    className="peer placeholder-transparent bg-white h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
                    className="peer placeholder-transparent bg-white h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    onClick={(event) => postData(event)}
                    data-theme={theme}
                    className="btn btn-outline btn-accent"
                  >
                    Submit
                  </button>
                  <p className="mt-4 text-grey-600 text-sm">
                    Already have an account{" "}
                    <Link
                      className="text-blue-600 hover:underline"
                      to="/auth/seller/login"
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
