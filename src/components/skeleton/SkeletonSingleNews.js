import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SkeletonSingleNews.scss";
const SkeletonSingleNews = () => {
  return (
    <>
      <div className="single-article-text">
        <div className="">
          <Skeleton className="skeleton_sg_news" />
        </div>

        <h2>
          <Skeleton width="100%" height={40} />
        </h2>
        <p>
          <Skeleton width="100%" height={100} />
        </p>
      </div>
    </>
  );
};

export default SkeletonSingleNews;
