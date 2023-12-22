import React, { useEffect, useState } from "react";
import FooterAdmin from "./footer/FooterAdmin";
import SidebarAdmin from "./sidebar/SidebarAdmin";
import NavbarAdmin from "./navbar/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./Orders.scss";
import Modal from "react-bootstrap/Modal";
import ModalDelete from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Helmet } from "react-helmet";

const Orders = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(0);
  const [dateKeyword, setDateKeyword] = useState("");
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersEmpty, setOrdersEmpty] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let cookie = new Cookies();
    let checkVerify = async () => {
      let verify = await axios.get("http://localhost:3434/api/check-cookie", {
        headers: {
          "access-token": cookie.get("token"),
        },
      });
      if (verify.data.message === "Success") {
        if (verify.data.role === "ADMIN") {
          setCurrentAdmin(verify.data.username);
          navigate("/admin/orders");
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
    FetchDataOrders();
  }, [status]);

  const FetchDataOrders = async (page) => {
    let res = await axios.get(
      `http://localhost:3434/api/orders?page=${
        page ? page : currentPage
      }&limit=${currentLimit}`
    );
    if (res && res.data.message === "OK") {
      setAllOrders(res.data.orders);
      setTotalPages(res.data.totalPages);
    } else if (res && res.data.message === "Not found") {
      setOrdersEmpty(true);
    }
  };

  const CloseStatusModal = () => {
    setShowStatusModal(false);
  };

  const HandleAdminLogout = async () => {
    let logout = await axios.get("http://localhost:3434/api/logout");
    if (logout.data.errCode === 0) {
      let cookie = new Cookies();

      cookie.remove("token", { path: "/" });
      navigate("/login");

      toast.success("Logout success");
    }
  };

  const HandleSearchOrders = async () => {
    let ngayNhapVao = dateKeyword;

    // Tạo một đối tượng Date từ chuỗi đầu vào
    let ngay = new Date(ngayNhapVao);

    // Lấy ngày, tháng và năm từ đối tượng Date
    let ngayFormatted = ngay.getDate();
    let thangFormatted = ngay.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    let namFormatted = ngay.getFullYear();

    // Định dạng lại chuỗi ngày theo định dạng mong muốn
    let dateKeywordFormat = `${ngayFormatted}-${thangFormatted}-${namFormatted}`;

    let res = await axios.post(
      "http://localhost:3434/api/search-orders-by-date",
      { dateKeywordFormat }
    );
    if (res && res.data.message === "OK") {
      setAllOrders(res.data.search_orders);
    }
  };

  const HandleReset = async () => {
    setDateKeyword("");

    await FetchDataOrders(currentPage);
  };

  const ChangeStatus = (order) => {
    if (order) {
      setId(order.id);
    }
    setStatus("");
    setShowStatusModal(true);
  };

  const HandleUpdateStatusOrder = async () => {
    let status = "Complete shipping";
    await axios.put("http://localhost:3434/api/update-status-order", {
      status,
      id,
    });
    setShowStatusModal(false);
    setStatus("Update Status");
    toast.success("Update status success");
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await FetchDataOrders(+event.selected + 1);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RuangAdmin - Orders</title>
      </Helmet>
      <ModalDelete show={showStatusModal} onHide={CloseStatusModal}>
        <Modal.Header>
          <Modal.Title>Update status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the status of the order whose id is{" "}
          <span className="text-danger delete_modal">{id}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="close_btn"
            onClick={() => CloseStatusModal()}
          >
            Close
          </Button>
          <Button
            variant="warning"
            className="remove_btn"
            onClick={() => HandleUpdateStatusOrder()}
          >
            Update
          </Button>
        </Modal.Footer>
      </ModalDelete>
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
                <h1 className="h3 mb-0 text-gray-800">Orders</h1>
              </div>

              <p></p>
              <div className="row" style={{ marginLeft: "0px" }}>
                <input
                  type="date"
                  value={dateKeyword}
                  onChange={(event) => setDateKeyword(event.target.value)}
                  className="form-control col-4"
                />

                <button
                  className="btn btn-success ml-2"
                  onClick={HandleSearchOrders}
                >
                  Search
                </button>
                <button className="btn btn-danger ml-2" onClick={HandleReset}>
                  Reset
                </button>
              </div>

              <p></p>

              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div className="card">
                    <div className="table-responsive">
                      <table className="table align-items-center table-flush">
                        <thead className="tb_head">
                          <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Order</th>
                            <th>Quantity</th>
                            <th>Payment method</th>
                            <th>Status</th>
                            <th>Total price</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allOrders && allOrders.length > 0 ? (
                            allOrders.map((item, index) => {
                              return (
                                <>
                                  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.userOrderData.email}</td>
                                    <td>
                                      {item.productOrderData.product_name}
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>
                                      {item.payment_method === "PAYPAL" ? (
                                        <img
                                          src="./assets/img/paypal.png"
                                          style={{ borderRadius: "3px" }}
                                          width="40px"
                                        />
                                      ) : (
                                        <img
                                          src="./assets/img/momo.png"
                                          style={{ borderRadius: "3px" }}
                                          width="40px"
                                        />
                                      )}
                                    </td>
                                    <td>
                                      {item.status ===
                                      "Shipping in progress" ? (
                                        <span className="badge badge-danger">
                                          {item.status}
                                        </span>
                                      ) : (
                                        <span className="badge badge-success">
                                          {item.status}
                                        </span>
                                      )}
                                    </td>
                                    <td>${item.total_cost}</td>
                                    <td>{item.date}</td>

                                    <td className="action_orders">
                                      {item.status ===
                                      "Shipping in progress" ? (
                                        <FontAwesomeIcon
                                          style={{
                                            cursor: "pointer",
                                            marginTop: "5px",
                                            marginLeft: "17px",
                                          }}
                                          onClick={() => ChangeStatus(item)}
                                          icon={icon({ name: "pen-to-square" })}
                                        />
                                      ) : (
                                        <></>
                                      )}
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                          ) : ordersEmpty === false ? (
                            <tr>
                              <td colSpan="8" style={{ textAlign: "center" }}>
                                <ScaleLoader
                                  style={{ textAlign: "center" }}
                                  color="#6777ef"
                                />
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td
                                colSpan={9}
                                style={{
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                No order found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer"></div>
                  </div>
                  <br />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {totalPages > 0 && (
                      <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={3}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterAdmin />
    </>
  );
};

export default Orders;
