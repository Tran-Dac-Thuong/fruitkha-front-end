import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
const NotFound = () => {
  const language = useSelector((state) => state.language.language);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {language === "VN" ? `Không tìm thấy trang` : `Not found`}
        </title>
      </Helmet>
      <Navbar />
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
                    <>404 - Không tìm thấy trang</>
                  ) : (
                    <>404 - Not Found</>
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="full-height-section error-section">
        <div className="full-height-tablecell" style={{ padding: "200px 0px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="error-text">
                  <i className="far fa-sad-cry"></i>
                  <h1>
                    {language === "VN" ? (
                      <>Ối! Không tìm thấy trang.</>
                    ) : (
                      <>Oops! Not Found.</>
                    )}
                  </h1>
                  <p>
                    {language === "VN" ? (
                      <>Trang bạn yêu cầu không được tìm thấy.</>
                    ) : (
                      <>The page you requested for is not found.</>
                    )}
                  </p>
                  <Link to="/" className="boxed-btn">
                    {language === "VN" ? (
                      <>Quay lại trang chủ</>
                    ) : (
                      <>Back to Home</>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="logo-carousel-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="logo-carousel-inner">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
