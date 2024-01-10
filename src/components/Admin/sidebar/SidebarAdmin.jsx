import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SidebarAdmin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
const SidebarAdmin = (props) => {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  return (
    <>
      <ul
        className={
          props.showAdminBar === true
            ? "sidebar_mobile"
            : "navbar-nav sidebar sidebar-light accordion"
        }
        id="accordionSidebar"
      >
        <FontAwesomeIcon
          onClick={props.HandleHideAdminBar}
          className="x_icon_admin"
          icon={icon({ name: "x" })}
        />
        <Link
          className="sidebar-brand d-flex align-items-center ju stify-content-center"
          to="/admin/dashboard"
        >
          <div className="sidebar-brand-icon">
            <img src="./assets/img/logo/logo2.png" />
          </div>
          <div className="sidebar-brand-text mx-3">RuangAdmin</div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link className="nav-link" to="/admin/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Features</div>

        <li className="nav-item">
          <div
            className="nav-link collapsed"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAdminDropdown(!showAdminDropdown)}
          >
            <i className="fas fa-fw fa-table"></i>
            <span>Manage</span>
          </div>
          <div
            id="collapseTable"
            className="collapse"
            aria-labelledby="headingTable"
            data-parent="#accordionSidebar"
            style={{
              display: `${showAdminDropdown === true ? "block" : "none"}`,
            }}
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Manage</h6>
              <NavLink className="collapse-item" to="/admin/products">
                Fruits
              </NavLink>
              <NavLink className="collapse-item" to="/admin/contacts">
                Contacts
              </NavLink>
              <NavLink className="collapse-item" to="/admin/news">
                News
              </NavLink>
              <NavLink className="collapse-item" to="/admin/orders">
                Orders
              </NavLink>
            </div>
          </div>
        </li>

        <div className="version" id="version-ruangadmin"></div>
      </ul>
    </>
  );
};

export default SidebarAdmin;
