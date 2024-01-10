import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState("");

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
        if (verify.data.role === "CUSTOMER") {
          navigate("/");
          window.location.reload();
        } else {
          navigate("/admin/dashboard");
          window.location.reload();
        }
      } else {
        navigate("/forgot-password");
      }
    };
    checkVerify();
  }, []);

  const HandleValidate = () => {
    let msg = {};

    if (isEmpty(email)) {
      msg.email = "Email is required!";
      msg.emailVn = "Email là bắt buộc!";
    } else if (!isEmail(email)) {
      msg.email = "Invalid email";
      msg.emailVn = "Email không hợp lệ";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleSendMailToResetPassword = async () => {
    let isValid = HandleValidate();

    if (!isValid) {
      return;
    }

    let response = await axios.post(
      "http://localhost:3434/api/forgot-password",
      {
        email,
      }
    );
    console.log("check res: ", response);
    if (response && response.data.errCode !== 0) {
      toast.error(response.data.message);
    } else {
      navigate("/login");
      toast.success(
        language === "VN"
          ? "Hướng dẫn thêm đã được gửi đến địa chỉ email của bạn."
          : "Further instruction have been sent to your e-mail address."
      );
    }
  };

  const BackToHome = () => {
    navigate("/");
    window.location.reload();
  };

  const HandleEnter = async (e) => {
    if (e.key === "Enter") await HandleSendMailToResetPassword();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Quên mật khẩu` : `Forgot password`}</title>
      </Helmet>
      <div className="container-login">
        <div className="row justify-content-center">
          <div
            className="col-xl-6 col-lg-12 col-md-9"
            style={{ marginTop: "40px" }}
          >
            <div className="card shadow-sm my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="login-form" style={{ padding: "50px" }}>
                      <FontAwesomeIcon
                        onClick={BackToHome}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          left: "35px",
                          top: "18px",
                        }}
                        icon={icon({ name: "arrow-left" })}
                      />

                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          {language === "VN" ? (
                            <>Quên mật khẩu</>
                          ) : (
                            <>Forgot password</>
                          )}
                        </h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder={
                              language === "VN"
                                ? "Nhập địa chỉ email..."
                                : "Enter Email Address..."
                            }
                            onKeyDown={(e) => HandleEnter(e)}
                          />
                          <span className="text-danger msg">
                            {language === "VN"
                              ? validate.emailVn
                              : validate.email}
                          </span>
                        </div>

                        <div className="form-group">
                          <div
                            onClick={HandleSendMailToResetPassword}
                            className="btn btn-primary btn-block"
                          >
                            {language === "VN" ? (
                              <>Gửi email</>
                            ) : (
                              <>Send email</>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
