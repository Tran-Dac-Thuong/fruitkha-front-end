import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import "./SingleNews.scss";
import LogoCarouselSection from "./section/LogoCarouselSection";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Helmet } from "react-helmet";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import ModalEdit from "react-bootstrap/Modal";
import ModalDelete from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SkeletonSingleNews from "./skeleton/SkeletonSingleNews";

const override: CSSProperties = {};

const SingleNews = (props) => {
  let { id } = useParams();

  const [detailNews, setDetailNews] = useState({});
  const [recentNews, setRecentNews] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [changeNews, setChangeNews] = useState("");
  const [comment, setComment] = useState("");
  const [statusComment, setStatusComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [logged, setLogged] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [currentUserId, setCurrentUserId] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [commentEditModal, setCommentEditModal] = useState(false);
  const [commentDeleteModal, setCommentDeleteModal] = useState(false);
  const [visibleItems, setVisibleItems] = useState(3);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const [loadingSingleNews, setLoadingSingleNews] = useState(false);

  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    props.setProgress(100);
  }, []);

  useEffect(() => {
    let cookie = new Cookies();
    let checkVerify = async () => {
      let verify = await axios.get("http://localhost:3434/api/check-cookie", {
        headers: {
          "access-token": cookie.get("token"),
        },
      });
      if (verify.data.message === "Success") {
        if (verify.data.role === "CUSTOMER") {
          navigate(`/news/${id}`);
          setCurrentUserId(verify.data.id);
          setLogged(true);
        } else {
          navigate("/forbien");
          window.location.reload();
        }
      } else {
        navigate(`/news/${id}`);
      }
    };
    checkVerify();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3434/api/news/${id}`);

      if (res && res.data) {
        setDetailNews(res.data.news);
        setLoadingSingleNews(true);
        setChangeNews("");
      } else {
        setDetailNews({});
      }
    }
    fetchData();
  }, [changeNews]);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3434/api/recent-news`);

      if (res && res.data) {
        setRecentNews(res.data.recentNews);
      } else {
        setRecentNews([]);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `http://localhost:3434/api/get-all-comments/${id}`
      );

      if (res && res.data.message === "OK") {
        setAllComments(res.data.comments);
        setLoadingComment(true);
      } else {
        setLoadingComment(true);

        setAllComments([]);
      }
    }
    fetchData();
  }, [statusComment, changeNews]);

  const HandleShowHideValidate = () => {
    if (comment.trim() !== "") {
      return true;
    }
  };

  const HandleSendComment = async () => {
    if (logged === true) {
      let timestamp = Date.now();

      let date = new Date(timestamp);

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      let formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

      let res = await axios.post("http://localhost:3434/api/send-comment", {
        userId: currentUser.id,
        newsId: id,
        comment: comment,
        created_at: formattedDate,
      });
      if (res && res.data.message === "OK") {
        setComment("");
        setStatusComment("Comment");
        setChangeNews("Add");
        toast.success(
          language === "VN"
            ? "Thêm bình luận thành công"
            : "Add comment success"
        );
      }
    } else {
      navigate("/login");
    }
  };

  const HandleShowHideEditCommentValidate = () => {
    if (editContent.trim() !== "") {
      return true;
    }
  };

  const HandleShowEditCommentModal = (comment) => {
    if (comment) {
      setCommentId(comment.id);
      setEditContent(comment.content);
    }
    setStatusComment("");
    setCommentEditModal(true);
  };

  const HandleShowDeleteCommentModal = (comment) => {
    if (comment) {
      setCommentId(comment.id);
    }
    setStatusComment("");
    setCommentDeleteModal(true);
  };

  const HandleHideCommentModal = () => {
    setCommentEditModal(false);
    setCommentDeleteModal(false);
  };

  const HandleEditComment = async () => {
    let res = await axios.put("http://localhost:3434/api/update-comment", {
      editContent,
      commentId,
    });
    if (res && res.data.message === "Update success") {
      setCommentEditModal(false);
      setStatusComment("Update Comment");
      setChangeNews("Edit");

      toast.success(
        language === "VN"
          ? "Cập nhật bình luận thành công"
          : "Update comment success"
      );
    }
  };

  const HandleDeleteComment = async () => {
    await axios.delete(`http://localhost:3434/api/delete-comment/${commentId}`);

    setCommentDeleteModal(false);
    setStatusComment("Delete Comment");
    setChangeNews("Delete");

    toast.success(
      language === "VN" ? "Xóa bình luận thành công" : "Delete comment success"
    );
  };

  const loadMoreHandler = () => {
    setLoadingLoadMore(true);
    setTimeout(() => {
      setLoadingLoadMore(false);
      setVisibleItems(visibleItems + 3);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Bài Viết Đơn Lẻ` : `Single News`}</title>
      </Helmet>
      <ModalEdit
        show={commentEditModal}
        onHide={HandleHideCommentModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {language === "VN" ? <>Chỉnh sửa nhận xét</> : <>Edit Comment</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>{language === "VN" ? <>Nội dung:</> : <>Content:</>}</label>
            <textarea
              className="form-control"
              placeholder={
                language === "VN" ? "Nhập nội dung..." : "Enter content..."
              }
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            {HandleShowHideEditCommentValidate() ? (
              <>
                {" "}
                <button
                  onClick={() => HandleEditComment()}
                  className="btn btn-warning add_product_modal_btn"
                  style={{ float: "right" }}
                >
                  {language === "VN" ? <>Lưu thay đổi</> : <>Save change</>}
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => HandleEditComment()}
                  className="btn btn-warning add_product_modal_btn"
                  style={{ float: "right", cursor: "not-allowed" }}
                  disabled
                >
                  {language === "VN" ? <>Lưu thay đổi</> : <>Save change</>}
                </button>
              </>
            )}

            <button
              onClick={() => HandleHideCommentModal()}
              className="btn btn-danger mr-2"
              style={{ float: "right" }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </ModalEdit>
      <ModalDelete
        show={commentDeleteModal}
        onHide={HandleHideCommentModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {language === "VN" ? <>Xóa nhận xét</> : <>Delete comment</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {language === "VN" ? (
            <>Bạn có chắc là muốn xoá bình luận này không?</>
          ) : (
            <>Are you sure you want to delete this comment?</>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="close_btn"
            onClick={() => HandleHideCommentModal()}
          >
            {language === "VN" ? <>Đóng</> : <>Close</>}
          </Button>
          <Button
            variant="danger"
            className="remove_btn"
            onClick={() => HandleDeleteComment()}
          >
            {language === "VN" ? <>Xóa bỏ</> : <>Delete</>}
          </Button>
        </Modal.Footer>
      </ModalDelete>
      <div className="all_singlenews_page">
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>
                    {language === "VN" ? (
                      <>Đọc chi tiết</>
                    ) : (
                      <>Read the Details</>
                    )}
                  </p>
                  <h1>
                    {language === "VN" ? (
                      <>Bài Viết Đơn Lẻ</>
                    ) : (
                      <>Single Article</>
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-150 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="single-article-section">
                  {loadingSingleNews === true ? (
                    <>
                      <div className="single-article-text">
                        <div className="">
                          <img
                            className="news_img"
                            src={`http://localhost:3434/images/news/${detailNews.image}`}
                          />
                        </div>
                        <p className="blog-meta">
                          <span
                            className="author"
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            <i className="fas fa-user"></i> {detailNews.author}
                          </span>
                          <span
                            className="date"
                            style={{
                              color: theme === "SUN" ? "#051922" : "white",
                            }}
                          >
                            <i className="fas fa-calendar"></i>{" "}
                            {detailNews.created_at}
                          </span>
                        </p>
                        <h2
                          style={{
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          {detailNews.title}
                        </h2>
                        <p
                          style={{
                            color: theme === "SUN" ? "#051922" : "white",
                          }}
                        >
                          {detailNews.content}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <SkeletonSingleNews />
                    </>
                  )}

                  <br />

                  <div className="comments-list-wrap">
                    <h3 className="comment-count-title">
                      {allComments.length} Comments
                    </h3>
                    {loadingComment === true ? (
                      <>
                        <div className="comment-list">
                          {allComments && allComments.length > 0 ? (
                            allComments
                              .slice(0, visibleItems)
                              .map((item, index) => {
                                return (
                                  <>
                                    <div className="single-comment-body">
                                      <div className="comment-user-avater">
                                        {item.userCommentData.avatar === null ||
                                        item.userCommentData.avatar ===
                                          "undefined" ? (
                                          <FontAwesomeIcon
                                            style={{
                                              fontSize: "60px",
                                            }}
                                            icon={icon({ name: "user" })}
                                          />
                                        ) : (
                                          <img
                                            src={
                                              item.userCommentData
                                                .auth_provider === "GOOGLE" ||
                                              item.userCommentData
                                                .auth_provider === "FACEBOOK"
                                                ? item.userCommentData.avatar
                                                : `http://localhost:3434/images/users/${item.userCommentData.avatar}`
                                            }
                                            alt=""
                                          />
                                        )}
                                      </div>
                                      <div className="comment-text-body">
                                        <h4>
                                          {item.userCommentData.first_name}{" "}
                                          {item.userCommentData.last_name}{" "}
                                          <span className="comment-date">
                                            {item.created_at}
                                          </span>{" "}
                                          {item.user_id === currentUserId ? (
                                            <>
                                              {" "}
                                              <FontAwesomeIcon
                                                style={{
                                                  marginLeft: "20px",
                                                  fontSize: "18px",
                                                  cursor: "pointer",
                                                }}
                                                icon={icon({
                                                  name: "edit",
                                                })}
                                                onClick={() =>
                                                  HandleShowEditCommentModal(
                                                    item
                                                  )
                                                }
                                              />
                                              <FontAwesomeIcon
                                                style={{
                                                  marginLeft: "20px",
                                                  fontSize: "18px",
                                                  cursor: "pointer",
                                                }}
                                                icon={icon({
                                                  name: "trash",
                                                })}
                                                onClick={() =>
                                                  HandleShowDeleteCommentModal(
                                                    item
                                                  )
                                                }
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </h4>

                                        <p>{item.content}</p>
                                      </div>
                                    </div>
                                  </>
                                );
                              })
                          ) : (
                            <h3>No comments found</h3>
                          )}
                        </div>
                        {visibleItems < allComments.length &&
                          (loadingLoadMore === true ? (
                            <PulseLoader
                              cssOverride={override}
                              color="#f28123"
                            />
                          ) : (
                            <h5
                              style={{ cursor: "pointer" }}
                              className="comment-count-title"
                              onClick={loadMoreHandler}
                            >
                              Load More
                            </h5>
                          ))}
                      </>
                    ) : (
                      <>
                        <PulseLoader cssOverride={override} color="#f28123" />
                      </>
                    )}
                  </div>

                  <div className="comment-template">
                    <h4>Leave a comment</h4>
                    <p>
                      If you have a comment dont feel hesitate to send us your
                      opinion.
                    </p>
                    <form>
                      <p>
                        <textarea
                          name="comment"
                          id="comment"
                          cols="30"
                          rows="10"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          placeholder="Your Message"
                        ></textarea>
                      </p>
                      <p>
                        {HandleShowHideValidate() ? (
                          <input
                            type="button"
                            value="Submit"
                            onClick={HandleSendComment}
                          />
                        ) : (
                          <input
                            type="button"
                            value="Submit"
                            style={{
                              backgroundColor: "#ffd699",
                              color: "#999999",
                              cursor: "not-allowed",
                            }}
                          />
                        )}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="sidebar-section">
                  <div className="recent-posts">
                    <h4
                      style={{
                        color: theme === "SUN" ? "#051922" : "white",
                      }}
                    >
                      {language === "VN" ? (
                        <>Bài viết gần đây</>
                      ) : (
                        <>Recent Posts</>
                      )}
                    </h4>
                    {recentNews && recentNews.length > 0 ? (
                      recentNews.map((item, index) => {
                        return (
                          <>
                            <ul
                              style={{
                                color: theme === "SUN" ? "#051922" : "white",
                              }}
                            >
                              <li>
                                <Link
                                  to={`/news/${item.id}`}
                                  onClick={() => setChangeNews("Changed")}
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            </ul>
                          </>
                        );
                      })
                    ) : (
                      <span
                        style={{
                          color: theme === "SUN" ? "#051922" : "white",
                        }}
                      >
                        {language === "VN" ? (
                          <>Không tìm thấy tin tức gần đây nào</>
                        ) : (
                          <>No recent news found</>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="tag-section">
                    <h4
                      style={{
                        color: theme === "SUN" ? "#051922" : "white",
                      }}
                    >
                      {language === "VN" ? <>Thẻ</> : <>Tags</>}
                    </h4>
                    <ul>
                      <li>
                        <Link to="/news">
                          {language === "VN" ? <>Quả táo</> : <>Apple</>}
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          {language === "VN" ? <>Quả dâu</> : <>Strawberry</>}
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          {language === "VN" ? <>Quả mọng</> : <>Berry</>}
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          {language === "VN" ? <>Quả cam</> : <>Orange</>}
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          {language === "VN" ? <>Chanh vàng</> : <>Lemon</>}
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          {language === "VN" ? <>Chuối</> : <>Banana</>}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LogoCarouselSection />

        <Footer />
      </div>
    </>
  );
};
export default SingleNews;
