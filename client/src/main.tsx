import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import DrawerLayout from "./components/drawerLayout.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DrawerLayout>
    <App />
  </DrawerLayout>
);
