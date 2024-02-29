"use client";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";

export default function Carousel() {
  return (
    <div className="page-container">
      <PageHeaderWithBackBtn title="Create Thread Content" />
      <div id="carouselExample" className="carousel slide" data-bs-touch={true}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.pinimg.com/236x/16/13/d2/1613d2927c0c9f1a7ac7f7b8b0d7c31e.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.pinimg.com/236x/75/e9/ef/75e9ef58248657fc164181b57a68c42c.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
