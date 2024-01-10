import React, { useEffect, useState, useTransition } from "react";
import Footer from "./footer/Footer";
import CheckCookie from "./Auth/CheckCookie";
import "./Contact.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Contact = (props) => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [validate, setValidate] = useState("");
  const [isPending, startTransition] = useTransition();

  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    props.setProgress(100);
  }, []);

  const HandleValidate = () => {
    let msg = {};

    let checkValidEmail = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{3}$/;

    if (contactName.trim() === "") {
      msg.name = "Name is required!";
      msg.nameVN = "Tên là bắt buộc!";
    }
    if (contactEmail.trim() === "") {
      msg.email = "Email is required!";
      msg.emailVN = "Email là bắt buộc!";
    } else if (!checkValidEmail.test(contactEmail)) {
      msg.email = "Invalid email!";
      msg.emailVN = "Email không hợp lệ!";
    }
    if (contactPhone.trim() === "") {
      msg.phone = "Phone number is required!";
      msg.phoneVN = "Số điện thoại là bắt buộc!";
    } else if (!/^[0-9]*$/.test(contactPhone)) {
      msg.phone = "Phone number must be numeric!";
      msg.phoneVN = "Số điện thoại phải là số!";
    }
    if (contactSubject.trim() === "") {
      msg.subject = "Subject is required!";
      msg.subjectVN = "Chủ đề là bắt buộc!";
    }
    if (contactMessage.trim() === "") {
      msg.message = "Message is required!";
      msg.messageVN = "Tin nhắn là bắt buộc!";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleSubmitContact = async () => {
    startTransition(async () => {
      let isValid = HandleValidate();

      if (!isValid) {
        return;
      }

      let timestamp = Date.now();

      let date = new Date(timestamp);

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      let contactCreateAt = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

      let response = await axios.post(
        "http://localhost:3434/api/send-contact",
        {
          contactName,
          contactEmail,
          contactSubject,
          contactMessage,
          contactPhone,
          contactCreateAt,
        }
      );
      if (response && response.data.message === "Submit success") {
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
        setContactPhone("");

        toast.success(
          language === "VN"
            ? "Bạn đã gửi câu hỏi thành công. Chúng tôi sẽ liên hệ với bạn qua mail ngay khi có thể"
            : "You have successfully submitted your question. We will contact you via email as soon as possible"
        );
      } else {
        toast.error(language === "VN" ? "Gửi không thành công" : "Submit fail");
      }
    });
  };

  const HandleEnter = async (e) => {
    if (e.key === "Enter") await HandleSubmitContact();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Liên hệ` : `Contact`}</title>
      </Helmet>
      <CheckCookie url={"/contact"} />
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>
                  {language === "VN" ? (
                    <>Nhận hỗ trợ 24/7</>
                  ) : (
                    <>Get 24/7 Support</>
                  )}
                </p>
                <h1>
                  {language === "VN" ? <>Liên hệ chúng tôi</> : <>Contact us</>}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="contact-from-section pt-150 pb-150"
        style={{
          backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                <h2
                  style={{
                    color: theme === "SUN" ? "#051922" : "white",
                  }}
                >
                  {language === "VN" ? (
                    <>Bạn có câu hỏi nào không?</>
                  ) : (
                    <>Have you any question?</>
                  )}
                </h2>
              </div>
              <div id="form_status"></div>
              <div className="contact-form">
                <form id="fruitkha-contact">
                  <p>
                    <input
                      type="text"
                      placeholder={language === "VN" ? "Tên" : "Name"}
                      name="name"
                      id="name"
                      value={contactName}
                      onChange={(event) => setContactName(event.target.value)}
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      value={contactEmail}
                      onChange={(event) => setContactEmail(event.target.value)}
                    />
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <span className="text-danger msg">
                      {language === "VN" ? validate.nameVN : validate.name}
                    </span>
                    <span className="text-danger msg">
                      {language === "VN" ? validate.emailVN : validate.email}
                    </span>
                  </p>
                  <p>
                    <input
                      type="tel"
                      placeholder={
                        language === "VN" ? "Số điện thoại" : "Phone number"
                      }
                      name="phone"
                      id="phone"
                      value={contactPhone}
                      onChange={(event) => setContactPhone(event.target.value)}
                    />

                    <input
                      type="text"
                      placeholder={language === "VN" ? "Chủ đề" : "Subject"}
                      name="subject"
                      id="subject"
                      value={contactSubject}
                      onChange={(event) =>
                        setContactSubject(event.target.value)
                      }
                    />
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <span className="text-danger msg">
                      {language === "VN" ? validate.phoneVN : validate.phone}
                    </span>
                    <span className="text-danger msg">
                      {language === "VN"
                        ? validate.subjectVN
                        : validate.subject}
                    </span>
                  </p>
                  <p>
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="10"
                      placeholder={language === "VN" ? "Tin nhắn" : "Message"}
                      value={contactMessage}
                      onChange={(event) =>
                        setContactMessage(event.target.value)
                      }
                      onKeyDown={(e) => HandleEnter(e)}
                    ></textarea>
                    <span className="text-danger msg">
                      {language === "VN"
                        ? validate.messageVN
                        : validate.message}
                    </span>
                  </p>
                  <p>
                    {isPending ? (
                      <input
                        type="button"
                        value={language === "VN" ? "Gửi" : "Submit"}
                        style={{
                          backgroundColor: "#ffd699",
                          color: "#999999",
                          cursor: "not-allowed",
                        }}
                      />
                    ) : (
                      <input
                        type="button"
                        onClick={HandleSubmitContact}
                        value={language === "VN" ? "Gửi" : "Submit"}
                      />
                    )}
                  </p>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="contact-form-wrap"
                style={{
                  backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
                }}
              >
                <div className="contact-form-box">
                  <h4
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    <i className="fas fa-map"></i>{" "}
                    {language === "VN" ? (
                      <>Địa chỉ cửa hàng</>
                    ) : (
                      <>Shop Address</>
                    )}
                  </h4>
                  <p
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? (
                      <>quận Thủ Đức</>
                    ) : (
                      <>Thu Duc district</>
                    )}
                    , <br />{" "}
                    {language === "VN" ? (
                      <>Thành phố Hồ Chí Minh.</>
                    ) : (
                      <>Ho Chi Minh City.</>
                    )}{" "}
                    <br />
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    <i className="far fa-clock"></i>
                    {language === "VN" ? <>Giờ cửa hàng</> : <>Shop Hours</>}
                  </h4>
                  <p
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? (
                      <>THỨ HAI - THỨ SÁU: 8 đến 9 giờ tối</>
                    ) : (
                      <>MON - FRIDAY: 8 to 9 PM</>
                    )}{" "}
                    <br />
                    {language === "VN" ? (
                      <>Thứ Bảy - Chủ Nhật: 10 đến 8 giờ tối</>
                    ) : (
                      <>SAT - SUN: 10 to 8 PM</>
                    )}{" "}
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    <i className="fas fa-address-book"></i>
                    {language === "VN" ? <>Liên hệ</> : <>Contact</>}
                  </h4>
                  <p
                    style={{
                      color: theme === "SUN" ? "#051922" : "white",
                    }}
                  >
                    {language === "VN" ? <>Điện thoại</> : <>Phone</>}: +84
                    923497148 <br />{" "}
                    <span style={{ whiteSpace: "nowrap" }}>
                      Email: hoangdeptraibodoiqua4321@gmail.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="find-location blue-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>
                {" "}
                <i className="fas fa-map-marker-alt"></i>{" "}
                {language === "VN" ? (
                  <>Tìm vị trí của chúng tôi</>
                ) : (
                  <>Find Our Location</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="embed-responsive embed-responsive-21by9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125404.3038071453!2d106.70744842828333!3d10.820150574028515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d85e042bf04b%3A0xbb26baec1664394d!2zVGjhu6cgxJDhu6ljLCBIbyBDaGkgTWluaCBDaXR5LCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1703260528844!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer />
    </>
  );
};
export default Contact;
