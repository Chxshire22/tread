
export default function Carousel(props) {

  const { images } = props;

  return (
    <div
      id="threadContentCarousel"
      className="carousel slide"
      data-bs-touch={true}
    >
      <div className="carousel-inner">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#threadContentCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
