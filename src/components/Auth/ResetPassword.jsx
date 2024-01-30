import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import "./ResetPassword.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [validate, setValidate] = useState("");

  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);

  const { id, token } = useParams();

  const HandleValidate = () => {
    let msg = {};

    if (isEmpty(password)) {
      msg.password = "Password is required!";
      msg.passwordVn = "Mật khẩu là bắt buộc!";
    } else if (password.length < 8 || password.length > 12) {
      msg.password = "Password must have 8-12 characters";
      msg.passwordVn = "Mật khẩu phải có từ 8 đến 12 ký tự";
    }
    if (isEmpty(cpassword)) {
      msg.cpassword = "Please confirm your password!";
      msg.cpasswordVn = "Vui lòng xác nhận mật khẩu của bạn!";
    } else if (cpassword !== password) {
      msg.cpassword = "Password doesn't match!";
      msg.cpasswordVn = "Mật khẩu không khớp!";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleResetPassword = async () => {
    let isValid = HandleValidate();

    if (!isValid) {
      return;
    }
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/reset-password/${id}/${token}`,
      {
        password,
      }
    );
    if (!response) {
      toast.error(
        language === "VN"
          ? "Có gì đó không đúng. Vui lòng thử lại"
          : "Something wrong. Please try again"
      );
    }
    if (response && response.data.message === "Reset success") {
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          language === "VN"
            ? "Mật khẩu mới của bạn đã được lưu."
            : "Your new password has been saved.",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          window.location.reload();
        }
      });
    }
  };

  const HandleEnter = async (e) => {
    if (e.key === "Enter") await HandleResetPassword();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? "" : "Reset password"}</title>
      </Helmet>
      <div className="container-login contain_reset">
        <div className="row justify-content-center">
          <div
            className="col-xl-6 col-lg-12 col-md-9"
            style={{ marginTop: "40px" }}
          >
            <div className="card shadow-sm my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="login-form reset_form"
                      style={{ padding: "45px" }}
                    >
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4 reset_title">
                          {language === "VN" ? (
                            <>Đặt lại mật khẩu</>
                          ) : (
                            <>Reset password</>
                          )}
                        </h1>
                      </div>
                      <form className="user">
                        <div className="form-group reset_group">
                          <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            className="form-control reset_input"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder={
                              language === "VN"
                                ? "Nhập mật khẩu..."
                                : "Enter Password..."
                            }
                          />
                        </div>
                        <span className="text-danger msg">
                          {language === "VN"
                            ? validate.passwordVn
                            : validate.password}
                        </span>
                        <p />
                        <div className="form-group reset_group">
                          <input
                            type="password"
                            value={cpassword}
                            onChange={(event) =>
                              setCPassword(event.target.value)
                            }
                            className="form-control reset_input"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder={
                              language === "VN"
                                ? "Xác nhận mật khẩu..."
                                : "Confirm Password..."
                            }
                            onKeyDown={(e) => HandleEnter(e)}
                          />
                        </div>
                        <span className="text-danger msg">
                          {language === "VN"
                            ? validate.cpasswordVn
                            : validate.cpassword}
                        </span>
                        <p />
                        <div className="form-group">
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={HandleResetPassword}
                            className="btn btn-primary btn-block reset_btn"
                          >
                            {language === "VN" ? <>Cập nhật</> : <>Update</>}
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

export default ResetPassword;
