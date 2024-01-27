import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useGoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [validate, setValidate] = useState("");

  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    let cookie = new Cookies();
    let checkVerify = async () => {
      let verify = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/check-cookie`,
        {
          headers: {
            "access-token": cookie.get("token"),
          },
        }
      );
      if (verify.data.message === "Success") {
        if (verify.data.role === "CUSTOMER") {
          navigate("/");
          window.location.reload();
        } else {
          navigate("/admin/dashboard");
          window.location.reload();
        }
      } else {
        navigate("/login");
      }
    };
    checkVerify();
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let oauth_res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        await AddGoogleInfo(
          oauth_res.data.given_name,
          oauth_res.data.family_name,
          oauth_res.data.email,
          "Google account password",
          "GOOGLE",
          oauth_res.data.picture
        );

        await LoginWithGoogleAndFacebook(
          oauth_res.data.email,
          "Google account password"
        );
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const AddGoogleInfo = async (
    firstName,
    lastName,
    email,
    password,
    authProvider,
    avatar
  ) => {
    let register_res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/register-user`,
      {
        firstName,
        lastName,
        email,
        password,
        authProvider,
        avatar,
      }
    );
  };

  const LoginWithGoogleAndFacebook = async (email, password) => {
    let login_res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/login-user`,
      {
        email,
        password,
      }
    );
    if (login_res && login_res.data.errCode === 0) {
      let cookie = new Cookies();

      cookie.set("token", login_res.data.token, {
        path: "/",
      });
    }
  };

  const AddFacebookInfo = async (
    firstName,
    lastName,
    email,
    password,
    authProvider,
    avatar
  ) => {
    let register_res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/register-user`,
      {
        firstName,
        lastName,
        email,
        password,
        authProvider,
        avatar,
      }
    );
  };

  const HandleValidate = () => {
    let msg = {};

    if (isEmpty(email)) {
      msg.email = "Email is required!";
      msg.emailVn = "Email là bắt buộc!";
    } else if (!isEmail(email)) {
      msg.email = "Invalid email";
      msg.emailVn = "Email không hợp lệ";
    }
    if (isEmpty(password)) {
      msg.password = "Password is required!";
      msg.passwordVn = "Mật khẩu là bắt buộc!";
    } else if (password.length < 8 || password.length > 12) {
      msg.password = "Password must have 8-12 characters";
      msg.passwordVn = "Mật khẩu phải có từ 8 đến 12 ký tự";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleLogin = async () => {
    let isValid = HandleValidate();

    if (!isValid) {
      return;
    }

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/login-user`,
      {
        email,
        password,
      }
    );
    console.log("check res: ", response);
    if (response && response.data.errCode !== 0) {
      toast.error(
        language === "VN"
          ? "Email hoặc mật khẩu không hợp lệ"
          : response.data.message
      );
    } else {
      if (response.data.currentUser.role === "CUSTOMER") {
        let cookie = new Cookies();

        cookie.set("token", response.data.token, {
          path: "/",
        });
        navigate("/");
        window.location.reload();
      } else {
        let cookie = new Cookies();

        cookie.set("token", response.data.token, {
          path: "/",
        });
        navigate("/admin/dashboard");
        window.location.reload();
      }
    }
  };

  const BackToHome = () => {
    navigate("/");
    window.location.reload();
  };

  const HandleEnter = async (e) => {
    if (e.key === "Enter") await HandleLogin();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Đăng nhập` : `Login`}</title>
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
                          {language === "VN" ? <>Đăng nhập</> : <>Login</>}
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
                          />
                          <span className="text-danger msg">
                            {language === "VN"
                              ? validate.emailVn
                              : validate.email}
                          </span>
                        </div>
                        <div
                          className="form-group"
                          style={{ position: "relative" }}
                        >
                          <input
                            type={
                              showHidePassword === false ? "password" : "text"
                            }
                            className="form-control"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            onKeyDown={(e) => HandleEnter(e)}
                            id="exampleInputPassword"
                            placeholder={
                              language === "VN"
                                ? "Nhập mật khẩu..."
                                : "Password..."
                            }
                          />
                          {showHidePassword === false ? (
                            <FontAwesomeIcon
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                              }}
                              icon={icon({
                                name: "eye",
                              })}
                              onClick={() =>
                                setShowHidePassword(!showHidePassword)
                              }
                            />
                          ) : (
                            <FontAwesomeIcon
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                              }}
                              icon={icon({
                                name: "eye-slash",
                              })}
                              onClick={() =>
                                setShowHidePassword(!showHidePassword)
                              }
                            />
                          )}

                          <span
                            className="text-danger msg"
                            style={{ userSelect: "none" }}
                          >
                            {language === "VN"
                              ? validate.passwordVn
                              : validate.password}
                          </span>
                        </div>
                        <div className="form-group">
                          <div
                            className="custom-control custom-checkbox small"
                            style={{ lineHeight: "1.5rem" }}
                          >
                            <Link
                              to="/forgot-password"
                              style={{ fontSize: "12px", marginLeft: "-20px" }}
                            >
                              {language === "VN" ? (
                                <>Quên mật khẩu?</>
                              ) : (
                                <>Forgot password?</>
                              )}
                            </Link>
                          </div>
                        </div>
                        <div className="form-group">
                          <div
                            onClick={HandleLogin}
                            className="btn btn-primary btn-block"
                          >
                            {language === "VN" ? <>Đăng nhập</> : <>Login</>}
                          </div>
                        </div>
                        <hr />
                        <a
                          href="#"
                          className="btn btn-google btn-block"
                          style={{
                            color: "#434334",
                            backgroundColor: "#fff",
                            borderColor: "#bdbdbd",
                            boxShadow:
                              "0 .125rem .25rem 0 rgba(58,59,69,.2)!important",
                            borderRadius: "0.25rem",
                            marginBottom: "5px",
                          }}
                          onClick={() => login()}
                        >
                          <i className="fab fa-google fa-fw"></i>{" "}
                          {language === "VN" ? (
                            <>Đăng nhập với Google</>
                          ) : (
                            <>Login with Google</>
                          )}
                        </a>

                        <LoginSocialFacebook
                          appId="1194828094562604"
                          scope="public_profile email"
                          onResolve={async (response) => {
                            await AddFacebookInfo(
                              response.data.first_name,
                              response.data.last_name,
                              response.data.email,
                              "Facebook account password",
                              "FACEBOOK",
                              response.data.picture.data.url
                            );

                            await LoginWithGoogleAndFacebook(
                              response.data.email,
                              "Facebook account password"
                            );
                            navigate("/");
                            window.location.reload();
                            console.log(response);
                          }}
                          onReject={(error) => {
                            console.log(error);
                          }}
                        >
                          <a
                            href="#"
                            className="btn btn-facebook btn-block"
                            style={{
                              color: "#fff",
                              backgroundColor: "#3b5998",
                            }}
                          >
                            <i className="fab fa-facebook-f fa-fw"></i>{" "}
                            {language === "VN" ? (
                              <>Đăng nhập với Facebook</>
                            ) : (
                              <>Login with Facebook</>
                            )}
                          </a>
                        </LoginSocialFacebook>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="font-weight-bold small" to="/register">
                          {language === "VN" ? (
                            <>Tạo một tài khoản!</>
                          ) : (
                            <>Create an Account!</>
                          )}
                        </Link>
                      </div>
                      <div className="text-center"></div>
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

export default Login;
