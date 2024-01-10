import React, { useEffect } from "react";
import Footer from "./footer/Footer";
import "./About.scss";
import CheckCookie from "./Auth/CheckCookie";
import LogoCarouselSection from "./section/LogoCarouselSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const About = (props) => {
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Về chúng tôi` : `About`}</title>
      </Helmet>
      <CheckCookie url={"/about"} />
      <div className="all_about_page">
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>
                    {language === "VN" ? (
                      <>Chúng tôi bán trái cây tươi</>
                    ) : (
                      <>We sale fresh fruits</>
                    )}
                  </p>
                  <h1>
                    {language === "VN" ? <>Về chúng tôi</> : <>About Us</>}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="feature-bg pt-150 pb-150"
          style={{
            margin: 0,
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="featured-text">
                  <h2 className="pb-3">
                    {language === "VN" ? (
                      <span
                        style={{ color: theme === "SUN" ? "#051922" : "white" }}
                      >
                        Tại sao là
                      </span>
                    ) : (
                      <span
                        style={{ color: theme === "SUN" ? "#051922" : "white" }}
                      >
                        Why
                      </span>
                    )}{" "}
                    <span className="orange-text">Fruitkha</span>
                  </h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-shipping-fast"></i>
                        </div>
                        <div className="content">
                          <h3
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>Giao hàng tận nhà</>
                            ) : (
                              <>Home Delivery</>
                            )}
                          </h3>
                          <p
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>
                                Dịch vụ giao hàng tận nhà của chúng tôi không
                                chỉ đảm bảo về tính nhanh chóng mà còn chú trọng
                                đến việc bảo quản chất lượng của sản phẩm.{" "}
                              </>
                            ) : (
                              <>
                                Our home delivery service not only ensures speed
                                but also focuses on preserving product quality.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-money-bill-alt"></i>
                        </div>
                        <div className="content">
                          <h3
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>Giá tốt nhất</>
                            ) : (
                              <>Best Price</>
                            )}
                          </h3>
                          <p
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>
                                Chúng tôi liên tục cập nhật và đưa ra các chương
                                trình khuyến mãi đặc biệt, giúp bạn tiết kiệm mà
                                vẫn thưởng thức những loại trái cây tươi ngon và
                                dinh dưỡng nhất.
                              </>
                            ) : (
                              <>
                                We constantly update and offer special
                                promotions, helping you save while still
                                enjoying the freshest and most nutritious
                                fruits.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-briefcase"></i>
                        </div>
                        <div className="content">
                          <h3
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>Hộp tùy chỉnh</>
                            ) : (
                              <>Custom Box</>
                            )}
                          </h3>
                          <p
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>
                                Chúng tôi cung cấp một trải nghiệm tùy chỉnh
                                không giới hạn, nơi bạn có thể chọn lựa từ những
                                trái cây quen thuộc đến những loại độc đáo và
                                hiếm có.
                              </>
                            ) : (
                              <>
                                We offer an unlimited customization experience
                                where you can choose from familiar fruits to
                                unique and rare ones.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-sync-alt"></i>
                        </div>
                        <div className="content">
                          <h3
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>Hoàn tiền nhanh chóng</>
                            ) : (
                              <>Quick Refund</>
                            )}
                          </h3>
                          <p
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            {language === "VN" ? (
                              <>
                                Với chính sách hoàn tiền nhanh chóng, chúng tôi
                                đặt sự thoải mái và tin tưởng của khách hàng lên
                                hàng đầu.
                              </>
                            ) : (
                              <>
                                With our prompt refund policy, we put customer
                                comfort and trust first.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
          className="pt-150"
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
                        <span className="orange-text">Đội</span>{" "}
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
                        <span
                          style={{
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          Our
                        </span>{" "}
                        <span className="orange-text">Team</span>
                      </h3>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-team-item">
                  <div className="team-bg team-bg-1"></div>
                  <h4 style={{ color: theme === "SUN" ? "#051922" : "white" }}>
                    Jimmy Doe{" "}
                    <span
                      style={{ color: theme === "SUN" ? "#051922" : "white" }}
                    >
                      {language === "VN" ? <>Nông dân</> : <>Farmer</>}
                    </span>
                  </h4>
                  <ul className="social-link-team">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-team-item">
                  <div className="team-bg team-bg-2"></div>
                  <h4 style={{ color: theme === "SUN" ? "#051922" : "white" }}>
                    Marry Doe{" "}
                    <span
                      style={{ color: theme === "SUN" ? "#051922" : "white" }}
                    >
                      {language === "VN" ? <>Nông dân</> : <>Farmer</>}
                    </span>
                  </h4>
                  <ul className="social-link-team">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                <div className="single-team-item">
                  <div className="team-bg team-bg-3"></div>
                  <h4 style={{ color: theme === "SUN" ? "#051922" : "white" }}>
                    Simon Joe{" "}
                    <span
                      style={{ color: theme === "SUN" ? "#051922" : "white" }}
                    >
                      {language === "VN" ? <>Nông dân</> : <>Farmer</>}
                    </span>
                  </h4>
                  <ul className="social-link-team">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="testimonail-section pt-80 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "#f5f5f5" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
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
                            {" "}
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

        <LogoCarouselSection />

        <Footer />
      </div>
    </>
  );
};

export default About;
