import React, { useEffect, useState } from "react";
import NavbarAdmin from "./navbar/NavbarAdmin";
import SidebarAdmin from "./sidebar/SidebarAdmin";
import FooterAdmin from "./footer/FooterAdmin";
import "./Dashboard.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import SkeletonDashboard from "../skeleton/SkeletonDashboard";
import { Helmet } from "react-helmet";
const Dashboard = () => {
  const [earning, setEarning] = useState(0);
  const [pending, setPending] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentMonth = new Date().getMonth() + 1;

  const [currentAdmin, setCurrentAdmin] = useState("");

  const navigate = useNavigate();

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
        if (verify.data.role === "ADMIN") {
          setCurrentAdmin(verify.data.username);
          navigate("/admin/dashboard");
        } else {
          navigate("/forbien");
          window.location.reload();
        }
      } else {
        navigate("/login");
      }
    };
    checkVerify();
  }, []);

  useEffect(() => {
    FetchTotalOrders();
  }, []);

  const FetchTotalOrders = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/get-total-orders`
    );
    if (res && res.data.message === "OK") {
      setTotalOrders(res.data.totalOrders);
      setLoading(true);
    }
  };

  useEffect(() => {
    FetchTotalUsers();
  }, []);

  const FetchTotalUsers = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/get-total-users`
    );
    if (res && res.data.message === "OK") {
      setTotalUsers(res.data.totalUsers);
      setLoading(true);
    }
  };

  useEffect(() => {
    FetchTotalPending();
  }, []);

  const FetchTotalPending = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/get-total-pending`
    );
    if (res && res.data.message === "OK") {
      setPending(res.data.pendingRequest);
      setLoading(true);
    }
  };

  useEffect(() => {
    let calculatedTotalPrice = 0.0;

    const ordersInCurrentMonth = totalOrders.filter(
      (order) => new Date(order.createdAt).getMonth() + 1 === currentMonth
    );

    for (const order of ordersInCurrentMonth) {
      calculatedTotalPrice += order.total_cost;
    }
    setEarning(calculatedTotalPrice);
    setLoading(true);
  }, [totalOrders, currentMonth]);

  const HandleAdminLogout = async () => {
    let logout = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/logout`
    );
    if (logout.data.errCode === 0) {
      let cookie = new Cookies();

      cookie.remove("token", { path: "/" });
      navigate("/login");

      toast.success("Logout success");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RuangAdmin - Dashboard</title>
      </Helmet>
      <div id="wrapper">
        <SidebarAdmin />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <NavbarAdmin
              currentAdmin={currentAdmin}
              HandleAdminLogout={HandleAdminLogout}
            />

            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>

              <div className="row mb-3">
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Earnings (Monthly)
                          </div>
                          {loading === true ? (
                            <>
                              {" "}
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                ${earning}
                              </div>
                            </>
                          ) : (
                            <>
                              <SkeletonDashboard />
                            </>
                          )}

                          <div className="mt-2 mb-0 text-muted text-xs">
                            <span className="text-success mr-2">
                              <i className="fa fa-arrow-up"></i> 3.48%
                            </span>
                            <span>Since last month</span>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar fa-2x text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Sales
                          </div>
                          {loading === true ? (
                            <>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {totalOrders.length}
                              </div>
                            </>
                          ) : (
                            <>
                              <SkeletonDashboard />
                            </>
                          )}

                          <div className="mt-2 mb-0 text-muted text-xs">
                            <span className="text-success mr-2">
                              <i className="fas fa-arrow-up"></i> 12%
                            </span>
                            <span>Since last years</span>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-shopping-cart fa-2x text-success"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            New User
                          </div>
                          {loading === true ? (
                            <>
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                {totalUsers.length}
                              </div>
                            </>
                          ) : (
                            <>
                              <SkeletonDashboard />
                            </>
                          )}

                          <div className="mt-2 mb-0 text-muted text-xs">
                            <span className="text-success mr-2">
                              <i className="fas fa-arrow-up"></i> 20.4%
                            </span>
                            <span>Since last month</span>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-users fa-2x text-info"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Pending Requests
                          </div>
                          {loading === true ? (
                            <>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {pending.length}
                              </div>
                            </>
                          ) : (
                            <>
                              <SkeletonDashboard />
                            </>
                          )}

                          <div className="mt-2 mb-0 text-muted text-xs">
                            <span className="text-danger mr-2">
                              <i className="fas fa-arrow-down"></i> 1.10%
                            </span>
                            <span>Since yesterday</span>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-warning"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-5 product_sold">
                  <div className="card mb-4 card_recharts">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Products Sold
                      </h6>
                    </div>

                    <ResponsiveContainer width="100%" aspect={3}>
                      <AreaChart
                        width={1200}
                        height={500}
                        data={totalOrders}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="total_cost"
                          stroke="#6777ef"
                          fill="#6777ef"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
