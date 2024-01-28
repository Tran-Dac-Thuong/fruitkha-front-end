import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Success.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/actions";

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const listCarts = useSelector((state) => state.cart.listCarts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      searchParams.get("partnerCode") === "MOMO" &&
      searchParams.get("message") === "Successful."
    ) {
      const HandlePlaceOrderMomo = async () => {
        let timestamp = Date.now();

        let date = new Date(timestamp);

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

        for (const carts of listCarts) {
          console.log("check cartsss:", carts);
          const newOrder = {
            status: "Shipping in progress",
            date: formattedDate,
            userId: carts.user_id,
            productId: carts.product_id,
            quantity: carts.quantity,
            totalCost: carts.productCartData.price * carts.quantity,
            paymentMethod: "MOMO",
          };

          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/place-order`,
            newOrder
          );

          dispatch(removeFromCart(carts.id, carts.user_id));
        }
      };

      HandlePlaceOrderMomo();
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      searchParams.get("partnerCode") === "MOMO" &&
      searchParams.get("message") === "Transaction+denied+by+user."
    ) {
      navigate("/");
      window.location.reload();
    }
  }, [searchParams]);

  return (
    <>
      <div className="card_boxxx">
        <div className="cardddd">
          <div
            style={{
              borderRadius: "200px",
              height: "200px",
              width: "200px",
              background: "#F8FAF5",
              margin: "0 auto",
            }}
          >
            <i id="markkk" className="checkmark">
              ✓
            </i>
          </div>
          <h1 className="success_titleee">Success</h1>
          <p className="success_contenttt">
            We received your purchase request;
            <br /> We will contact you later!
          </p>
          <br />
          <br />
          <Link className="back_homeeee" to="/">
            Go Back To Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
