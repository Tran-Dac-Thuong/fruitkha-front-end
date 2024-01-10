import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SkeletonNews.scss";
const SkeletonNews = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="single-latest-news">
          <Skeleton className="skeleton-img" />
          <div className="news-text-box">
            <Skeleton width="100%" height={40} />
            <p>
              <Skeleton width="100%" height={40} />
            </p>
            <p>
              <Skeleton width="100%" height={40} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="single-latest-news">
          <Skeleton className="skeleton-img" />
          <div className="news-text-box">
            <Skeleton width="100%" height={40} />
            <p>
              <Skeleton width="100%" height={40} />
            </p>
            <p>
              <Skeleton width="100%" height={40} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="single-latest-news">
          <Skeleton className="skeleton-img" />
          <div className="news-text-box">
            <Skeleton width="100%" height={40} />
            <p>
              <Skeleton width="100%" height={40} />
            </p>
            <p>
              <Skeleton width="100%" height={40} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="single-latest-news">
          <Skeleton className="skeleton-img" />
          <div className="news-text-box">
            <Skeleton width="100%" height={40} />
            <p>
              <Skeleton width="100%" height={40} />
            </p>
            <p>
              <Skeleton width="100%" height={40} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="single-latest-news">
          <Skeleton className="skeleton-img" />
          <div className="news-text-box">
            <Skeleton width="100%" height={40} />
            <p>
              <Skeleton width="100%" height={40} />
            </p>
            <p>
              <Skeleton width="100%" height={40} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="single-latest-news">
          <Skeleton className="skeleton-img" />
          <div className="news-text-box">
            <Skeleton width="100%" height={40} />
            <p>
              <Skeleton width="100%" height={40} />
            </p>
            <p>
              <Skeleton width="100%" height={40} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonNews;
