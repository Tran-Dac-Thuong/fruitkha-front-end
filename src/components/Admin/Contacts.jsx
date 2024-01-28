import React, { useEffect, useState } from "react";
import FooterAdmin from "./footer/FooterAdmin";
import SidebarAdmin from "./sidebar/SidebarAdmin";
import NavbarAdmin from "./navbar/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./Contacts.scss";
import Modal from "react-bootstrap/Modal";
import ModalDelete from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import ReactPaginate from "react-paginate";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Helmet } from "react-helmet";

const Contacts = () => {
  const [contactsDeleteModal, setContactsDeleteModal] = useState(false);
  const [contactsModal, setContactsModal] = useState(false);
  const [validate, setValidate] = useState("");
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [allContact, setAllContact] = useState([]);
  const [id, setId] = useState(0);
  const [status, setStatus] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateKeyword, setDateKeyword] = useState("");
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [contactsEmpty, setContactsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

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
          navigate("/admin/contacts");
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
    FetchDataContacts();
  }, [status]);

  const FetchDataContacts = async (page) => {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/contacts?page=${
        page ? page : currentPage
      }&limit=${currentLimit}`
    );
    if (res && res.data.message === "OK") {
      setAllContact(res.data.contacts);
      setTotalPages(res.data.totalPages);
    } else if (res && res.data.message === "Not found") {
      setContactsEmpty(true);
    }
  };

  const HandleShowDeleteContactsModal = (contact) => {
    if (contact) {
      setId(contact.id);
    }

    setContactsDeleteModal(true);
  };

  const HandleShowContactsModal = (contact) => {
    if (contact) {
      setId(contact.id);
      setCusEmail(contact.customer_email);
      setCusName(contact.customer_name);
      setMessage(contact.message);
    }
    setContactsModal(true);
    setValidate("");
  };

  const HandleHideContactsModal = () => {
    setContactsDeleteModal(false);
    setContactsModal(false);
  };

  const HandleDeleteContact = async () => {
    let oldLength = allContact.length;

    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/delete-contact/${id}`
    );

    if (oldLength - 1 === 0) {
      setAllContact([]);
    }

    setContactsDeleteModal(false);
    setStatus("Delete");
    toast.success("Delete contact success");
  };

  const HandleValidate = () => {
    let msg = {};

    if (answer.trim() === "") {
      msg.answer = "Please reply to customers";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleSendEmail = async () => {
    let isValid = HandleValidate();

    if (!isValid) {
      return;
    }

    setLoading(true);

    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/send-email`,
      {
        cusEmail,
        cusName,
        answer,
      }
    );

    if (response && response.data.message === "Send success") {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setAnswer("");
      setContactsModal(false);
      setStatus("Send");

      toast.success("Send email success");
    } else {
      toast.error("Send email failed");
    }
  };

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

  const HandleSearchContact = async () => {
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
      `${process.env.REACT_APP_BACKEND_URL}/api/search-contacts-by-date`,
      { dateKeywordFormat }
    );
    if (res && res.data.message === "OK") {
      setAllContact(res.data.search_contacts);
    } else if (res && res.data.message === "Fail") {
      setAllContact([]);
      setContactsEmpty(true);
    }
  };

  const HandleReset = async () => {
    setDateKeyword("");

    await FetchDataContacts(currentPage);
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await FetchDataContacts(+event.selected + 1);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RuangAdmin - Contacts</title>
      </Helmet>
      <Modal
        show={contactsModal}
        onHide={HandleHideContactsModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Contacts Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Customer name:</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={cusName}
              onChange={(event) => setCusName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Customer email:</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={cusEmail}
              onChange={(event) => setCusEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              className="form-control"
              readOnly
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Answer:</label>
            <textarea
              className="form-control"
              placeholder="Your answer..."
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            ></textarea>
            <span className="text-danger msg">{validate.answer}</span>
          </div>

          <div className="form-group">
            {loading === true ? (
              <button class="btn btn-primary" disabled>
                <span class="spinner-border spinner-border-sm"></span>
                Loading..
              </button>
            ) : (
              <button
                onClick={() => HandleSendEmail()}
                className="btn btn-primary"
              >
                Send email
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <ModalDelete show={contactsDeleteModal} onHide={HandleHideContactsModal}>
        <Modal.Header>
          <Modal.Title>Delete contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the contact whose id is{" "}
          <span className="text-danger delete_modal">{id}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="close_btn"
            onClick={() => HandleHideContactsModal()}
          >
            Close
          </Button>
          <Button
            variant="danger"
            className="remove_btn"
            onClick={() => HandleDeleteContact()}
          >
            Delete
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
                <h1 className="h3 mb-0 text-gray-800">Contacts</h1>
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
                  onClick={HandleSearchContact}
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
                            <th>Customer email</th>
                            <th>Customer name</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Created at</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allContact && allContact.length > 0 ? (
                            allContact.map((item, index) => {
                              return (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.customer_email}</td>
                                  <td>{item.customer_name}</td>
                                  <td>{item.phone}</td>
                                  <td>{item.subject}</td>
                                  <td>{item.message}</td>
                                  <td>{item.created_at}</td>

                                  <td className="action_product">
                                    <FontAwesomeIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        HandleShowContactsModal(item)
                                      }
                                      icon={icon({ name: "paper-plane" })}
                                    />
                                    <FontAwesomeIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        HandleShowDeleteContactsModal(item)
                                      }
                                      icon={icon({ name: "trash" })}
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          ) : contactsEmpty === false ? (
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
                                colSpan={8}
                                style={{
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                No contacts found
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

export default Contacts;
