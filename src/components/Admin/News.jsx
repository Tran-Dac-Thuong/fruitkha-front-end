import React, { useEffect, useState } from "react";
import FooterAdmin from "./footer/FooterAdmin";
import SidebarAdmin from "./sidebar/SidebarAdmin";
import NavbarAdmin from "./navbar/NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./News.scss";
import Modal from "react-bootstrap/Modal";
import ModalEdit from "react-bootstrap/Modal";
import ModalDelete from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Helmet } from "react-helmet";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [showImg, setShowImg] = useState("");
  const [validate, setValidate] = useState("");
  const [newsModal, setNewsModal] = useState(false);
  const [newsEditModal, setNewsEditModal] = useState(false);
  const [newsDeleteModal, setNewsDeleteModal] = useState(false);
  const [status, setStatus] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateKeyword, setDateKeyword] = useState("");
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [newsEmpty, setNewsEmpty] = useState(false);

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
          navigate("/admin/news");
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
    FetchDataNews();
  }, [status]);

  const FetchDataNews = async (page) => {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/news?page=${
        page ? page : currentPage
      }&limit=${currentLimit}`
    );
    if (res && res.data.message === "OK") {
      setAllNews(res.data.news);
      setTotalPages(res.data.totalPages);
    } else if (res && res.data.message === "Not found") {
      setNewsEmpty(true);
    }
  };

  const HandleShowNewsModal = () => {
    setNewsModal(true);
    setTitle("");
    setContent("");
    setImage("");
    setShowImg("");
    setStatus("");
  };

  const HandleShowEditNewsModal = (news) => {
    if (news) {
      setId(news.id);
      setTitle(news.title);
      setContent(news.content);
      setCurrentImg(news.image);
    }
    setNewsEditModal(true);
    setImage("");
    setShowImg("");
    setStatus("");
  };

  const HandleShowDeleteNewsModal = (news) => {
    if (news) {
      setId(news.id);
      setTitle(news.title);
    }

    setNewsDeleteModal(true);
  };

  const HandleHideNewsModal = () => {
    setNewsModal(false);
    setNewsEditModal(false);
    setNewsDeleteModal(false);
    setValidate("");
  };

  const UploadImage = (event) => {
    let file = event.target.files[0];
    setImage(file);
    setShowImg(URL.createObjectURL(file));
  };

  const HandleValidate = () => {
    let msg = {};

    if (title.trim() === "") {
      msg.title = "Title is required!";
    }
    if (content.trim() === "") {
      msg.content = "Content is required!";
    }

    if (image === "") {
      msg.images = "Please choose your image";
    } else if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      msg.images =
        "Please select a file with the extension .png, .jpg and .jpeg";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleEditValidate = () => {
    let msg = {};

    if (title.trim() === "") {
      msg.title = "Title is required!";
    }
    if (content.trim() === "") {
      msg.content = "Content is required!";
    }
    if (image !== "" && !image.name.match(/\.(jpg|jpeg|png)$/)) {
      msg.images =
        "Please select a file with the extension .png, .jpg and .jpeg";
    }

    setValidate(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleAddNews = async () => {
    let isValid = HandleValidate();

    if (!isValid) {
      return;
    }

    let timestamp = Date.now();

    let date = new Date(timestamp);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    for (let i = 0; i < allNews.length; i++) {
      if (title.trim() === allNews[i].title) {
        toast.error("Title has already exist");
        return false;
      }
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("created_at", formattedDate);
    formData.append("image", image);
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/create-news`,
      formData
    );
    if (response && response.data.message === "Create success") {
      setTitle("");
      setContent("");

      setImage("");
      setShowImg("");
      setNewsModal(false);
      setStatus("Create");
      toast.success("Add news success");
    } else {
      toast.error("Add news failed");
    }
  };

  const HandleUpdateNews = async () => {
    let isValid = HandleEditValidate();

    if (!isValid) {
      return;
    }

    let formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    let res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/update-news`,
      formData
    );
    setStatus("Update");
    setNewsEditModal(false);
    toast.success("Update news success");
  };
  const HandleDeleteNews = async () => {
    let oldLength = allNews.length;

    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/delete-news/${id}`
    );

    if (oldLength - 1 === 0) {
      setAllNews([]);
    }

    setNewsDeleteModal(false);
    setStatus("Delete");
    toast.success("Delete news success");
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

  const HandleSearchNews = async () => {
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
      `${process.env.REACT_APP_BACKEND_URL}/api/search-news-by-date`,
      { dateKeywordFormat }
    );
    if (res && res.data.message === "OK") {
      setAllNews(res.data.search_news);
    } else if (res && res.data.message === "Fail") {
      setAllNews([]);
      setNewsEmpty(true);
    }
  };

  const HandleReset = async () => {
    setDateKeyword("");
    await FetchDataNews(currentPage);
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await FetchDataNews(+event.selected + 1);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RuangAdmin - News</title>
      </Helmet>
      <Modal
        show={newsModal}
        onHide={HandleHideNewsModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>News Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <span className="text-danger msg">{validate.title}</span>
          </div>

          <div className="form-group">
            <label>Content:</label>
            <textarea
              className="form-control"
              placeholder="Enter content..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <span className="text-danger msg">{validate.content}</span>
          </div>

          <div className="form-group">
            <label className="img_label">Image:</label>
            <img src={showImg} width="80px" className="show-img" alt="" />

            <input
              type="file"
              name="file"
              className="form-control"
              onChange={UploadImage}
            />

            <span className="text-danger msg">{validate.images}</span>
          </div>

          <div className="form-group">
            <button onClick={() => HandleAddNews()} className="btn btn-primary">
              Add new
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <ModalEdit
        show={newsEditModal}
        onHide={HandleHideNewsModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>News Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <span className="text-danger msg">{validate.title}</span>
          </div>

          <div className="form-group">
            <label>Content:</label>
            <textarea
              className="form-control"
              placeholder="Enter content..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <span className="text-danger msg">{validate.content}</span>
          </div>
          <div className="form-group">
            <label>Current Image</label>
            <br />
            <img
              className="current_img"
              src={`${process.env.REACT_APP_BACKEND_URL}/images/news/${currentImg}`}
              width="80px"
              alt=""
            />
          </div>
          <div className="form-group">
            <label className="img_label">Image:</label>
            <img src={showImg} width="80px" className="show-img" alt="" />

            <input
              type="file"
              name="file"
              className="form-control"
              onChange={UploadImage}
            />
            <span className="text-danger msg">{validate.images}</span>
          </div>

          <div className="form-group">
            <button
              onClick={() => HandleUpdateNews()}
              className="btn btn-warning"
            >
              Update
            </button>
          </div>
        </Modal.Body>
      </ModalEdit>
      <ModalDelete show={newsDeleteModal} onHide={HandleHideNewsModal}>
        <Modal.Header>
          <Modal.Title>Delete news</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the news whose id is{" "}
          <span className="text-danger delete_modal">{id}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="close_btn"
            onClick={() => HandleHideNewsModal()}
          >
            Close
          </Button>
          <Button
            variant="danger"
            className="remove_btn"
            onClick={() => HandleDeleteNews()}
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
                <h1 className="h3 mb-0 text-gray-800">News</h1>
              </div>
              <button className="btn btn-primary" onClick={HandleShowNewsModal}>
                Add new news
              </button>
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
                  onClick={HandleSearchNews}
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
                            <th>Author</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Image</th>
                            <th>Create at</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allNews && allNews.length > 0 ? (
                            allNews.map((item, index) => {
                              return (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.author}</td>
                                  <td>{item.title}</td>
                                  <td>{item.content}</td>

                                  <td>
                                    <img
                                      src={`${process.env.REACT_APP_BACKEND_URL}/images/news/${item.image}`}
                                      alt=""
                                      width="80px"
                                    />
                                  </td>
                                  <td>{item.created_at}</td>

                                  <td className="action_product">
                                    <FontAwesomeIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        HandleShowEditNewsModal(item)
                                      }
                                      icon={icon({ name: "pen-to-square" })}
                                    />
                                    <FontAwesomeIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        HandleShowDeleteNewsModal(item)
                                      }
                                      icon={icon({ name: "trash" })}
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          ) : newsEmpty === false ? (
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
                                No news found
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

export default News;
