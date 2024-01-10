import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonDashboard = () => {
  return (
    <div>
      <div className="h5 mb-0 font-weight-bold text-gray-800">
        <Skeleton width={45} height={35} />{" "}
      </div>
    </div>
  );
};

export default SkeletonDashboard;
