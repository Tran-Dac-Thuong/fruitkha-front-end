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
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top d-none d-lg-flex justify-content-between "
        style={{ padding: "15px 0", backgroundColor: "#051922" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src="assets/img/logo.png"
              style={{ minWidth: "150px" }}
              alt=""
            />
          </Link>

          <ul
            className="navbar-nav d-none d-lg-flex align-self-center nav_mobile"
            style={{ paddingLeft: "125px" }}
          >
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                {language === "VN" ? <>Trang chủ</> : <>Home</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                {language === "VN" ? <>Về chúng tôi</> : <>About</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/news" className="nav-link">
                {language === "VN" ? <>Tin tức</> : <>News</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                {language === "VN" ? <>Liên hệ</> : <>Contact</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className="nav-link">
                {language === "VN" ? <>Cửa hàng</> : <>Shop</>}
              </NavLink>
            </li>
            {logged === true ? (
              <>
                {currentUserAuthProvider === true ? (
                  <>
                    {provider === true ? (
                      <>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle logo_mobile"
                            href="#"
                            id="navbardrop"
                            data-bs-toggle="dropdown"
                          >
                            <img
                              src={currentGoogleUserAvatar}
                              style={{
                                borderRadius: "50%",
                                width: "30px",
                              }}
                            />
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <NavLink
                                to="/order-history"
                                className="dropdown-item"
                              >
                                {language === "VN" ? (
                                  <>Lịch sử đơn hàng</>
                                ) : (
                                  <>Order History</>
                                )}
                              </NavLink>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => HandleLogout()}
                                href="#"
                              >
                                {language === "VN" ? (
                                  <>Đăng xuất</>
                                ) : (
                                  <>Logout</>
                                )}
                              </a>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle logo_mobile"
                            href="#"
                            id="navbardrop"
                            data-bs-toggle="dropdown"
                          >
                            <img
                              src={currentFacebookUserAvatar}
                              style={{
                                borderRadius: "50%",
                                width: "30px",
                              }}
                            />
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <NavLink
                                to="/order-history"
                                className="dropdown-item"
                              >
                                {language === "VN" ? (
                                  <>Lịch sử đơn hàng</>
                                ) : (
                                  <>Order History</>
                                )}
                              </NavLink>
                            </li>
                            <a
                              className="dropdown-item"
                              onClick={() => HandleLogout()}
                              href="#"
                            >
                              {language === "VN" ? <>Đăng xuất</> : <>Logout</>}
                            </a>
                          </ul>
                        </li>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbardrop"
                        data-bs-toggle="dropdown"
                      >
                        {currentAvatar === null ||
                        currentAvatar === "undefined" ? (
                          <FontAwesomeIcon
                            style={{ fontSize: "18px" }}
                            icon={icon({ name: "user" })}
                          />
                        ) : (
                          <img
                            src={`http://localhost:3434/images/users/${currentAvatar}`}
                            width="30px"
                            style={{ borderRadius: "50%" }}
                          />
                        )}

                        <span style={{ marginLeft: "8px" }}>
                          {currentUsername}
                        </span>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/profile" className="dropdown-item">
                            {language === "VN" ? (
                              <>Thông tin của tôi</>
                            ) : (
                              <>My Profile</>
                            )}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/order-history"
                            className="dropdown-item"
                          >
                            {language === "VN" ? (
                              <>Lịch sử đơn hàng</>
                            ) : (
                              <>Order History</>
                            )}
                          </NavLink>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => HandleLogout()}
                            href="#"
                          >
                            {language === "VN" ? <>Đăng xuất</> : <>Logout</>}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  {language === "VN" ? <>Đăng nhập</> : <>Sign in</>}
                </NavLink>
              </li>
            )}
          </ul>

          <ul
            className="navbar-nav d-none d-lg-flex"
            style={{ marginRight: "-1px" }}
          >
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbardrop"
                role="button"
                data-bs-toggle="dropdown"
              >
                <FontAwesomeIcon
                  style={{ fontSize: "18px", marginRight: "5px" }}
                  icon={icon({ name: "globe" })}
                />
                {language === "VN" ? <>Tiếng Việt</> : <>English</>}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
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
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => HandleChangeLanguage("ENG")}
                  >
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

            <li className="nav-item">
              {theme === "SUN" ? (
                <a className="nav-link">
                  <FontAwesomeIcon
                    style={{ fontSize: "18px" }}
                    icon={icon({ name: "sun" })}
                    onClick={() => HandleChangeTheme("MOON")}
                  />
                </a>
              ) : (
                <a className="nav-link">
                  <FontAwesomeIcon
                    style={{ fontSize: "18px" }}
                    icon={icon({ name: "moon" })}
                    onClick={() => HandleChangeTheme("SUN")}
                  />
                </a>
              )}
            </li>

            {logged === true ? (
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <i
                    className="fas fa-shopping-cart shopping-cart"
                    id="icon_cart"
                  ></i>
                  <span className="cart_count">{listCarts.length}</span>
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <i
                    className="fas fa-shopping-cart shopping-cart"
                    id="icon_cart"
                  ></i>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <nav
        className="navbar navbar-expand-lg d-lg-none navbar-dark justify-content-between fixed-top"
        style={{ backgroundColor: "#051922" }}
      >
        <Link to="/" className="navbar-brand">
          <img src="assets/img/logo.png" style={{ minWidth: "150px" }} alt="" />
        </Link>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-lg-none"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav d-lg-none">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                {language === "VN" ? <>Trang chủ</> : <>Home</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                {language === "VN" ? <>Về chúng tôi</> : <>About</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/news" className="nav-link">
                {language === "VN" ? <>Tin tức</> : <>News</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                {language === "VN" ? <>Liên hệ</> : <>Contact</>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className="nav-link">
                {language === "VN" ? <>Cửa hàng</> : <>Shop</>}
              </NavLink>
            </li>
            {logged === true ? (
              <>
                {currentUserAuthProvider === true ? (
                  <>
                    {provider === true ? (
                      <>
                        <li className="nav-item">
                          <a
                            className="nav-link dropdown-toggle"
                            data-bs-toggle="collapse"
                            data-bs-target="#demo"
                            href="#"
                          >
                            <img
                              src={currentGoogleUserAvatar}
                              style={{
                                borderRadius: "50%",
                                width: "30px",
                              }}
                            />
                          </a>
                        </li>
                        <ul
                          className="navbar-nav collapse d-lg-none ml-4"
                          id="demo"
                        >
                          <li className="nav-item">
                            <NavLink to="/order-history" className="nav-link">
                              {language === "VN" ? (
                                <>Lịch sử đơn hàng</>
                              ) : (
                                <>Order History</>
                              )}
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              onClick={() => HandleLogout()}
                              href="#"
                            >
                              {language === "VN" ? <>Đăng xuất</> : <>Logout</>}
                            </a>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <li className="nav-item">
                          <a
                            className="nav-link dropdown-toggle"
                            data-bs-toggle="collapse"
                            data-bs-target="#demo"
                            href="#"
                          >
                            <img
                              src={currentFacebookUserAvatar}
                              style={{
                                borderRadius: "50%",
                                width: "30px",
                              }}
                            />
                          </a>
                        </li>
                        <ul
                          className="navbar-nav collapse d-lg-none ml-4"
                          id="demo"
                        >
                          <li className="nav-item">
                            <NavLink to="/order-history" className="nav-link">
                              {language === "VN" ? (
                                <>Lịch sử đơn hàng</>
                              ) : (
                                <>Order History</>
                              )}
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              onClick={() => HandleLogout()}
                              href="#"
                            >
                              {language === "VN" ? <>Đăng xuất</> : <>Logout</>}
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="collapse"
                        data-bs-target="#demo"
                        href="#"
                      >
                        {currentAvatar === null ||
                        currentAvatar === "undefined" ? (
                          <FontAwesomeIcon
                            style={{ fontSize: "18px" }}
                            icon={icon({ name: "user" })}
                          />
                        ) : (
                          <img
                            src={`http://localhost:3434/images/users/${currentAvatar}`}
                            width="30px"
                            style={{ borderRadius: "50%" }}
                          />
                        )}

                        <span style={{ marginLeft: "8px" }}>
                          {currentUsername}
                        </span>
                      </a>
                    </li>
                    <ul
                      className="navbar-nav collapse d-lg-none ml-4"
                      id="demo"
                    >
                      <li className="nav-item">
                        <NavLink to="/profile" className="nav-link">
                          {language === "VN" ? (
                            <>Thông tin của tôi</>
                          ) : (
                            <>My Profile</>
                          )}
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/order-history" className="nav-link">
                          {language === "VN" ? (
                            <>Lịch sử đơn hàng</>
                          ) : (
                            <>Order History</>
                          )}
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => HandleLogout()}
                          href="#"
                        >
                          {language === "VN" ? <>Đăng xuất</> : <>Logout</>}
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  {language === "VN" ? <>Đăng nhập</> : <>Sign in</>}
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="collapse"
                data-bs-target="#demo1"
                href="#"
              >
                <FontAwesomeIcon
                  style={{ fontSize: "18px", marginRight: "5px" }}
                  icon={icon({ name: "globe" })}
                />
                {language === "VN" ? <>Tiếng Việt</> : <>English</>}
              </a>
            </li>
            <ul className="navbar-nav collapse d-lg-none ml-4" id="demo1">
              <li className="nav-item">
                <a
                  className="nav-link"
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
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => HandleChangeLanguage("ENG")}
                >
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

            <li className="nav-item">
              {theme === "SUN" ? (
                <a className="nav-link">
                  <FontAwesomeIcon
                    style={{ fontSize: "18px" }}
                    icon={icon({ name: "sun" })}
                    onClick={() => HandleChangeTheme("MOON")}
                  />
                </a>
              ) : (
                <a className="nav-link">
                  <FontAwesomeIcon
                    style={{ fontSize: "18px" }}
                    icon={icon({ name: "moon" })}
                    onClick={() => HandleChangeTheme("SUN")}
                  />
                </a>
              )}
            </li>

            {logged === true ? (
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <i
                    className="fas fa-shopping-cart shopping-cart"
                    id="icon_cart"
                  ></i>
                  <span className="cart_count">{listCarts.length}</span>
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <i
                    className="fas fa-shopping-cart shopping-cart"
                    id="icon_cart"
                  ></i>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
