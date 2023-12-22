import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
const Forbien = () => {
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    let cookie = new Cookies();
    let checkVerify = async () => {
      let verify = await axios.get("http://localhost:3434/api/check-cookie", {
        headers: {
          "access-token": cookie.get("token"),
        },
      });
      if (verify.data.message === "Success") {
        setRole(verify.data.role);
      }
    };
    checkVerify();
  }, []);

  const BackToDashboard = () => {
    navigate("/admin/dashboard");
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Trang cấm` : `Forbien`}</title>
      </Helmet>

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
                    <>403 - Trang cấm</>
                  ) : (
                    <>403 - Forbidden</>
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
                      <>Ối! Trang Cấm.</>
                    ) : (
                      <>Oops! Forbidden.</>
                    )}
                  </h1>
                  <p>
                    {language === "VN" ? (
                      <>Bạn không có quyền truy cập trang này.</>
                    ) : (
                      <>You do not have permission to access this page.</>
                    )}
                  </p>
                  {role === "CUSTOMER" ? (
                    <Link to="/" className="boxed-btn">
                      {language === "VN" ? (
                        <>Quay lại trang chủ</>
                      ) : (
                        <>Back to Home</>
                      )}
                    </Link>
                  ) : (
                    <a href="#" onClick={BackToDashboard} className="boxed-btn">
                      {language === "VN" ? (
                        <>Quay lại trang tổng quan</>
                      ) : (
                        <>Back to Dashboard</>
                      )}
                    </a>
                  )}
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
    </>
  );
};

export default Forbien;
