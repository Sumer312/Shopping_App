import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useThemeStore, { themeEnum } from "./components/store/themeStore.ts";
import useAuthStore, { authEnum } from "./components/store/authStore.ts";
import Navbar from "./components/navbar.tsx";
import Footer from "./components/footer.tsx";
import SellerLogin from "./pages/auth/seller/login.tsx";
import SellerSignUp from "./pages/auth/seller/signup.tsx";
import ConsumerLogin from "./pages/auth/consumer/login.tsx";
import ConsumerSignUp from "./pages/auth/consumer/signup.tsx";
import Home from "./pages/index.tsx";
import AddProd from "./pages/add-product.tsx";
import MenHoodies from "./pages/men/hoodies.tsx";
import MenTops from "./pages/men/tops.tsx";
import MenBottoms from "./pages/men/bottoms.tsx";
import WomenBottoms from "./pages/women/bottoms.tsx";
import WomenHoodies from "./pages/women/hoodies.tsx";
import WomenTops from "./pages/women/tops.tsx";
import UnisexBottoms from "./pages/uinsex/bottoms.tsx";
import UnisexHoodies from "./pages/uinsex/hoodies.tsx";
import UnisexTops from "./pages/uinsex/tops.tsx";
import Details from "./pages/product/id.tsx";
import BadRequest from "./pages/bad-request.tsx";
import EditProd from "./pages/edit-product.tsx";
import MyProds from "./pages/my-products.tsx";
import BuyProd from "./pages/buy-product.tsx";
import MyOrders from "./pages/my-orders.tsx";
import "./styles/globals.css";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, stateStateTheme] = useState<string>(theme);
  const role = useAuthStore((state) => state.role);
  useEffect(() => {
    stateStateTheme(theme);
  }, [theme]);

  return (
    <div
      data-theme={stateTheme}
      className={
        stateTheme === themeEnum.LIGHT
          ? "bg-white  text-secondary-content"
          : "bg-black  text-neutral-content"
      }
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/seller/login"
            element={role !== authEnum.SELLER && <SellerLogin />}
          />
          <Route
            path="/auth/seller/signup"
            element={
              role !== authEnum.SELLER ? <SellerSignUp /> : <BadRequest />
            }
          />
          <Route
            path="/auth/consumer/signup"
            element={
              role !== authEnum.CONSUMER ? <ConsumerSignUp /> : <BadRequest />
            }
          />
          <Route
            path="/auth/consumer/login"
            element={
              role !== authEnum.CONSUMER ? <ConsumerLogin /> : <BadRequest />
            }
          />
          <Route
            path="/add-product"
            element={role === authEnum.SELLER ? <AddProd /> : <SellerLogin />}
          />
          <Route
            path="/edit-product/:prodId"
            element={role === authEnum.SELLER ? <EditProd /> : <SellerLogin />}
          />
          <Route
            path="/my-products"
            element={role === authEnum.SELLER ? <MyProds /> : <SellerLogin />}
          />
          <Route
            path="/buy-product/:prodId"
            element={
              role === authEnum.CONSUMER ? <BuyProd /> : <ConsumerLogin />
            }
          />
           <Route
            path="/my-orders"
            element={
              role === authEnum.CONSUMER ? <MyOrders /> : <ConsumerLogin />
            }
          />
          <Route path="/men/hoodies" element={<MenHoodies />} />
          <Route path="/men/tops" element={<MenTops />} />
          <Route path="/men/bottoms" element={<MenBottoms />} />
          <Route path="/women/hoodies" element={<WomenHoodies />} />
          <Route path="/women/tops" element={<WomenTops />} />
          <Route path="/women/bottoms" element={<WomenBottoms />} />
          <Route path="/unisex/hoodies" element={<UnisexHoodies />} />
          <Route path="/unisex/tops" element={<UnisexTops />} />
          <Route path="/unisex/bottoms" element={<UnisexBottoms />} />
          <Route path="/product/:prodId" element={<Details />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
