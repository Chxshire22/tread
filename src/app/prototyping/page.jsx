"use client";
import PageHeaderWithBackBtn from "@/components/PageHeaderWithBackBtn";

export default function Carousel(props) {

  const { images } = props;

  const imageArr = ["https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg", "https://i.pinimg.com/236x/16/13/d2/1613d2927c0c9f1a7ac7f7b8b0d7c31e.jpg", "https://i.pinimg.com/236x/75/e9/ef/75e9ef58248657fc164181b57a68c42c.jpg"]

  return (
    <div className="page-container">
      <PageHeaderWithBackBtn title="Create Thread Content" />

      {/* CAROUSEL */}
      <div
        id="threadContentCarousel"
        className="carousel slide"
        data-bs-touch={true}
      >
        <div className="carousel-inner">
          {imageArr.map((image, index) => { 
            return (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img
                  src={image}
                  className="d-block w-100 carousel-img"
                  alt="..."
                />
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#threadContentCarousel"
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
          data-bs-target="#threadContentCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* CATEGORY SELECT */}

      {/* LOCATION INPUT */}

      {/* RECOMMENDED TIME INPUT  */}

      {/* DESCRIPTION INPUT */}

    </div>
  );
}
