import CartCard from "../components/cartCard";
import styles from "../styles/Home.module.css";

export default function MyCart() {
  return (
    <main className={styles.main}>
      <CartCard title="abcd" snippet="abcd" quantity={1} id="asdf" maxQuantity={5} />
    </main>
  );
}
