import axios from "../../api/axios";
import { orderCardType } from "../../types";
import { MouseEvent } from "react";
import { BsXCircleFill } from "react-icons/bs";
import useAuthStore from "./store/authStore";

export default function OrdersCard(props: orderCardType) {
  const token = useAuthStore(state => state.token);
  const handleDelete = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await axios.delete(`/consumer/cancel-order/${props.id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.snippet}</p>
        <p>{props.quantity}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-block gap-2"
            onClick={(event) => {
              handleDelete(event);
              window.location.reload();
            }}
          >
            <BsXCircleFill /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
