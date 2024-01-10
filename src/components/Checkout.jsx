import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import "./Checkout.scss";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import LogoCarouselSection from "./section/LogoCarouselSection";
import Swal from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PulseLoader from "react-spinners/PulseLoader";
import { fetchCartItems, removeFromCart } from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const override: CSSProperties = {
  marginTop: "200px",
  marginBottom: "200px",
  textAlign: "center",
};

const Checkout = (props) => {
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [billName, setBillName] = useState("");
  const [billEmail, setBillEmail] = useState("");
  const [billAddress, setBillAddress] = useState("");
  const [billPhone, setBillPhone] = useState("");
  const [billMessage, setBillMessage] = useState("");
  const [billNameValidate, setBillNameValidate] = useState("");
  const [billNameVNValidate, setBillNameVNValidate] = useState("");
  const [billEmailValidate, setBillEmailValidate] = useState("");
  const [billEmailVNValidate, setBillEmailVNValidate] = useState("");
  const [billAddressValidate, setBillAddressValidate] = useState("");
  const [billAddressVNValidate, setBillAddressVNValidate] = useState("");
  const [billPhoneValidate, setBillPhoneValidate] = useState("");
  const [billPhoneVNValidate, setBillPhoneVNValidate] = useState("");
  const [billMessageValidate, setBillMessageValidate] = useState("");
  const [billMessageVNValidate, setBillMessageVNValidate] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const listCarts = useSelector((state) => state.cart.listCarts);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const currentUser = useSelector((state) => state.user.currentUser);
  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    props.setProgress(100);
  }, []);

  useEffect(() => {
    let cookie = new Cookies();
    let checkVerify = async () => {
      let verify = await axios.get("http://localhost:3434/api/check-cookie", {
        headers: {
          "access-token": cookie.get("token"),
        },
      });
      if (verify.data.message === "Success") {
        if (verify.data.role === "CUSTOMER") {
          navigate("/checkout");
        } else {
          navigate("/forbien");
          window.location.reload();
        }
      } else {
        navigate("/login");
      }
    };
    checkVerify();
  }, []);

  useEffect(() => {
    dispatch(fetchCartItems(currentUser.id));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const updateTotal = () => {
        let newTotal = 0.0;

        // Thay đổi cách bạn chọn element tương ứng ở đây, có thể sử dụng ref hoặc classNamename
        document.querySelectorAll(".productSubtotal").forEach((element) => {
          newTotal += parseFloat(element.innerHTML);
        });
        setStatus("Total");

        setTotal(newTotal);
      };
      updateTotal();
    }, 100);
  }, [status]);

  const HandleCheckBillName = () => {
    let msg = "";
    let msgVN = "";
    if (billName.trim() === "") {
      msg = "Name is required!";
      msgVN = "Họ tên là bắt buộc!";
    }

    setBillNameValidate(msg);
    setBillNameVNValidate(msgVN);
    if (msg !== "" && msgVN !== "") {
      return false;
    } else {
      return true;
    }
  };

  const HandleCheckBillEmail = () => {
    let msg = "";
    let msgVN = "";
    let checkValidEmail = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{3}$/;

    if (billEmail.trim() === "") {
      msg = "Email is required!";
      msgVN = "Email là bắt buộc!";
    } else if (!checkValidEmail.test(billEmail)) {
      msg = "Invalid email!";
      msgVN = "Email không hợp lệ!";
    }

    setBillEmailValidate(msg);
    setBillEmailVNValidate(msgVN);
    if (msg !== "" && msgVN !== "") {
      return false;
    } else {
      return true;
    }
  };

  const HandleCheckBillAddress = () => {
    let msg = "";
    let msgVN = "";

    if (billAddress.trim() === "") {
      msg = "Address is required!";
      msgVN = "Địa chỉ là bắt buộc!";
    }

    setBillAddressValidate(msg);
    setBillAddressVNValidate(msgVN);
    if (msg !== "" && msgVN !== "") {
      return false;
    } else {
      return true;
    }
  };

  const HandleCheckBillPhone = () => {
    let msg = "";
    let msgVN = "";

    if (billPhone.trim() === "") {
      msg = "Phone number is required!";
      msgVN = "Số điện thoại là bắt buộc!";
    } else if (!/^[0-9]*$/.test(billPhone)) {
      msg = "Phone number must be numeric!";
      msgVN = "Số điện thoại phải là số!";
    }

    setBillPhoneValidate(msg);
    setBillPhoneVNValidate(msgVN);
    if (msg !== "" && msgVN !== "") {
      return false;
    } else {
      return true;
    }
  };

  const HandleCheckBillMessage = () => {
    let msg = "";
    let msgVN = "";

    if (billMessage.trim() === "") {
      msg = "Message is required!";
      msgVN = "Tin nhắn là bắt buộc!";
    }

    setBillMessageValidate(msg);
    setBillMessageVNValidate(msgVN);
    if (msg !== "" && msgVN !== "") {
      return false;
    } else {
      return true;
    }
  };

  const HandleShowHideValidate = () => {
    if (
      billName.trim() !== "" &&
      billEmail.trim() !== "" &&
      billAddress.trim() !== "" &&
      billPhone.trim() !== "" &&
      billMessage.trim() !== ""
    ) {
      return true;
    }
  };

  const HandlePlaceOrder = async () => {
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
      const newOrder = {
        status: "Shipping in progress",
        date: formattedDate,
        userId: carts.user_id,
        productId: carts.product_id,
        quantity: carts.quantity,
        totalCost: carts.productCartData.price * carts.quantity,
        paymentMethod: "PAYPAL",
      };

      await axios.post("http://localhost:3434/api/place-order", newOrder);

      dispatch(removeFromCart(carts.id, carts.user_id));
    }
    navigate("/");
  };

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

      await axios.post("http://localhost:3434/api/place-order", newOrder);

      dispatch(removeFromCart(carts.id, carts.user_id));
    }
  };

  const HandlePaymentMomo = async () => {
    let res = await axios.post("http://localhost:3434/api/payment-momo", {
      cost: total * 24000,
    });
    console.log("check momo: ", res);
    if (res && res.data.message === "OK") {
      window.location.href = res.data.payUrl;

      HandlePlaceOrderMomo();
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Kiểm tra sản phẩm` : `Checkout`}</title>
      </Helmet>
      <div className="all_checkout_page">
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>
                    {" "}
                    {language === "VN" ? (
                      <>Tươi và hữu cơ</>
                    ) : (
                      <>Fresh and Organic</>
                    )}
                  </p>
                  <h1>
                    {language === "VN" ? (
                      <>Kiểm tra sản phẩm</>
                    ) : (
                      <>Check Out Product</>
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading === true ? (
          <>
            <PulseLoader cssOverride={override} color="#f28123" />
          </>
        ) : (
          <>
            {listCarts && listCarts.length > 0 ? (
              <div
                className="checkout-section pt-150 pb-150"
                style={{
                  backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="checkout-accordion-wrap">
                        <div className="accordion" id="accordionExample">
                          <div className="card single-accordion">
                            <div className="card-header" id="headingOne">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  {language === "VN" ? (
                                    <>
                                      Vui lòng nhập đầy đủ thông tin trước khi
                                      thanh toán
                                    </>
                                  ) : (
                                    <>
                                      Please enter complete information before
                                      making payment
                                    </>
                                  )}
                                </button>
                              </h5>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <div className="billing-address-form">
                                  <form>
                                    <p>
                                      <input
                                        type="text"
                                        placeholder={
                                          language === "VN" ? "Họ tên" : "Name"
                                        }
                                        value={billName}
                                        onChange={(event) =>
                                          setBillName(event.target.value)
                                        }
                                        onKeyUp={HandleCheckBillName}
                                      />
                                      <span className="text-danger msg">
                                        {language === "VN"
                                          ? billNameVNValidate
                                          : billNameValidate}
                                      </span>
                                    </p>
                                    <p>
                                      <input
                                        type="text"
                                        placeholder="Email"
                                        value={billEmail}
                                        onChange={(event) =>
                                          setBillEmail(event.target.value)
                                        }
                                        onKeyUp={HandleCheckBillEmail}
                                      />
                                      <span className="text-danger msg">
                                        {language === "VN"
                                          ? billEmailVNValidate
                                          : billEmailValidate}
                                      </span>
                                    </p>
                                    <p>
                                      <input
                                        type="text"
                                        placeholder={
                                          language === "VN"
                                            ? "Địa chỉ"
                                            : "Address"
                                        }
                                        value={billAddress}
                                        onChange={(event) =>
                                          setBillAddress(event.target.value)
                                        }
                                        onKeyUp={HandleCheckBillAddress}
                                      />
                                      <span className="text-danger msg">
                                        {language === "VN"
                                          ? billAddressVNValidate
                                          : billAddressValidate}
                                      </span>
                                    </p>
                                    <p>
                                      <input
                                        type="text"
                                        placeholder={
                                          language === "VN"
                                            ? "Số điện thoại"
                                            : "Phone number"
                                        }
                                        value={billPhone}
                                        onChange={(event) =>
                                          setBillPhone(event.target.value)
                                        }
                                        onKeyUp={HandleCheckBillPhone}
                                      />
                                      <span className="text-danger msg">
                                        {language === "VN"
                                          ? billPhoneVNValidate
                                          : billPhoneValidate}
                                      </span>
                                    </p>
                                    <p>
                                      <textarea
                                        name="bill"
                                        id="bill"
                                        cols="30"
                                        rows="10"
                                        placeholder={
                                          language === "VN"
                                            ? "Nói gì đó"
                                            : "Say Something"
                                        }
                                        value={billMessage}
                                        onChange={(event) =>
                                          setBillMessage(event.target.value)
                                        }
                                        onKeyUp={HandleCheckBillMessage}
                                      ></textarea>
                                      <span className="text-danger msg">
                                        {language === "VN"
                                          ? billMessageVNValidate
                                          : billMessageValidate}
                                      </span>
                                    </p>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="order-details-wrap">
                        <table className="order-details">
                          <thead>
                            <tr>
                              <th>
                                {language === "VN" ? (
                                  <>Chi tiết đơn hàng của bạn</>
                                ) : (
                                  <>Your order Details</>
                                )}
                              </th>
                              <th>
                                {language === "VN" ? (
                                  <>Số lượng</>
                                ) : (
                                  <>Quantity</>
                                )}
                              </th>
                              <th>
                                {language === "VN" ? <>Giá</> : <>Price</>}
                              </th>
                            </tr>
                          </thead>

                          <tbody className="order-details-body">
                            <tr>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {language === "VN" ? (
                                  <>Sản phẩm</>
                                ) : (
                                  <>Product</>
                                )}
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {language === "VN" ? (
                                  <>Số lượng</>
                                ) : (
                                  <>Quantity</>
                                )}
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {language === "VN" ? (
                                  <>Tổng cộng</>
                                ) : (
                                  <>Total</>
                                )}
                              </td>
                            </tr>
                            {listCarts.map((item) => {
                              return (
                                <>
                                  <tr>
                                    <td
                                      style={{
                                        color:
                                          theme === "SUN" ? "#051922" : "white",
                                      }}
                                    >
                                      {item.productCartData.product_name}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                        color:
                                          theme === "SUN" ? "#051922" : "white",
                                      }}
                                    >
                                      {item.quantity}
                                    </td>
                                    <td
                                      style={{
                                        color:
                                          theme === "SUN" ? "#051922" : "white",
                                      }}
                                    >
                                      ${" "}
                                      <span className="productSubtotal">
                                        {item.quantity *
                                          item.productCartData.price}
                                      </span>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                          <tbody className="checkout-details">
                            <tr>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {language === "VN" ? (
                                  <>Tổng phụ</>
                                ) : (
                                  <>Subtotal</>
                                )}
                              </td>
                              <td
                                colSpan="2"
                                style={{
                                  textAlign: "center",
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                ${total}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {language === "VN" ? (
                                  <>Phí vận chuyển</>
                                ) : (
                                  <>Shipping</>
                                )}
                              </td>
                              <td
                                colSpan="2"
                                style={{
                                  textAlign: "center",
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                $35
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {language === "VN" ? (
                                  <>Tổng cộng</>
                                ) : (
                                  <>Total</>
                                )}
                              </td>
                              <td
                                colSpan="2"
                                style={{
                                  textAlign: "center",
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                ${total + 35}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {HandleShowHideValidate() ? (
                          <>
                            <div
                              style={{ marginTop: "30px" }}
                              className="paypal_box"
                            >
                              <PayPalScriptProvider
                                options={{
                                  clientId:
                                    "ARSjDBpew5ZTR_9MPat9pZ_hgt_DFdmEuybMpBZhnzOFCVK70m9TJxLG7-7UttjJbpIBtmmPcf1IQskF",
                                }}
                              >
                                <PayPalButtons
                                  createOrder={(data, actions) => {
                                    return actions.order.create({
                                      purchase_units: [
                                        {
                                          amount: {
                                            currency_code: "USD",
                                            value: total,
                                          },
                                        },
                                      ],
                                    });
                                  }}
                                  onApprove={(data, actions) => {
                                    return actions.order
                                      .capture()
                                      .then((details) => {
                                        console.log("details: ", details);
                                        HandlePlaceOrder();
                                        Swal.fire({
                                          position: "center",
                                          icon: "success",
                                          title:
                                            language === "VN"
                                              ? "Bạn đã đặt hàng thành công"
                                              : "You have placed your order successfully",
                                          showConfirmButton: "OK",
                                        });
                                      });
                                  }}
                                />
                              </PayPalScriptProvider>
                            </div>
                            <div
                              className="momo_btn"
                              style={{ cursor: "pointer" }}
                            >
                              {language === "VN" ? (
                                <span onClick={() => HandlePaymentMomo()}>
                                  Thanh toán qua ví Momo
                                </span>
                              ) : (
                                <span onClick={() => HandlePaymentMomo()}>
                                  Payment via Momo wallet
                                </span>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {theme === "SUN" ? (
                              <>
                                {" "}
                                <img
                                  src="../payment/paypal-btn.png"
                                  style={{
                                    minWidth: "385px",
                                    marginLeft: "-28px",
                                    minHeight: "165px",
                                    cursor: "not-allowed",
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                {" "}
                                <img
                                  src="../payment/paypal-btn-removebg.png"
                                  style={{
                                    minWidth: "385px",
                                    marginLeft: "-28px",
                                    minHeight: "165px",
                                    cursor: "not-allowed",
                                  }}
                                />
                              </>
                            )}

                            <div
                              className="momo_btn"
                              style={{ cursor: "not-allowed" }}
                            >
                              {language === "VN" ? (
                                <>Thanh toán qua ví Momo</>
                              ) : (
                                <>Payment via Momo wallet</>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <span
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "40px",
                  flexDirection: "column",
                  color: theme === "SUN" ? "#051922" : "white",
                }}
              >
                {language === "VN" ? (
                  <>Giỏ của bạn trống trơn</>
                ) : (
                  <>Your cart is empty</>
                )}
                <Link to="/product" className="shop_now_btn">
                  {language === "VN" ? <>Mua ngay</> : <>Shop now</>}
                </Link>
              </span>
            )}
          </>
        )}

        <LogoCarouselSection />

        <Footer />
      </div>
    </>
  );
};

export default Checkout;
