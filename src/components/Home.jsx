import React, { useEffect, useState } from "react";
import "./Home.scss";
import Footer from "./footer/Footer";
import { Link } from "react-router-dom";
import CheckCookie from "./Auth/CheckCookie";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LogoCarouselSection from "./section/LogoCarouselSection";
import { useSelector } from "react-redux";
import SkeletonNews from "./skeleton/SkeletonNews";
import PulseLoader from "react-spinners/PulseLoader";
import { Helmet } from "react-helmet";

const override: CSSProperties = {
  textAlign: "center",
};

const Home = (props) => {
  const [someNews, setSomeNews] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingSomeNews, setLoadingSomeNews] = useState(false);
  const [loadingHomeProducts, setLoadingHomeProducts] = useState(false);

  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    props.setProgress(100);
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

  const settingsTestimonial = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          nextArrow: false,
          prevArrow: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
        `${process.env.REACT_APP_BACKEND_URL}/api/some-news`
      );
      if (res.data.someNews) {
        setSomeNews(res.data.someNews);
        setLoadingSomeNews(true);
      } else {
        setSomeNews([]);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`
      );
      if (res.data.products) {
        setAllProducts(res.data.products);
        setLoadingHomeProducts(true);
      } else {
        setAllProducts([]);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fruitkha</title>
      </Helmet>
      <CheckCookie url={"/"} />
      <div className="all_home_page">
        <div className="hero-area hero-bg">
          <div className="container hero_sec">
            <div className="row">
              <div className="col-lg-9 offset-lg-2 text-center">
                <div className="hero-text">
                  <div className="hero-text-tablecell">
                    <p className="subtitle">
                      {" "}
                      {language === "VN" ? (
                        <>Tươi & Hữu cơ</>
                      ) : (
                        <>Fresh & Organic</>
                      )}
                    </p>
                    <h1>
                      {" "}
                      {language === "VN" ? (
                        <>Trái cây ngon theo mùa</>
                      ) : (
                        <>Delicious Seasonal Fruits</>
                      )}
                    </h1>
                    <div className="hero-btns">
                      <Link to="/product" className="boxed-btn">
                        {language === "VN" ? (
                          <>Bộ sưu tập trái cây</>
                        ) : (
                          <>Fruit Collection</>
                        )}
                      </Link>
                      <Link to="/contact" className="bordered-btn">
                        {language === "VN" ? (
                          <>Liên hệ chúng tôi</>
                        ) : (
                          <>Contact Us</>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="list-section pt-80 pb-80 list_section_test"
          style={{ backgroundColor: theme === "SUN" ? "#f5f5f5" : "#1a1a1a" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="list-box d-flex align-items-center">
                  <div className="list-icon">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <div className="content">
                    <h3
                      style={{ color: theme === "SUN" ? "#051922" : "white" }}
                    >
                      {language === "VN" ? (
                        <>Miễn phí vận chuyển</>
                      ) : (
                        <>Free Shipping</>
                      )}
                    </h3>
                    <p style={{ color: theme === "SUN" ? "#051922" : "white" }}>
                      {language === "VN" ? (
                        <>Vận chuyển trên toàn quốc</>
                      ) : (
                        <>Nationwide shipping</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="list-box d-flex align-items-center">
                  <div className="list-icon">
                    <i className="fas fa-phone-volume"></i>
                  </div>
                  <div className="content">
                    <h3
                      style={{ color: theme === "SUN" ? "#051922" : "white" }}
                    >
                      {language === "VN" ? <>Hỗ trợ 24/7</> : <>24/7 Support</>}
                    </h3>
                    <p style={{ color: theme === "SUN" ? "#051922" : "white" }}>
                      {language === "VN" ? (
                        <>Nhận hỗ trợ cả ngày</>
                      ) : (
                        <>Get support all day</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="list-box d-flex justify-content-start align-items-center">
                  <div className="list-icon">
                    <i className="fas fa-sync"></i>
                  </div>
                  <div className="content">
                    <h3
                      style={{ color: theme === "SUN" ? "#051922" : "white" }}
                    >
                      {language === "VN" ? <>Đền bù</> : <>Refund</>}
                    </h3>
                    <p style={{ color: theme === "SUN" ? "#051922" : "white" }}>
                      {language === "VN" ? (
                        <>Nhận hoàn tiền trong vòng 3 ngày!</>
                      ) : (
                        <>Get refund within 3 days!</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="product-section pt-150 pb-150"
          style={{ backgroundColor: theme === "SUN" ? "#fff" : "#1a1a1a" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="section-title">
                  {language === "VN" ? (
                    <h3>
                      <span className="orange-text">Các sản phẩm</span>
                      <span
                        style={{
                          marginLeft: "8px",
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        của chúng tôi
                      </span>
                    </h3>
                  ) : (
                    <h3>
                      <span className="orange-text">Our</span>
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
              {loadingHomeProducts === true ? (
                <>
                  <Slider {...settings}>
                    {allProducts && allProducts.length > 0 ? (
                      allProducts.map((item, index) => {
                        return (
                          <>
                            <div
                              className="col-lg-4 col-md-6 text-center"
                              style={{ minWidth: "100%" }}
                            >
                              <div className="single-product-item">
                                <div className="product-image">
                                  <Link to={`/product/${item.id}`}>
                                    <img
                                      src={`${process.env.REACT_APP_BACKEND_URL}/images/fruits/${item.image}`}
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
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                  className="product-price"
                                >
                                  ${item.price}{" "}
                                </p>
                                <Link
                                  to={`/product/${item.id}`}
                                  className="cart-btn"
                                >
                                  <i className="fas fa-shopping-cart"></i>
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
                      <span
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
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

        <section
          className="cart-banner pt-100 pb-100"
          style={{
            backgroundColor: theme === "SUN" ? "#f5f5f5" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row clearfix">
              <div className="image-column col-lg-6">
                <div className="image">
                  <div className="price-box">
                    <div className="inner-price">
                      <span className="price">
                        <strong>30%</strong> <br />
                        {language === "VN" ? (
                          <>giảm giá mỗi kg</>
                        ) : (
                          <>off per kg </>
                        )}
                      </span>
                    </div>
                  </div>
                  <img src="assets/img/a.jpg" alt="" />
                </div>
              </div>
              <div className="content-column col-lg-6">
                <h3>
                  <span className="orange-text">
                    {language === "VN" ? <>Thỏa thuận</> : <>Deal</>}
                  </span>
                  <span
                    style={{
                      marginLeft: "8px",
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? <>của tháng</> : <> of the month</>}
                  </span>
                </h3>
                <h4 style={{ color: theme === "SUN" ? "#051922" : "white" }}>
                  {language === "VN" ? <>Dâu Hikan</> : <>Hikan Strawberry</>}
                </h4>
                <div
                  className="text"
                  style={{ color: theme === "SUN" ? "#051922" : "white" }}
                >
                  {language === "VN" ? (
                    <>
                      Dâu Hikan, hay còn được gọi là dâu Hikanoka, là một loại
                      dâu đặc biệt có nguồn gốc từ vùng Hikana, một khu vực nổi
                      tiếng với đất đỏ mịn và khí hậu ôn đới ở Nhật Bản. Dâu
                      Hikan nổi bật với hương vị ngọt ngào và hấp dẫn, cũng như
                      màu sắc đỏ tươi rực rỡ của trái dâu khi chín.
                    </>
                  ) : (
                    <>
                      Hikan strawberry, also known as Hikanoka strawberry, is a
                      special type of strawberry originating from the Hikana
                      region, an area famous for its fine red soil and temperate
                      climate in Japan. Hikan strawberries stand out with their
                      sweet and attractive flavor, as well as the bright red
                      color of the strawberry when ripe.
                    </>
                  )}
                </div>

                <Link to="/product" className="cart-btn mt-3">
                  <i className="fas fa-shopping-cart"></i>{" "}
                  {language === "VN" ? (
                    <>Thêm vào giỏ hàng</>
                  ) : (
                    <>Add to Cart</>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div
          className="testimonail-section pt-150 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "#f5f5f5" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="">
              <div className="col-lg-10 offset-lg-1 text-center">
                <div className="testimonial-sliders">
                  <Slider {...settingsTestimonial}>
                    <div className="single-testimonial-slider">
                      <div className="client-avater">
                        <img src="assets/img/avaters/avatar1.png" alt="" />
                      </div>
                      <div className="client-meta">
                        <h3
                          style={{
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          Saira Hakim{" "}
                          <span
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>Chủ cửa hàng địa phương</>
                            ) : (
                              <>Local shop owner</>
                            )}
                          </span>
                        </h3>
                        <p className="testimonial-body">
                          {language === "VN" ? (
                            <>
                              Trái cây được chọn lựa kỹ lưỡng, đảm bảo độ tươi
                              ngon và chất lượng. Giao diện trực tuyến thân
                              thiện và dễ sử dụng, giúp tôi dễ dàng chọn lựa và
                              đặt hàng mọi lúc, mọi nơi. Đây thực sự là sự thuận
                              tiện tối ưu cho những người có lối sống bận rộn.
                            </>
                          ) : (
                            <>
                              Fruits are carefully selected, ensuring freshness
                              and quality. The online interface is friendly and
                              easy to use, making it easy for me to choose and
                              order anytime, anywhere. This truly is the
                              ultimate convenience for those with busy
                              lifestyles.
                            </>
                          )}
                        </p>
                        <div className="last-icon">
                          <i className="fas fa-quote-right"></i>
                        </div>
                      </div>
                    </div>
                    <div className="single-testimonial-slider">
                      <div className="client-avater">
                        <img src="assets/img/avaters/avatar2.png" alt="" />
                      </div>
                      <div className="client-meta">
                        <h3
                          style={{
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          David Niph{" "}
                          <span
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>Chủ cửa hàng địa phương</>
                            ) : (
                              <>Local shop owner</>
                            )}
                          </span>
                        </h3>
                        <p className="testimonial-body">
                          {language === "VN" ? (
                            <>
                              Rõ ràng về nguồn gốc và quy trình sản xuất, đồng
                              thời hỗ trợ việc lựa chọn trái cây phù hợp với chế
                              độ dinh dưỡng cá nhân. Giao hàng đúng hẹn và dịch
                              vụ khách hàng chuyên nghiệp đã làm tôi cảm thấy
                              tin tưởng hơn về sự lựa chọn của mình.
                            </>
                          ) : (
                            <>
                              Be clear about the origin and production process,
                              and support the selection of fruits suitable for
                              personal nutrition. On-time delivery and
                              professional customer service have made me feel
                              more confident about my choice.r
                            </>
                          )}
                        </p>
                        <div className="last-icon">
                          <i className="fas fa-quote-right"></i>
                        </div>
                      </div>
                    </div>
                    <div className="single-testimonial-slider">
                      <div className="client-avater">
                        <img src="assets/img/avaters/avatar3.png" alt="" />
                      </div>
                      <div className="client-meta">
                        <h3
                          style={{
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          Jacob Sikim{" "}
                          <span
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>Chủ cửa hàng địa phương</>
                            ) : (
                              <>Local shop owner</>
                            )}
                          </span>
                        </h3>
                        <p className="testimonial-body">
                          {language === "VN" ? (
                            <>
                              Việc chọn lựa trái cây từ khắp nơi trên thế giới
                              giúp tôi khám phá và thưởng thức những hương vị
                              mới mẻ. Dịch vụ khách hàng nhanh nhẹn và hỗ trợ
                              tận tình, khiến trải nghiệm mua sắm trái cây trực
                              tuyến trở nên thú vị và đáng nhớ.
                            </>
                          ) : (
                            <>
                              Choosing fruit from around the world helps me
                              discover and enjoy new flavors. Responsive
                              customer service and dedicated support make the
                              online fruit shopping experience enjoyable and
                              memorable.
                            </>
                          )}
                        </p>
                        <div className="last-icon">
                          <i className="fas fa-quote-right"></i>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="abt-section pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="abt-bg">
                  <a
                    href="https://www.youtube.com/watch?v=DBLlFWYcIGQ"
                    className="video-play-btn popup-youtube"
                  >
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="abt-text">
                  <p
                    className="top-sub"
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? (
                      <>Kể từ năm 1999</>
                    ) : (
                      <>Since Year 1999</>
                    )}
                  </p>
                  <h2>
                    {language === "VN" ? (
                      <span
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        Chúng tôi là
                      </span>
                    ) : (
                      <span
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        We are
                      </span>
                    )}{" "}
                    <span className="orange-text">Fruitkha</span>
                  </h2>
                  <p
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? (
                      <>
                        Chào mừng bạn đến với Fruitkha - nơi đắm chìm trong thế
                        giới tươi ngon và màu sắc của trái cây chất lượng cao!
                        Với cam kết mang đến trải nghiệm mua sắm trái cây trực
                        tuyến hoàn hảo, Fruitkha tự hào về việc cung cấp những
                        loại trái cây tươi ngon nhất từ khắp mọi nơi trên thế
                        giới đến tận tay bạn.
                      </>
                    ) : (
                      <>
                        Welcome to Fruitkha - a place to immerse yourself in the
                        fresh and colorful world of high quality fruit! With a
                        commitment to providing the perfect online fruit
                        shopping experience, Fruitkha prides itself on
                        delivering the freshest fruits from around the world
                        right to you.{" "}
                      </>
                    )}
                  </p>
                  <p
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? (
                      <>
                        Với giao diện trực tuyến đơn giản và thuận tiện,
                        Fruitkha mang lại trải nghiệm mua sắm trực tuyến dễ dàng
                        và nhanh chóng. Hãy để chúng tôi làm cho bữa ăn của bạn
                        trở nên thú vị hơn với những trái cây tuyệt vời từ
                        Fruitkha - nơi gặp gỡ của hương vị và sức khỏe!
                      </>
                    ) : (
                      <>
                        With a simple and convenient online interface, Fruitkha
                        offers an easy and fast online shopping experience. Let
                        us make your meals more enjoyable with amazing fruits
                        from Fruitkha - where taste and health meet!
                      </>
                    )}
                  </p>
                  <Link to="/about" className="boxed-btn mt-4">
                    {language === "VN" ? <>biết nhiều hơn</> : <>know more</>}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="shop-banner">
          <div className="container">
            <h3>
              {language === "VN" ? (
                <>Khuyến mại tháng 12 đã bắt đầu!</>
              ) : (
                <>December sale is on!</>
              )}
              <br />
              {language === "VN" ? (
                <>
                  với <span className="orange-text">Chiết khấu lớn...</span>
                </>
              ) : (
                <>
                  {" "}
                  with big <span className="orange-text">Discount...</span>
                </>
              )}
            </h3>
            <div className="sale-percent">
              <span>
                {language === "VN" ? <>Doanh thu! </> : <>Sale!</>} <br />
                {language === "VN" ? <>Lên tới</> : <>Upto</>}
              </span>
              50% <span>{language === "VN" ? <></> : <>off</>}</span>
            </div>
            <Link to="/product" className="cart-btn btn-lg">
              {language === "VN" ? <>Mua ngay</> : <>Shop Now</>}
            </Link>
          </div>
        </section>

        <div
          className="latest-news pt-150 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="section-title">
                  {language === "VN" ? (
                    <>
                      {" "}
                      <h3>
                        <span className="orange-text">Tin tức</span>{" "}
                        <span
                          style={{
                            marginLeft: "8px",
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          của chúng tôi
                        </span>
                      </h3>
                    </>
                  ) : (
                    <>
                      {" "}
                      <h3>
                        <span className="orange-text">Our</span>{" "}
                        <span
                          style={{
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          News
                        </span>
                      </h3>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              {loadingSomeNews === true ? (
                <>
                  {someNews && someNews.length > 0 ? (
                    someNews.map((item, index) => {
                      return (
                        <>
                          <div className="col-lg-4 col-md-6">
                            <div className="single-latest-news">
                              <Link to={`/news/${item.id}`}>
                                <div className="news-bg-1">
                                  <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}/images/news/${item.image}`}
                                    alt=""
                                  />
                                </div>
                              </Link>
                              <div className="news-text-box">
                                <h3>
                                  <Link
                                    to={`/news/${item.id}`}
                                    style={{
                                      color:
                                        theme === "SUN" ? "#051922" : "white",
                                    }}
                                  >
                                    {item.title}
                                  </Link>
                                </h3>
                                <p className="blog-meta">
                                  <span
                                    className="author"
                                    style={{
                                      color:
                                        theme === "SUN" ? "#051922" : "white",
                                    }}
                                  >
                                    <i className="fas fa-user"></i>{" "}
                                    {item.author}
                                  </span>
                                  <span
                                    className="date"
                                    style={{
                                      color:
                                        theme === "SUN" ? "#051922" : "white",
                                    }}
                                  >
                                    <i className="fas fa-calendar"></i>{" "}
                                    {item.created_at}
                                  </span>
                                </p>
                                <p
                                  className="excerpt"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  {item.content}
                                </p>
                                <Link
                                  to={`/news/${item.id}`}
                                  className="read-more-btn"
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  {language === "VN" ? (
                                    <>đọc thêm</>
                                  ) : (
                                    <>read more</>
                                  )}{" "}
                                  <i className="fas fa-angle-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <span
                      style={{
                        color: theme === "SUN" ? "#051922" : "white",
                      }}
                    >
                      {language === "VN" ? (
                        <>Không tìm thấy tin tức nào</>
                      ) : (
                        <>No news found</>
                      )}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <SkeletonNews />
                </>
              )}
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <Link to="/news" className="boxed-btn">
                  {language === "VN" ? <>Thêm tin tức</> : <>More News</>}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <LogoCarouselSection />

        <Footer />
      </div>
    </>
  );
};

export default Home;
