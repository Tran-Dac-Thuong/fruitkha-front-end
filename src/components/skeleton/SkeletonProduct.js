import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SkeletonProduct.scss";
const SkeletonProduct = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6 text-center strawberry">
        <div className="single-product-item" style={{ padding: "30px" }}>
          <Skeleton className="skeleton-image" />

          <Skeleton width="100%" height={40} />

          <p>
            <Skeleton width="100%" height={40} />
          </p>

          <Skeleton width="100%" height={40} />
        </div>
      </div>
      <div className="col-lg-4 col-md-6 text-center strawberry">
        <div className="single-product-item" style={{ padding: "30px" }}>
          <Skeleton className="skeleton-image" />

          <Skeleton width="100%" height={40} />

          <p>
            <Skeleton width="100%" height={40} />
          </p>

          <Skeleton width="100%" height={40} />
        </div>
      </div>
      <div className="col-lg-4 col-md-6 text-center strawberry">
        <div className="single-product-item" style={{ padding: "30px" }}>
          <Skeleton className="skeleton-image" />

          <Skeleton width="100%" height={40} />

          <p>
            <Skeleton width="100%" height={40} />
          </p>

          <Skeleton width="100%" height={40} />
        </div>
      </div>
      <div className="col-lg-4 col-md-6 text-center strawberry">
        <div className="single-product-item" style={{ padding: "30px" }}>
          <Skeleton className="skeleton-image" />

          <Skeleton width="100%" height={40} />

          <p>
            <Skeleton width="100%" height={40} />
          </p>

          <Skeleton width="100%" height={40} />
        </div>
      </div>
      <div className="col-lg-4 col-md-6 text-center strawberry">
        <div className="single-product-item" style={{ padding: "30px" }}>
          <Skeleton className="skeleton-image" />

          <Skeleton width="100%" height={40} />

          <p>
            <Skeleton width="100%" height={40} />
          </p>

          <Skeleton width="100%" height={40} />
        </div>
      </div>
      <div className="col-lg-4 col-md-6 text-center strawberry">
        <div className="single-product-item" style={{ padding: "30px" }}>
          <Skeleton className="skeleton-image" />

          <Skeleton width="100%" height={40} />

          <p>
            <Skeleton width="100%" height={40} />
          </p>

          <Skeleton width="100%" height={40} />
        </div>
      </div>
    </>
  );
};

export default SkeletonProduct;
