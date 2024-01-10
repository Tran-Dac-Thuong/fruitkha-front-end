import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import "./Product.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoCarouselSection from "./section/LogoCarouselSection";
import SkeletonProduct from "./skeleton/SkeletonProduct";
import CheckCookie from "./Auth/CheckCookie";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";

const Product = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameKeyword, setNameKeyword] = useState("");
  const [range, setRange] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  const language = useSelector((state) => state.language.language);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    props.setProgress(100);
  }, []);

  useEffect(() => {
    FetchDataFruits();
  }, []);

  const FetchDataFruits = async (page) => {
    let res = await axios.get(
      `http://localhost:3434/api/products?page=${
        page ? page : currentPage
      }&limit=${currentLimit}`
    );
    if (res && res.data.message === "OK") {
      setAllProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setLoadingProducts(true);
    }
  };

  const HandleSearchProduct = async (event) => {
    setNameKeyword(event);

    let res = await axios.post(
      "http://localhost:3434/api/search-product-by-name",
      { nameKeyword: event.toUpperCase() }
    );
    if (res && res.data.message === "OK") {
      setAllProducts(res.data.search_product);
    }
  };

  const HandleSearchByPrice = async () => {
    let res = await axios.post(
      "http://localhost:3434/api/search-product-by-price",
      { range }
    );
    if (res && res.data.message === "OK") {
      setAllProducts(res.data.search_product);
    }
  };

  const HandleReset = async () => {
    setRange(0);
    let res = await axios.get("http://localhost:3434/api/products");

    if (res.data.products) {
      setAllProducts(res.data.products);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await FetchDataFruits(+event.selected + 1);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{language === "VN" ? `Cửa hàng` : `Shop`}</title>
      </Helmet>
      <CheckCookie url="/product" />
      <div className="all_product_page">
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>
                    {language === "VN" ? (
                      <>Tươi và hữu cơ</>
                    ) : (
                      <>Fresh and Organic</>
                    )}
                  </p>
                  <h1>{language === "VN" ? <>Cửa hàng</> : <>Shop</>}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="product-section pt-150 pb-150"
          style={{
            backgroundColor: theme === "SUN" ? "white" : "#1a1a1a",
          }}
        >
          <div className="container">
            <div>
              <input
                type="text"
                className="form-control col-4"
                value={nameKeyword}
                onChange={(event) => HandleSearchProduct(event.target.value)}
                placeholder={
                  language === "VN"
                    ? "Tìm kiếm theo tên..."
                    : "Search by name..."
                }
              />
            </div>
            <br></br>
            <div>
              <input
                type="range"
                className="form-control col-4"
                min="0"
                max="200"
                step="1"
                value={range}
                onChange={(event) => setRange(event.target.value)}
              />
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "20px",
                  color: theme === "SUN" ? "#051922" : "white",
                }}
              >
                ${range}
              </span>
              <button
                type="button"
                style={{ marginLeft: "5px", marginTop: "-6px" }}
                className="btn btn-success"
                onClick={HandleSearchByPrice}
              >
                {language === "VN" ? <>Áp dụng</> : <>Apply</>}
              </button>
              <button
                type="button"
                style={{ marginLeft: "5px", marginTop: "-6px" }}
                className="btn btn-danger"
                onClick={HandleReset}
              >
                {language === "VN" ? <>Đặt lại</> : <>Reset</>}
              </button>
            </div>
            <br></br>
            <div className="row product-lists">
              {loadingProducts === true ? (
                <>
                  {allProducts && allProducts.length > 0 ? (
                    allProducts.map((item, index) => {
                      return (
                        <>
                          <div className="col-lg-4 col-md-6 text-center strawberry">
                            <div className="single-product-item">
                              <div className="product-image">
                                <Link to={`/product/${item.id}`}>
                                  <img
                                    src={`http://localhost:3434/images/fruits/${item.image}`}
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <h3
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                {item.product_name}
                              </h3>
                              <p
                                className="product-price"
                                style={{
                                  color: theme === "SUN" ? "#051922" : "white",
                                }}
                              >
                                ${item.price}{" "}
                              </p>
                              <Link
                                to={`/product/${item.id}`}
                                className="cart-btn"
                              >
                                <i className="fas fa-shopping-cart"></i>{" "}
                                {language === "VN" ? (
                                  <>Thêm vào giỏ hàng</>
                                ) : (
                                  <>Add to Cart</>
                                )}
                              </Link>
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
                        <>Không tìm thấy trái cây nào</>
                      ) : (
                        <>No fruits found</>
                      )}
                    </span>
                  )}
                </>
              ) : (
                <SkeletonProduct />
              )}
            </div>

            <div className="row">
              <div className="col-lg-12 text-center">
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

        <LogoCarouselSection />

        <Footer />
      </div>
    </>
  );
};
export default Product;
