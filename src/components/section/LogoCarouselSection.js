import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
const LogoCarouselSection = (props) => {
  const theme = useSelector((state) => state.theme.theme);

  const settingsLogo = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
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
  return (
    <>
      <div
        className="logo-carousel-section"
        style={{ backgroundColor: theme === "SUN" ? "#f5f5f5" : "#1a1a1a" }}
      >
        <div className="container">
          <div className="">
            <div className="">
              <div className="">
                <Slider {...settingsLogo}>
                  <div className="single-logo-item">
                    <img src="assets/img/company-logos/1.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/company-logos/2.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/company-logos/3.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/company-logos/4.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/company-logos/5.png" alt="" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoCarouselSection;
