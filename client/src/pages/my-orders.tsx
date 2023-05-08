import styles from "../styles/Home.module.css";
import OrdersCard from "../components/ordersCard";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuthStore from "../components/store/authStore";
import { ordersType } from "../../types";
import { Triangle } from "react-loader-spinner";

export default function MyOrders() {
  const ID = useAuthStore((state) => state.ID);
  const [orders, setOrders] = useState<Array<ordersType>>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/consumer/my-orders/${ID}`)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setOrders(res.data.orders);
        }, 500);
      })
      .catch(() => setError(true));
  }, [ID]);
  return orders ? (
    <main className={styles.main}>
      <div className="grid gap-16 xl:grid-cols-4 xs:grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {orders.map((order) =>
          order.products.map((ele) => (
            <OrdersCard
              key={ele.product._id}
              title={ele.product.title}
              snippet={ele.product.snippet}
              quantity={ele.quantity}
              id={order._id}
            />
          ))
        )}
      </div>
    </main>
  ) : error === false ? (
    <main className={styles.main}>
      <Triangle
        height="200"
        width="200"
        color="hsl(var(--a))"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </main>
  ) : (
    <main className={styles.main}>
      <h1>No orders found</h1>
    </main>
  );
}
