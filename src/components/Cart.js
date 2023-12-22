import React, { useEffect, useState, CSSProperties } from "react";
import Footer from "./footer/Footer";
import "./Cart.scss";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import LogoCarouselSection from "./section/LogoCarouselSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart } from "../redux/actions/actions";
import Swal from "sweetalert2";
import PulseLoader from "react-spinners/PulseLoader";
import { Helmet } from "react-helmet";

const override: CSSProperties = {
  marginTop: "200px",
  marginBottom: "200px",
  textAlign: "center",
};

const Cart = (props) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const listCarts = useSelector((state) => state.cart.listCarts);
  const isLoading = useSelector((state) => state.cart.isLoading);
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
          navigate("/cart");
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

  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = listCarts.slice(firstIndex, lastIndex);
  const npage = Math.ceil(listCarts.length / recordsPerPage);
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

  const HandleRemoveCart = async (cart) => {
    Swal.fire({
      title:
        language === "VN"
          ? `Bạn có chắc chắn muốn xóa giỏ hàng có tên <span class="text-danger">${cart.productCartData.product_name}</span>?`
          : `Are you sure you want to delete the cart named <span class="text-danger">${cart.productCartData.product_name}</span>?`,

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(cart.id, currentUser.id));
        setStatus("Remove");
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            language === "VN" ? "Đã xóa khỏi giỏ hàng" : "Removed from cart",
          showConfirmButton: "OK",
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Giỏ hàng` : `Cart`}</title>
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
                  <h1>{language === "VN" ? <>Giỏ hàng</> : <>Cart</>}</h1>
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
              <>
                <div
                  className="cart-section pt-150 pb-150"
                  style={{
                    backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8 col-md-12">
                        <div className="cart-table-wrap">
                          <table className="cart-table">
                            <thead className="cart-table-head">
                              <tr className="table-head-row">
                                <th className="product-remove"></th>
                                <th className="product-image">
                                  {language === "VN" ? (
                                    <>Hình ảnh sản phẩm</>
                                  ) : (
                                    <>Product Image</>
                                  )}
                                </th>
                                <th className="product-name">
                                  {language === "VN" ? <>Tên</> : <>Name</>}
                                </th>
                                <th className="product-price">
                                  {language === "VN" ? <>Giá</> : <>Price</>}
                                </th>
                                <th className="product-quantity">
                                  {language === "VN" ? (
                                    <>Số lượng</>
                                  ) : (
                                    <>Quantity</>
                                  )}
                                </th>
                                <th className="product-quantity">
                                  {language === "VN" ? (
                                    <>Tổng cộng</>
                                  ) : (
                                    <>Total</>
                                  )}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {records.map((item) => {
                                return (
                                  <>
                                    <tr
                                      className="table-body-row"
                                      key={item.id}
                                    >
                                      <td className="product-remove">
                                        <i
                                          style={{
                                            cursor: "pointer",
                                            color:
                                              theme === "SUN"
                                                ? "#051922"
                                                : "white",
                                          }}
                                          className="far fa-window-close"
                                          onClick={() => HandleRemoveCart(item)}
                                        ></i>
                                      </td>
                                      <td className="product-image">
                                        <img
                                          src={`http://localhost:3434/images/fruits/${item.productCartData.image}`}
                                          alt=""
                                        />
                                      </td>
                                      <td
                                        className="product-name"
                                        style={{
                                          color:
                                            theme === "SUN"
                                              ? "#051922"
                                              : "white",
                                        }}
                                      >
                                        {item.productCartData.product_name}
                                      </td>
                                      <td
                                        className="product-price"
                                        style={{
                                          color:
                                            theme === "SUN"
                                              ? "#051922"
                                              : "white",
                                        }}
                                      >
                                        ${item.productCartData.price}
                                      </td>

                                      <td
                                        className="product-total"
                                        style={{
                                          color:
                                            theme === "SUN"
                                              ? "#051922"
                                              : "white",
                                        }}
                                      >
                                        {item.quantity}
                                      </td>
                                      <td className="product-total ">
                                        <span
                                          style={{
                                            color:
                                              theme === "SUN"
                                                ? "#051922"
                                                : "white",
                                          }}
                                        >
                                          $
                                        </span>
                                        <span
                                          className="productSubtotal"
                                          style={{
                                            color:
                                              theme === "SUN"
                                                ? "#051922"
                                                : "white",
                                          }}
                                        >
                                          {item.quantity *
                                            item.productCartData.price}
                                        </span>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
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
                                  {language === "VN" ? (
                                    <>Trước</>
                                  ) : (
                                    <>Previous</>
                                  )}
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
                              {lastIndex < listCarts.length ? (
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
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="total-section">
                          <table className="total-table">
                            <thead className="total-table-head">
                              <tr className="table-total-row">
                                <th>
                                  {language === "VN" ? (
                                    <>Tổng cộng</>
                                  ) : (
                                    <>Total</>
                                  )}
                                </th>
                                <th>
                                  {language === "VN" ? <>Giá</> : <>Price</>}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="total-data">
                                <td
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  <strong>
                                    {language === "VN" ? (
                                      <>Tổng phụ:</>
                                    ) : (
                                      <>Subtotal:</>
                                    )}{" "}
                                  </strong>
                                </td>
                                <td
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  ${total}
                                </td>
                              </tr>
                              <tr className="total-data">
                                <td
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  <strong>
                                    {language === "VN" ? (
                                      <>Phí vận chuyển:</>
                                    ) : (
                                      <>Shipping:</>
                                    )}{" "}
                                  </strong>
                                </td>
                                <td
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  $35
                                </td>
                              </tr>
                              <tr className="total-data">
                                <td
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  <strong>
                                    {language === "VN" ? (
                                      <>Tổng cộng:</>
                                    ) : (
                                      <>Total:</>
                                    )}{" "}
                                  </strong>
                                </td>
                                <td
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  ${total + 35}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="cart-buttons">
                            <Link to="/checkout" className="boxed-btn black">
                              {language === "VN" ? (
                                <>Thanh toán</>
                              ) : (
                                <>Check Out</>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
                  backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
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

export default Cart;
