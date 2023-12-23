import React, { useEffect, useState, CSSProperties } from "react";
import Footer from "./footer/Footer";
import "./OrderHistory.scss";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import LogoCarouselSection from "./section/LogoCarouselSection";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Helmet } from "react-helmet";

const override: CSSProperties = {
  marginTop: "200px",
  marginBottom: "200px",
  textAlign: "center",
};

const OrderHistory = (props) => {
  const [allOrders, setAllOrders] = useState([]);
  const [ordersEmpty, setOrdersEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

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
          navigate("/order-history");
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
    async function fetchData() {
      let res = await axios.get(
        `http://localhost:3434/api/get-orders-by-user/${currentUser.id}`
      );
      if (res && res.data.message === "OK") {
        setAllOrders(res.data.orders);
      } else if (res && res.data.message === "Not found") {
        setOrdersEmpty(true);
      }
    }
    fetchData();
  }, []);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allOrders.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allOrders.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const PrePage = () => {
    if (currentPage !== firstIndex && firstIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const NextPage = () => {
    if (currentPage !== lastIndex && currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const ChangePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {language === "VN" ? `Lịch sử đơn hàng` : `Order History`}
        </title>
      </Helmet>
      <div className="all_cart_page">
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>
                    {language === "VN" ? (
                      <>Tươi và hữu cơ</>
                    ) : (
                      <>Fresh and Organic</>
                    )}
                  </p>
                  <h1>
                    {language === "VN" ? (
                      <>Lịch sử đơn hàng</>
                    ) : (
                      <>Order History</>
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="checkout-section pt-150 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container table-responsive">
            {allOrders && allOrders.length > 0 ? (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        {language === "VN" ? <>Đơn hàng</> : <>Order</>}
                      </th>
                      <th
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        {language === "VN" ? <>Số lượng</> : <>Quantity</>}
                      </th>
                      <th
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        {language === "VN" ? (
                          <>Phương thức thanh toán</>
                        ) : (
                          <>Payment method</>
                        )}
                      </th>
                      <th
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        {language === "VN" ? <>Trạng thái</> : <>Status</>}
                      </th>
                      <th
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        {language === "VN" ? (
                          <>Tổng chi phí</>
                        ) : (
                          <>Total cost</>
                        )}
                      </th>
                      <th
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        {language === "VN" ? (
                          <>Thời gian mua hàng</>
                        ) : (
                          <>Purchase time</>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records && records.length > 0 ? (
                      records.map((item, index) => {
                        return (
                          <>
                            <tr>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {item.productOrderData.product_name}
                              </td>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {item.quantity}
                              </td>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {item.payment_method === "PAYPAL" ? (
                                  <img
                                    src="./admin/assets/img/paypal.png"
                                    style={{ borderRadius: "3px" }}
                                    width="40px"
                                  />
                                ) : (
                                  <img
                                    src="./admin/assets/img/momo.png"
                                    style={{ borderRadius: "3px" }}
                                    width="40px"
                                  />
                                )}
                              </td>
                              <td>
                                {item.status === "Shipping in progress" ? (
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                    className="text-danger"
                                  >
                                    {language === "VN" ? (
                                      <>Đang vận chuyển</>
                                    ) : (
                                      <>Shipping in progress</>
                                    )}
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                    className="text-success"
                                  >
                                    {language === "VN" ? (
                                      <>Vận chuyển hoàn tất</>
                                    ) : (
                                      <>Complete shipping</>
                                    )}
                                  </span>
                                )}
                              </td>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                ${item.total_cost}
                              </td>
                              <td
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {item.date}
                              </td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
                <ul
                  className="pagination mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <li className="page-item">
                    {currentPage !== 1 ? (
                      <button
                        className="page-link pre_btn"
                        onClick={() => PrePage()}
                      >
                        {language === "VN" ? <>Trước</> : <>Previous</>}
                      </button>
                    ) : (
                      <></>
                    )}
                  </li>
                  {numbers.map((n, i) => {
                    return (
                      <li
                        className={`page-item ${
                          currentPage === n ? "active" : ""
                        }`}
                        key={i}
                      >
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => ChangePage(n)}
                        >
                          {n}
                        </a>
                      </li>
                    );
                  })}

                  <li className="page-item">
                    {lastIndex < allOrders.length ? (
                      <button
                        className="page-link next_btn"
                        onClick={() => NextPage()}
                      >
                        {language === "VN" ? <>Sau</> : <>Next</>}
                      </button>
                    ) : (
                      <></>
                    )}
                  </li>
                </ul>
              </>
            ) : ordersEmpty === false ? (
              <PulseLoader cssOverride={override} color="#f28123" />
            ) : (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "40px",
                  flexDirection: "column",
                  color: theme === "SUN" ? "#051922" : "white",
                }}
              >
                {language === "VN" ? (
                  <>Đơn hàng của bạn trống</>
                ) : (
                  <>Your order is empty</>
                )}
                <Link to="/product" className="shop_now_btn">
                  {language === "VN" ? <>Mua ngay</> : <>Shop now</>}
                </Link>
              </span>
            )}
          </div>
        </div>

        <LogoCarouselSection />

        <Footer />
      </div>
    </>
  );
};

export default OrderHistory;
