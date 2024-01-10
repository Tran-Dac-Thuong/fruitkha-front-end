import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import "./SingleProduct.scss";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogoCarouselSection from "./section/LogoCarouselSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/actions";
import { Helmet } from "react-helmet";
import PulseLoader from "react-spinners/PulseLoader";
import SkeletonSingleProduct from "./skeleton/SkeletonSingleProduct";

const override: CSSProperties = {
  textAlign: "center",
};

const SingleProduct = (props) => {
  const [relateProducts, setRelateProducts] = useState([]);
  const [chooseQuantity, setChooseQuantity] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [logged, setLogged] = useState(false);
  const [changeFruit, setChangeFruit] = useState("");
  const [loadingRelateProduct, setLoadingRelateProduct] = useState(false);
  const [loadingSingleProduct, setLoadingSingleProduct] = useState(false);

  const navigate = useNavigate();

  let { id } = useParams();

  const [detailProduct, setDetailProduct] = useState({});

  const dispatch = useDispatch();

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
          setCurrentUserId(verify.data.id);
          setLogged(true);
          navigate(`/product/${id}`);
        } else {
          navigate("/forbien");
          window.location.reload();
        }
      } else {
        navigate(`/product/${id}`);
      }
    };
    checkVerify();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          backgroundImage:
            "url('https://cdn-icons-png.flaticon.com/512/25/25638.png')",
          width: "40px",
          height: "40px",
          backgroundSize: "cover",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          backgroundImage:
            "url('https://cdn-icons-png.flaticon.com/512/25/25638.png')",
          width: "40px",
          height: "40px",
          backgroundSize: "cover",
          transform: "rotate(180deg)",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          nextArrow: false,
          prevArrow: false,
          dots: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          nextArrow: false,
          prevArrow: false,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `http://localhost:3434/api/relate-products/${id}`
      );
      if (res.data.relateProducts) {
        setRelateProducts(res.data.relateProducts);
        setLoadingRelateProduct(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3434/api/products/${id}`);

      if (res && res.data) {
        setDetailProduct(res.data.products);
        setLoadingSingleProduct(true);
        setChangeFruit("");
      } else {
        setDetailProduct({});
      }
    }
    fetchData();
  }, [changeFruit]);

  const handleAddToCart = async (product) => {
    if (logged === true) {
      dispatch(addToCart(currentUserId, product.id, chooseQuantity));
      Swal.fire({
        position: "center",
        icon: "success",
        title: language === "VN" ? "Đã thêm vào giỏ hàng" : "Added to cart",
        showConfirmButton: "OK",
      });
    } else {
      navigate("/login");
    }
  };

  const HandleMinus = () => {
    if (chooseQuantity === 1) {
      setChooseQuantity(chooseQuantity);
    } else {
      setChooseQuantity(chooseQuantity - 1);
    }
  };

  const HandlePlus = () => {
    setChooseQuantity(chooseQuantity + 1);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {language === "VN" ? `Sản phẩm đơn lẻ` : `Single Product`}
        </title>
      </Helmet>

      <div className="all_singleproduct_page">
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>
                    {language === "VN" ? (
                      <>Xem thêm chi tiết</>
                    ) : (
                      <>See more Details</>
                    )}
                  </p>
                  <h1>
                    {language === "VN" ? (
                      <>Sản phẩm đơn lẻ</>
                    ) : (
                      <>Single Product</>
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="single-product pt-150 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
              {loadingSingleProduct === true ? (
                <>
                  {" "}
                  <div className="col-md-5">
                    <div className="single-product-img">
                      <img
                        src={`http://localhost:3434/images/fruits/${detailProduct.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SkeletonSingleProduct />
                </>
              )}

              <div className="col-md-7">
                <div className="single-product-content">
                  <h3
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {detailProduct.product_name}
                  </h3>
                  <p
                    className="single-product-pricing"
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    <span>Per Kg</span> ${detailProduct.price}
                  </p>
                  <p
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {detailProduct.description}
                  </p>
                  <div className="single-product-form">
                    <div className="quantity_box">
                      <span className="minus" onClick={() => HandleMinus()}>
                        -
                      </span>
                      <span className="num">{chooseQuantity}</span>
                      <span className="plus" onClick={() => HandlePlus()}>
                        +
                      </span>
                    </div>
                    <button
                      className="cart-btn add_cart_btn"
                      onClick={() => handleAddToCart(detailProduct)}
                    >
                      <i className="fas fa-shopping-cart"></i>{" "}
                      {language === "VN" ? (
                        <>Thêm vào giỏ hàng</>
                      ) : (
                        <>Add to Cart</>
                      )}
                    </button>
                    <p
                      style={{
                        color: theme === "SUN" ? "#051922" : "white",
                      }}
                    >
                      <strong>
                        {language === "VN" ? <>Thể loại:</> : <>Categories:</>}{" "}
                      </strong>
                      {language === "VN" ? (
                        <>Trái cây, Hữu cơ</>
                      ) : (
                        <>Fruits, Organic</>
                      )}
                    </p>
                  </div>
                  <h4
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? <>Chia sẻ:</> : <>Share:</>}
                  </h4>
                  <ul className="product-share">
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/"
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.google.com/"
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        <i className="fab fa-google-plus-g"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/"
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="more-products pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="section-title">
                  {language === "VN" ? (
                    <h3>
                      <span className="orange-text">Những sản phẩm</span>
                      <span
                        style={{
                          marginLeft: "8px",
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        tương tự
                      </span>
                    </h3>
                  ) : (
                    <h3>
                      <span className="orange-text">Related</span>
                      <span
                        style={{
                          marginLeft: "8px",
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        Products
                      </span>
                    </h3>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              {loadingRelateProduct === true ? (
                <>
                  <Slider {...settings}>
                    {relateProducts && relateProducts.length > 0 ? (
                      relateProducts.map((item, index) => {
                        return (
                          <>
                            <div
                              className="col-lg-4 col-md-6 text-center"
                              style={{ minWidth: "100%" }}
                            >
                              <div className="single-product-item">
                                <div className="product-image">
                                  <Link
                                    to={`/product/${item.id}`}
                                    onClick={() => setChangeFruit("Changed")}
                                  >
                                    <img
                                      src={`http://localhost:3434/images/fruits/${item.image}`}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <h3
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  {item.product_name}
                                </h3>
                                <p
                                  className="product-price"
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  ${item.price}{" "}
                                </p>
                                <Link
                                  to={`/product/${item.id}`}
                                  className="cart-btn"
                                  onClick={() => setChangeFruit("Changed")}
                                >
                                  <i className="fas fa-shopping-cart"></i>{" "}
                                  {language === "VN" ? (
                                    <>Thêm vào giỏ hàng</>
                                  ) : (
                                    <>Add to Cart</>
                                  )}
                                </Link>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <span>
                        {" "}
                        {language === "VN" ? (
                          <>Không tìm thấy trái cây nào</>
                        ) : (
                          <>No fruits found</>
                        )}
                      </span>
                    )}
                  </Slider>
                </>
              ) : (
                <>
                  <PulseLoader cssOverride={override} color="#f28123" />
                </>
              )}
            </div>
          </div>
        </div>

        <LogoCarouselSection />
        <Footer />
      </div>
    </>
  );
};

export default SingleProduct;
