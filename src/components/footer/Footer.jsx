import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState("");
  const [validateVN, setValidateVN] = useState("");
  const [loading, setLoading] = useState(false);

  const language = useSelector((state) => state.language.language);

  const HandleValidate = () => {
    let msg = {};

    if (isEmpty(email)) {
      msg.email = "Email is required!";
      msg.emailVN = "Email là bắt buộc!";
    } else if (!isEmail(email)) {
      msg.email = "Invalid email";
      msg.emailVN = "Email không hợp lệ";
    }

    setValidate(msg.email);
    setValidateVN(msg.emailVN);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleSubscribe = async () => {
    let isValid = HandleValidate();

    if (!isValid) {
      return;
    }
    setLoading(true);

    let res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/send-email-subscribe`,
      {
        email,
      }
    );
    if (!res) {
      toast.error(
        language === "VN"
          ? "Có gì đó không đúng. Vui lòng thử lại"
          : "Something wrong. Please try again"
      );
    }
    if (res && res.data.message === "Subscribe success") {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setEmail("");
      toast.success(
        language === "VN" ? "Đăng ký thành công" : "Subscribe success"
      );
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      toast.error(language === "VN" ? "Đăng ký thất bại" : "Subscribe fail");
    }
  };

  return (
    <>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-box about-widget">
                <h2 className="widget-title">
                  {language === "VN" ? <>Về chúng tôi</> : <>About us</>}
                </h2>
                <p>
                  {language === "VN" ? (
                    <>
                      Với giao diện trực tuyến đơn giản và thuận tiện, Fruitkha
                      mang lại trải nghiệm mua sắm trực tuyến dễ dàng và nhanh
                      chóng. Hãy để chúng tôi làm cho bữa ăn của bạn trở nên thú
                      vị hơn với những trái cây tuyệt vời từ Fruitkha - nơi gặp
                      gỡ của hương vị và sức khỏe!
                    </>
                  ) : (
                    <>
                      With a simple and convenient online interface, Fruitkha
                      offers an easy and fast online shopping experience. Let us
                      make your meals more enjoyable with amazing fruits from
                      Fruitkha - where taste and health meet!
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box get-in-touch">
                <h2 className="widget-title">
                  {language === "VN" ? <>Liên lạc</> : <>Get in Touch</>}
                </h2>
                <ul>
                  <li>
                    {language === "VN" ? (
                      <>Quận Thủ Đức, Thành phố Hồ Chí Minh.</>
                    ) : (
                      <>Thu Duc district, Ho Chi Minh City.</>
                    )}
                  </li>
                  <li>hoangdeptraibodoiqua4321@gmail.com</li>
                  <li>+84 923497148</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box pages">
                <h2 className="widget-title">
                  {language === "VN" ? <>Trang</> : <>Pages</>}
                </h2>
                <ul>
                  <li>
                    <NavLink to="/">
                      {language === "VN" ? <>Trang chủ</> : <>Home</>}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">
                      {language === "VN" ? <>Về chúng tôi</> : <>About</>}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/product">
                      {language === "VN" ? <>Cửa hàng</> : <>Shop</>}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/news">
                      {language === "VN" ? <>Tin tức</> : <>News</>}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">
                      {language === "VN" ? <>Liên hệ</> : <>Contact</>}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box subscribe">
                <h2 className="widget-title">
                  {language === "VN" ? <>Đặt mua</> : <>Subscribe</>}
                </h2>
                <p>
                  {language === "VN" ? (
                    <>
                      Đăng ký vào danh sách gửi thư của chúng tôi để nhận được
                      những cập nhật mới nhất.
                    </>
                  ) : (
                    <>
                      Subscribe to our mailing list to get the latest updates.
                    </>
                  )}
                </p>
                <form>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                  />

                  <button
                    type="button"
                    onClick={HandleSubscribe}
                    disabled={loading}
                    style={{ cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>

                  <span className="text-danger msg">
                    {language === "VN" ? validateVN : validate}
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <p>
                {language === "VN" ? <>Bản quyền</> : <>Copyrights</>} &copy;
                2023 - <span className="footer_author">Tran Dac Thuong</span>,{" "}
                {language === "VN" ? (
                  <>Đã đăng ký bản quyền</>
                ) : (
                  <>All Rights Reserved.</>
                )}
                <br />
              </p>
            </div>
            <div className="col-lg-6 text-right col-md-12">
              <div className="social-icons">
                <ul>
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
                  <li>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://dribbble.com/" target="_blank">
                      <i className="fab fa-dribbble"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
