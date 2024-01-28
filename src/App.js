import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Product from "./components/Product";
import About from "./components/About";
import Cart from "./components/Cart";
import News from "./components/News";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import SingleProduct from "./components/SingleProduct";
import SingleNews from "./components/SingleNews";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forbien from "./components/Auth/Forbien";
import Dashboard from "./components/Admin/Dashboard";
import Products from "./components/Admin/Products";
import NewsAdmin from "./components/Admin/News";
import Orders from "./components/Admin/Orders";
import Contacts from "./components/Admin/Contacts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/error/NotFound";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Profile from "./components/Info/Profile";
import OrderHistory from "./components/OrderHistory";
import ChatbotIcon from "./components/chatbot/ChatbotIcon";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import Success from "./components/success/Success";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <BrowserRouter>
        <div>
          <LoadingBar
            color="#F28123"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />

          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home setProgress={setProgress} />}></Route>

              <Route
                path="/about"
                element={<About setProgress={setProgress} />}
              ></Route>

              <Route
                path="/news"
                element={<News setProgress={setProgress} />}
              ></Route>
              <Route
                path="/news/:id"
                element={<SingleNews setProgress={setProgress} />}
              ></Route>

              <Route
                path="/contact"
                element={<Contact setProgress={setProgress} />}
              ></Route>

              <Route
                path="/product"
                element={<Product setProgress={setProgress} />}
              ></Route>
              <Route
                path="/product/:id"
                element={<SingleProduct setProgress={setProgress} />}
              ></Route>

              <Route
                path="/cart"
                element={<Cart setProgress={setProgress} />}
              ></Route>
              <Route
                path="/checkout"
                element={<Checkout setProgress={setProgress} />}
              ></Route>

              <Route
                path="/profile"
                element={<Profile setProgress={setProgress} />}
              ></Route>
              <Route
                path="/order-history"
                element={<OrderHistory setProgress={setProgress} />}
              ></Route>
            </Route>

            <Route path="/success" element={<Success />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forbien" element={<Forbien />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/products" element={<Products />}></Route>
            <Route path="/admin/news" element={<NewsAdmin />}></Route>
            <Route path="/admin/contacts" element={<Contacts />}></Route>
            <Route path="/admin/orders" element={<Orders />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ChatbotIcon />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
