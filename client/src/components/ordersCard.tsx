import axios from "../../api/axios";
import { orderCardType } from "../../types";
import { MouseEvent } from "react";

export default function OrdersCard(props: orderCardType) {
  const handleDelete = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await axios.delete(`/consumer/cancel-order/${props.id}`);
  };
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.snippet}</p>
        <p>{props.quantity}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-block"
            onClick={(event) => {
              handleDelete(event);
              window.location.reload()
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
