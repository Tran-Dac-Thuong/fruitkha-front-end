import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Cookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLanguage,
  changeTheme,
  fetchCartItems,
  fetchCurrentUser,
} from "../../redux/actions/actions";

const Navbar = () => {
  const [showBar, setShowBar] = useState(false);
  const [logged, setLogged] = useState(false);

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [status, setStatus] = useState("");
  const [currentGoogleUserAvatar, setCurrentGoogleUserAvatar] = useState("");
  const [currentFacebookUserAvatar, setCurrentFacebookUserAvatar] =
    useState("");
  const [currentUserAuthProvider, setCurrentUserAuthProvider] = useState(false);
  const [provider, setProvider] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const listCarts = useSelector((state) => state.cart.listCarts);
  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    let cookie = new Cookies();
    let checkVerify = async () => {
      let verify = await axios.get("http://localhost:3434/api/check-cookie", {
        headers: {
          "access-token": cookie.get("token"),
        },
      });
      if (verify.data.message === "Success") {
        setStatus("Read");
        if (verify.data.auth_provider === "GOOGLE") {
          setLogged(true);
          setCurrentUserAuthProvider(true);
          setProvider(true);
          setCurrentGoogleUserAvatar(verify.data.avatar);
          dispatch(fetchCurrentUser(verify.data.id));
        } else if (verify.data.auth_provider === "FACEBOOK") {
          setLogged(true);
          setCurrentUserAuthProvider(true);
          setCurrentFacebookUserAvatar(verify.data.avatar);
          dispatch(fetchCurrentUser(verify.data.id));
        } else {
          setLogged(true);
          setCurrentUserAuthProvider(false);
          setCurrentUsername(verify.data.username);
          setCurrentAvatar(verify.data.avatar);
          dispatch(fetchCurrentUser(verify.data.id ? verify.data.id : 0));
        }
      } else {
        setLogged(false);
      }
    };
    checkVerify();
  }, []);

  useEffect(() => {
    setStatus("OK");

    dispatch(fetchCartItems(currentUser.id));
  }, [status]);

  let HandleShowBar = () => {
    setShowBar(true);
  };
  let HandleHideBar = () => {
    setShowBar(false);
  };

  const HandleLogout = async () => {
    let logout = await axios.get("http://localhost:3434/api/logout");
    if (logout.data.errCode === 0) {
      let cookie = new Cookies();
      cookie.remove("token");
      navigate("/login");
      toast.success(
        language === "VN" ? "Đăng xuất thành công" : "Logout success"
      );
    }
  };

  const HandleChangeLanguage = (language) => {
    dispatch(changeLanguage(language));
  };

  const HandleChangeTheme = (theme) => {
    dispatch(changeTheme(theme));
  };

  return (
    <>
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                <div className="site-logo">
                  <Link to="/">
                    <img src="assets/img/logo.png" alt="" />
                  </Link>
                </div>

                <nav
                  className={`${
                    showBar === true ? "main-menu-mobile" : "main-menu"
                  }`}
                >
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        onClick={() => HandleHideBar()}
                        className="x_icon"
                        icon={icon({ name: "x" })}
                      />
                    </li>

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
                      <NavLink to="/news">
                        {language === "VN" ? <>Tin tức</> : <>News</>}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">
                        {language === "VN" ? <>Liên hệ</> : <>Contact</>}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/product">
                        {language === "VN" ? <>Cửa hàng</> : <>Shop</>}
                      </NavLink>
                    </li>
                    {logged === true ? (
                      <>
                        {currentUserAuthProvider === true ? (
                          <>
                            {provider === true ? (
                              <li>
                                <a href="#">
                                  <img
                                    src={currentGoogleUserAvatar}
                                    style={{
                                      borderRadius: "50%",
                                      width: "45px",
                                    }}
                                  />
                                </a>
                                <ul
                                  className="sub-menu"
                                  style={{
                                    marginTop: "14px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  <li>
                                    <Link to="/order-history">
                                      {language === "VN" ? (
                                        <>Lịch sử đơn hàng</>
                                      ) : (
                                        <>Order History</>
                                      )}
                                    </Link>
                                  </li>
                                  <li>
                                    <a onClick={() => HandleLogout()}>
                                      {language === "VN" ? (
                                        <>Đăng xuất</>
                                      ) : (
                                        <>Logout</>
                                      )}
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            ) : (
                              <li>
                                <a href="#">
                                  <img
                                    src={currentFacebookUserAvatar}
                                    style={{
                                      borderRadius: "50%",
                                      width: "45px",
                                    }}
                                  />
                                </a>
                                <ul
                                  className="sub-menu"
                                  style={{
                                    marginTop: "14px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  <li>
                                    <Link to="/order-history">
                                      {language === "VN" ? (
                                        <>Lịch sử đơn hàng</>
                                      ) : (
                                        <>Order History</>
                                      )}
                                    </Link>
                                  </li>
                                  <li>
                                    <a onClick={() => HandleLogout()}>
                                      {language === "VN" ? (
                                        <>Đăng xuất</>
                                      ) : (
                                        <>Logout</>
                                      )}
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            )}
                          </>
                        ) : (
                          <li>
                            <a href="#" className="user_avatar">
                              {currentAvatar === null ||
                              currentAvatar === "undefined" ? (
                                <FontAwesomeIcon
                                  style={{ fontSize: "18px" }}
                                  icon={icon({ name: "user" })}
                                />
                              ) : (
                                <img
                                  src={`http://localhost:3434/images/users/${currentAvatar}`}
                                  width="45px"
                                  style={{ borderRadius: "50%" }}
                                />
                              )}

                              <span style={{ marginLeft: "8px" }}>
                                {currentUsername}
                              </span>
                            </a>
                            <ul className="sub-menu">
                              <li>
                                <Link to="/profile">
                                  {language === "VN" ? (
                                    <>Thông tin của tôi</>
                                  ) : (
                                    <>My Profile</>
                                  )}
                                </Link>
                              </li>
                              <li>
                                <Link to="/order-history">
                                  {language === "VN" ? (
                                    <>Lịch sử đơn hàng</>
                                  ) : (
                                    <>Order History</>
                                  )}
                                </Link>
                              </li>
                              <li>
                                <a onClick={() => HandleLogout()}>
                                  {language === "VN" ? (
                                    <>Đăng xuất</>
                                  ) : (
                                    <>Logout</>
                                  )}
                                </a>
                              </li>
                            </ul>
                          </li>
                        )}
                      </>
                    ) : (
                      <li>
                        <NavLink to="/login">
                          {language === "VN" ? <>Đăng nhập</> : <>Sign in</>}
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <a>
                        <FontAwesomeIcon
                          style={{ fontSize: "18px", marginRight: "5px" }}
                          icon={icon({ name: "globe" })}
                        />
                        {language === "VN" ? <>Tiếng Việt</> : <>English</>}
                      </a>
                      <ul className="sub-menu" style={{ width: "150px" }}>
                        <li>
                          <a
                            style={{ display: "flex" }}
                            onClick={() => HandleChangeLanguage("VN")}
                          >
                            <img
                              src="./assets/img/country-logo/vn.svg"
                              style={{
                                width: "35px",
                                height: "25px",
                                marginRight: "5px",
                              }}
                            />
                            Tiếng Việt
                          </a>
                        </li>
                        <hr />
                        <li>
                          <a onClick={() => HandleChangeLanguage("ENG")}>
                            <img
                              src="./assets/img/country-logo/eng.svg"
                              style={{
                                width: "35px",
                                height: "25px",
                                marginRight: "5px",
                              }}
                            />
                            English
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {theme === "SUN" ? (
                        <a>
                          <FontAwesomeIcon
                            style={{ fontSize: "18px" }}
                            icon={icon({ name: "sun" })}
                            onClick={() => HandleChangeTheme("MOON")}
                          />
                        </a>
                      ) : (
                        <a>
                          <FontAwesomeIcon
                            style={{ fontSize: "18px" }}
                            icon={icon({ name: "moon" })}
                            onClick={() => HandleChangeTheme("SUN")}
                          />
                        </a>
                      )}
                    </li>
                    {logged === true ? (
                      <li>
                        <div className="header-icons">
                          <NavLink to="/cart">
                            <i
                              className="fas fa-shopping-cart shopping-cart"
                              id="icon_cart"
                            ></i>
                            <span className="cart_count">
                              {listCarts.length}
                            </span>
                          </NavLink>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <div className="header-icons">
                          <NavLink to="/cart">
                            <i
                              className="fas fa-shopping-cart shopping-cart"
                              id="icon_cart"
                            ></i>
                          </NavLink>
                        </div>
                      </li>
                    )}
                  </ul>
                </nav>

                <FontAwesomeIcon
                  onClick={() => HandleShowBar()}
                  className="bars_icon"
                  icon={icon({ name: "bars" })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
