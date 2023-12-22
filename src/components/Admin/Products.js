import React, { useEffect, useState } from "react";
import NavbarAdmin from "./navbar/NavbarAdmin";
import FooterAdmin from "./footer/FooterAdmin";
import SidebarAdmin from "./sidebar/SidebarAdmin";
import "./Products.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
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

const Products = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [id, setId] = useState(0);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [productEditModal, setProductEditModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState(false);
  const [showImg, setShowImg] = useState("");
  const [validate, setValidate] = useState("");
  const [nameKeyword, setNameKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [clickStocking, setClickStocking] = useState(false);
  const [clickSoldOut, setClickSoldOut] = useState(false);
  const [productStockingStatus, setProductStockingStatus] =
    useState("Stocking");
  const [productSoldoutStatus, setProductSoldoutStatus] = useState("Sold out");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [productsEmpty, setProductsEmpty] = useState(false);

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
          navigate("/admin/products");
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
    FetchDataFruits();
  }, [status]);

  const FetchDataFruits = async (page) => {
    let res = await axios.get(
      `http://localhost:3434/api/products?page=${
        page ? page : currentPage
      }&limit=${currentLimit}`
    );
    if (res && res.data.message === "OK") {
      setAllProduct(res.data.products);
      setTotalPages(res.data.totalPages);
    } else if (res && res.data.message === "Not found") {
      setProductsEmpty(true);
    }
  };

  const HandleShowProductModal = () => {
    setProductModal(true);
    setProductName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setImage("");
    setShowImg("");
    setStatus("");
  };

  const HandleShowEditProductModal = (fruit) => {
    if (fruit) {
      setId(fruit.id);
      setProductName(fruit.product_name);
      setDescription(fruit.description);
      setPrice(fruit.price);
      setQuantity(fruit.quantity);
      setCurrentImg(fruit.image);
    }
    setImage("");
    setShowImg("");
    setValidate("");
    setStatus("");
    setProductEditModal(true);
  };

  const HandleShowDeleteProductModal = (fruit) => {
    if (fruit) {
      setId(fruit.id);
      setProductName(fruit.product_name);
    }
    setProductDeleteModal(true);
  };

  const HandleHideProductModal = () => {
    setProductModal(false);
    setProductEditModal(false);
    setProductDeleteModal(false);
    setValidate("");
  };

  const UploadImage = (event) => {
    let file = event.target.files[0];
    console.log("check file: ", file);

    setImage(file);

    setShowImg(URL.createObjectURL(file));
  };

  const HandleValidate = () => {
    let msg = {};

    if (productName.trim() === "") {
      msg.name = "Name is required!";
    }
    if (description.trim() === "") {
      msg.description = "Description is required!";
    }
    if (price === "") {
      msg.price = "Price is required!";
    } else if (price < 10 || price > 1000) {
      msg.price = "Price from 10 to 1000";
    }
    if (quantity === "") {
      msg.quantity = "Quantity is required!";
    } else if (quantity <= 0 || quantity > 1000) {
      msg.quantity = "Quantity from 1 to 100";
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

    if (productName.trim() === "") {
      msg.name = "Name is required!";
    }
    if (description.trim() === "") {
      msg.description = "Description is required!";
    }
    if (price === "") {
      msg.price = "Price is required!";
    } else if (price < 10 || price > 1000) {
      msg.price = "Price from 10 to 1000";
    }
    if (quantity === "") {
      msg.quantity = "Quantity is required!";
    } else if (quantity <= 0 || quantity > 1000) {
      msg.quantity = "Quantity from 1 to 100";
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

  const HandleAddProduct = async () => {
    let isValid = HandleValidate();

    if (!isValid) {
      return;
    }

    for (let i = 0; i < allProduct.length; i++) {
      if (productName.toUpperCase().trim() === allProduct[i].product_name) {
        toast.error("Product name has already exist");
        return false;
      }
    }

    const formData = new FormData();
    formData.append("product_name", productName.toUpperCase());
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    let response = await axios.post(
      "http://localhost:3434/api/create-product",
      formData
    );

    if (response && response.data.message === "Create success") {
      setProductName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImage("");
      setShowImg("");
      setProductModal(false);
      setStatus("Create");
      toast.success("Add fruit success");
    } else {
      toast.error("Add fruit failed");
    }
  };
  const HandleUpdateProduct = async () => {
    let isValid = HandleEditValidate();

    if (!isValid) {
      return;
    }

    let formData = new FormData();
    formData.append("id", id);
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    let res = await axios.put(
      "http://localhost:3434/api/update-product",
      formData
    );
    setStatus("Update");
    setProductEditModal(false);
    toast.success("Update fruit success");
  };
  const HandleDeleteProduct = async () => {
    let oldLength = allProduct.length;

    await axios.delete(`http://localhost:3434/api/delete-product/${id}`);

    if (oldLength - 1 === 0) {
      setAllProduct([]);
    }
    setProductDeleteModal(false);
    setStatus("Delete");
    toast.success("Delete fruit success");
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

  const HandleSearchProduct = async () => {
    let res = await axios.post(
      "http://localhost:3434/api/search-product-by-name",
      { nameKeyword: nameKeyword.toUpperCase() }
    );
    if (res && res.data.message === "OK") {
      setAllProduct(res.data.search_product);
    }
  };

  const HandleClickStocking = async () => {
    setClickStocking(!clickStocking);
    if (clickStocking === true) {
      setProductStockingStatus("");
    }

    setProductStockingStatus("Stocking");
    let res = await axios.post(
      "http://localhost:3434/api/search-product-by-status",
      {
        productSoldoutStatus: clickStocking
          ? ""
          : clickSoldOut === true
          ? productSoldoutStatus
          : null,
        productStockingStatus: productStockingStatus
          ? productStockingStatus
          : "",
      }
    );

    if (res && res.data.message === "OK") {
      setAllProduct(res.data.search_product_by_status);
    }
  };

  const HandleClickSoldOut = async () => {
    setClickSoldOut(!clickSoldOut);
    if (clickSoldOut === true) {
      setProductSoldoutStatus("");
    }
    setProductSoldoutStatus("Sold out");

    let res = await axios.post(
      "http://localhost:3434/api/search-product-by-status",
      {
        productSoldoutStatus: productSoldoutStatus ? productSoldoutStatus : "",
        productStockingStatus: clickSoldOut
          ? ""
          : clickStocking === true
          ? productStockingStatus
          : null,
      }
    );
    if (res && res.data.message === "OK") {
      setAllProduct(res.data.search_product_by_status);
    }
  };

  const CloseStatusModal = () => {
    setShowStatusModal(false);
  };

  const ChangeStatus = (product) => {
    if (product) {
      setId(product.id);
      setProductName(product.product_name);
    }
    setShowStatusModal(true);
  };

  const HandleUpdateStatusProduct = async () => {
    let status = "Sold out";
    await axios.put("http://localhost:3434/api/update-status-product", {
      status,
      id,
    });
    setShowStatusModal(false);
    setStatus("Update Status");
    toast.success("Update status success");
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await FetchDataFruits(+event.selected + 1);
  };

  const HandleReset = async () => {
    setNameKeyword("");
    setClickSoldOut(false);
    setClickStocking(false);
    await FetchDataFruits(currentPage);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RuangAdmin - Fruits</title>
      </Helmet>
      <Modal
        show={productModal}
        onHide={HandleHideProductModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Fruit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name..."
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
            <span className="text-danger msg">{validate.name}</span>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              placeholder="Enter description..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
            <span className="text-danger msg">{validate.description}</span>
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter price..."
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <span className="text-danger msg">{validate.price}</span>
          </div>

          <div className="form-group">
            <label>Quantity:</label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter quantity..."
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <span className="text-danger msg">{validate.quantity}</span>
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
              onClick={() => HandleAddProduct()}
              className="btn btn-primary add_product_modal_btn"
            >
              Add new
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <ModalEdit
        show={productEditModal}
        onHide={HandleHideProductModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Fruit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name..."
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
            <span className="text-danger msg">{validate.name}</span>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              placeholder="Enter description..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
            <span className="text-danger msg">{validate.description}</span>
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter price..."
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <span className="text-danger msg">{validate.price}</span>
          </div>

          <div className="form-group">
            <label>Quantity:</label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter quantity..."
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <span className="text-danger msg">{validate.quantity}</span>
          </div>
          <div className="form-group">
            <label>Current Image</label>
            <br />
            <img
              className="current_img"
              src={`http://localhost:3434/images/fruits/${currentImg}`}
              width="80px"
              alt=""
            />
          </div>

          <div className="form-group">
            <label className="img_label">Upload Image:</label>
            <img src={showImg} width="80px" className="show-edit-img" alt="" />

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
              onClick={() => HandleUpdateProduct()}
              className="btn btn-warning add_product_modal_btn"
            >
              Update
            </button>
          </div>
        </Modal.Body>
      </ModalEdit>
      <ModalDelete show={productDeleteModal} onHide={HandleHideProductModal}>
        <Modal.Header>
          <Modal.Title>Delete fruit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the fruit whose id is{" "}
          <span className="text-danger delete_modal">{id}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="close_btn"
            onClick={() => HandleHideProductModal()}
          >
            Close
          </Button>
          <Button
            variant="danger"
            className="remove_btn"
            onClick={() => HandleDeleteProduct()}
          >
            Delete
          </Button>
        </Modal.Footer>
      </ModalDelete>
      <ModalDelete show={showStatusModal} onHide={CloseStatusModal}>
        <Modal.Header>
          <Modal.Title>Update status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update status the fruit named{" "}
          <span className="text-danger delete_modal">{productName}</span>?
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
            onClick={() => HandleUpdateStatusProduct()}
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
                <h1 className="h3 mb-0 text-gray-800">Fruits</h1>
              </div>
              <button
                className="btn btn-primary"
                onClick={HandleShowProductModal}
              >
                Add new fruit
              </button>
              <p></p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="row" style={{ flex: 1, marginLeft: "0px" }}>
                  <input
                    type="text"
                    className="form-control col-4"
                    placeholder="Name..."
                    value={nameKeyword}
                    onChange={(event) => setNameKeyword(event.target.value)}
                  />

                  <button
                    className="btn btn-success ml-2"
                    onClick={HandleSearchProduct}
                  >
                    Search
                  </button>
                  <button className="btn btn-danger ml-2" onClick={HandleReset}>
                    Reset
                  </button>
                </div>
                <div
                  className="row"
                  style={{ gap: "14px", marginRight: "0px" }}
                >
                  <div
                    className={`toggle ${
                      clickStocking ? "active_stocking" : ""
                    }`}
                    onClick={HandleClickStocking}
                  >
                    <div
                      className={`spinner ${
                        clickStocking ? "active_stocking" : ""
                      }`}
                    ></div>
                  </div>
                  Stocking
                  <span>|</span>
                  <div
                    className={`toggle ${
                      clickSoldOut ? "active_sold_out" : ""
                    }`}
                    onClick={HandleClickSoldOut}
                  >
                    <div
                      className={`spinner ${
                        clickSoldOut ? "active_sold_out" : ""
                      }`}
                    ></div>
                  </div>
                  Sold out
                </div>
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
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProduct && allProduct.length > 0 ? (
                            allProduct.map((item, index) => {
                              return (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.product_name}</td>
                                  <td>{item.description}</td>
                                  <td>${item.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>
                                    <img
                                      src={`http://localhost:3434/images/fruits/${item.image}`}
                                      alt=""
                                      width="80px"
                                    />
                                  </td>
                                  <td>
                                    {item.status === "Stocking" ? (
                                      <span
                                        style={{ cursor: "pointer" }}
                                        className="badge badge-success"
                                        onClick={() => ChangeStatus(item)}
                                      >
                                        Stocking
                                      </span>
                                    ) : (
                                      <span className="badge badge-danger">
                                        Sold out
                                      </span>
                                    )}
                                  </td>
                                  <td className="action_product">
                                    <FontAwesomeIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        HandleShowEditProductModal(item)
                                      }
                                      icon={icon({ name: "pen-to-square" })}
                                    />
                                    <FontAwesomeIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        HandleShowDeleteProductModal(item)
                                      }
                                      icon={icon({ name: "trash" })}
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          ) : productsEmpty === false ? (
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
                                No fruit found
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

export default Products;
