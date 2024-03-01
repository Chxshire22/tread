import { useEffect } from "react";
import { XCircleFill } from "react-bootstrap-icons";

export default function Carousel(props) {
  const { images, setImgArr } = props;

  useEffect(() => {
    console.log(images);
  }, [images]);

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
                className={`d-block w-100 carousel-img`}
                alt="..."
              />
              <div
                onClick={() => {
                  setImgArr((prevState) => {
                    const index = prevState.indexOf(image);
                    if (index !== -1) {
                      const newArray = [...prevState];
                      newArray.splice(index, 1);
                      return newArray;
                    } else {
                      console.log("Image not found in array.");
                      return prevState;
                    }
                  });
                }}
                className="remove-img"
              >
                <XCircleFill size={25} color="#bf5464" />
              </div>
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
