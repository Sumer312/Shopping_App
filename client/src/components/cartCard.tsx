import axios from "../../api/axios";
import { useState, MouseEvent } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiPlus, TiMinus } from "react-icons/ti";
import { cartCardType } from "../../types";
import useAuthStore from "./store/authStore";

export default function CartCard(props: cartCardType) {
  const [quantity, setQuantity] = useState<number>(props.quantity);
  const ID = useAuthStore((state) => state.ID);
  const token = useAuthStore((state) => state.token);
  const handleDelete = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await axios.post(
      "/consumer/delete-from-cart",
      {
        consumerId: ID,
        prodId: props.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const incrementer = async (incrementedQuantity: number) => {
    if (incrementedQuantity <= props.maxQuantity) {
      const res = await axios.post(
        "/consumer/increment-cart",
        {
          consumerId: ID,
          prodId: props.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setQuantity(incrementedQuantity);
        window.location.reload();
      }
    }
  };

  const decrementer = async (decrementedQuantity: number) => {
    if (decrementedQuantity >= 1) {
      const res = await axios.post(
        "/consumer/decrement-cart",
        {
          consumerId: ID,
          prodId: props.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setQuantity(decrementedQuantity);
        window.location.reload();
      }
    }
  };

  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.snippet}</p>
        <div className="card-actions justify-end mt-4">
          <div className="flex mr-auto mb-4">
            {quantity > 1 ? (
              <button
                className="btn btn-sm"
                onClick={() => decrementer(quantity - 1)}
              >
                <TiMinus />
              </button>
            ) : (
              <button
                className="btn btn-sm"
                onClick={(event) => {
                  handleDelete(event);
                  window.location.reload();
                }}
              >
                <AiFillDelete />
              </button>
            )}

            <p className=" text-lg px-3">{quantity}</p>
            <button
              className={
                quantity !== props.maxQuantity
                  ? "btn btn-sm"
                  : "btn btn-disabled btn-sm"
              }
              onClick={() => incrementer(quantity + 1)}
            >
              <TiPlus />
            </button>
          </div>
          {quantity > 1 && (
            <button
              className="btn btn-sm btn-block"
              onClick={(event) => {
                handleDelete(event);
                window.location.reload();
              }}
            >
              <AiFillDelete />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
