import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./NavbarAdmin.scss";
import SidebarAdmin from "../sidebar/SidebarAdmin";

const NavbarAdmin = (props) => {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showAdminBar, setShowAdminBar] = useState(false);

  let HandleShowAdminBar = () => {
    setShowAdminBar(true);
  };

  let HandleHideAdminBar = () => {
    setShowAdminBar(false);
  };

  return (
    <>
      {" "}
      {showAdminBar === true ? (
        <SidebarAdmin
          showAdminBar={showAdminBar}
          HandleHideAdminBar={HandleHideAdminBar}
        />
      ) : (
        <></>
      )}
      <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
        <FontAwesomeIcon
          onClick={() => HandleShowAdminBar()}
          className="bars_icon_admin"
          icon={icon({ name: "bars" })}
        />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <div
              className="nav-link dropdown-toggle"
              style={{ cursor: "pointer" }}
              onClick={() => setShowAdminDropdown(!showAdminDropdown)}
            >
              <img
                className="img-profile rounded-circle"
                src="./assets/img/boy.png"
                style={{ maxWidth: "60px" }}
              />
              <span className="ml-2 d-none d-lg-inline text-white small">
                {props.currentAdmin}
              </span>
            </div>

            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              style={{
                display: `${showAdminDropdown === true ? "block" : "none"}`,
              }}
              aria-labelledby="userDropdown"
            >
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#logoutModal"
                onClick={props.HandleAdminLogout}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavbarAdmin;
