import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import "./News.scss";
import CheckCookie from "./Auth/CheckCookie";
import axios from "axios";
import LogoCarouselSection from "./section/LogoCarouselSection";
import { Link } from "react-router-dom";
import SkeletonNews from "./skeleton/SkeletonNews";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const News = (props) => {
  const [allNews, setAllNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    props.setProgress(100);
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("http://localhost:3434/api/news");
      if (res.data.news) {
        setAllNews(res.data.news);
        setLoadingNews(true);
      }
    }
    fetchData();
  }, []);

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allNews.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allNews.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const PrePage = () => {
    if (currentPage !== firstIndex && firstIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const NextPage = () => {
    if (currentPage !== lastIndex && currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const ChangePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Tin tức` : `News`}</title>
      </Helmet>
      <CheckCookie url={"/news"} />

      <div className="all_news_page">
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>
                    {language === "VN" ? (
                      <>Thông tin hữu cơ</>
                    ) : (
                      <>Organic Information</>
                    )}
                  </p>
                  <h1>
                    {language === "VN" ? (
                      <>Bài Viết Tin Tức</>
                    ) : (
                      <>News Article</>
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="latest-news pt-150 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div className="row">
              {loadingNews === true ? (
                <>
                  {records && records.length > 0 ? (
                    records.map((item, index) => {
                      return (
                        <>
                          <div className="col-lg-4 col-md-6">
                            <div className="single-latest-news">
                              <Link to={`/news/${item.id}`}>
                                <div className="news-bg-1">
                                  <img
                                    src={`http://localhost:3434/images/news/${item.image}`}
                                  />
                                </div>
                              </Link>
                              <div className="news-text-box">
                                <h3>
                                  <Link
                                    to={`/news/${item.id}`}
                                    style={{
                                      color:
                                        theme === "SUN" ? "#051922" : "white",
                                    }}
                                  >
                                    {item.title}
                                  </Link>
                                </h3>
                                <p className="blog-meta">
                                  <span
                                    className="author"
                                    style={{
                                      color:
                                        theme === "SUN" ? "#051922" : "white",
                                    }}
                                  >
                                    <i className="fas fa-user"></i>{" "}
                                    {item.author}
                                  </span>
                                  <span
                                    className="date"
                                    style={{
                                      color:
                                        theme === "SUN" ? "#051922" : "white",
                                    }}
                                  >
                                    <i className="fas fa-calendar"></i>{" "}
                                    {item.created_at}
                                  </span>
                                </p>
                                <p
                                  className="excerpt"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  {item.content}
                                </p>
                                <Link
                                  to={`/news/${item.id}`}
                                  className="read-more-btn"
                                  style={{
                                    color:
                                      theme === "SUN" ? "#051922" : "white",
                                  }}
                                >
                                  {language === "VN" ? (
                                    <>đọc thêm</>
                                  ) : (
                                    <>read more</>
                                  )}{" "}
                                  <i className="fas fa-angle-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        marginLeft: "44%",
                        color: theme === "SUN" ? "#051922" : "white",
                      }}
                    >
                      {language === "VN" ? (
                        <>Không tìm thấy tin tức nào</>
                      ) : (
                        <>No news found</>
                      )}
                    </span>
                  )}
                </>
              ) : (
                <SkeletonNews />
              )}
            </div>

            <div className="row">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <div className="pagination-wrap">
                      <ul>
                        <li>
                          {currentPage !== 1 ? (
                            <a href="#" onClick={() => PrePage()}>
                              Prev
                            </a>
                          ) : (
                            <></>
                          )}
                        </li>
                        {numbers.map((n, i) => {
                          return (
                            <li key={i}>
                              <a
                                href="#"
                                className={`${
                                  currentPage === n ? "active" : ""
                                }`}
                                onClick={() => ChangePage(n)}
                              >
                                {n}
                              </a>
                            </li>
                          );
                        })}

                        <li>
                          {lastIndex < allNews.length ? (
                            <a href="#" onClick={() => NextPage()}>
                              Next
                            </a>
                          ) : (
                            <></>
                          )}
                        </li>
                      </ul>
                    </div>
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
export default News;
