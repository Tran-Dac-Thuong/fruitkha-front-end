import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SkeletonSingleProduct.scss";
const SkeletonSingleProduct = () => {
  return (
    <>
      <div className="col-md-5">
        <div className="single-product-img">
          <Skeleton className="skeleton_sg_product" height={400} />
        </div>
      </div>
    </>
  );
};

export default SkeletonSingleProduct;
