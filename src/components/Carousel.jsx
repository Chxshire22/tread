"use client";
import { useRef } from "react";
import {
  CaretRightFill,
  CaretLeftFill,
  XCircleFill,
} from "react-bootstrap-icons";

export default function Carousel(props) {
   const { images, setImgArr } = props;
  const sliderRef = useRef(null);

  // const slides = [
  //   "https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg",
  //   "https://i.pinimg.com/236x/16/13/d2/1613d2927c0c9f1a7ac7f7b8b0d7c31e.jpg",
  //   "https://i.pinimg.com/236x/75/e9/ef/75e9ef58248657fc164181b57a68c42c.jpg",
  // ];

  const goToPrevious = () => {
    if (sliderRef.current) {
      const prevScrollPosition = sliderRef.current.scrollLeft;
      const newScrollPosition =
        prevScrollPosition - sliderRef.current.offsetWidth;
      if (newScrollPosition < 0) {
        sliderRef.current.scrollLeft =
          sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
      } else {
        sliderRef.current.scrollLeft = newScrollPosition;
      }
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      const prevScrollPosition = sliderRef.current.scrollLeft;
      const newScrollPosition =
        prevScrollPosition + sliderRef.current.offsetWidth;
      if (
        newScrollPosition >
        sliderRef.current.scrollWidth - sliderRef.current.offsetWidth
      ) {
        sliderRef.current.scrollLeft = 0;
      } else {
        sliderRef.current.scrollLeft = newScrollPosition;
      }
    }
  };

  return (

      <div>
        <div className="slider-container">
          <CaretRightFill
            className="slider-arrow arrow-right"
            size={40}
            onClick={goToNext}
          />
          <CaretLeftFill
            className="slider-arrow arrow-left"
            size={40}
            onClick={goToPrevious}
          />
          <div className="slider-container" ref={sliderRef}>
            {images.map((image, imageIndex) => (
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="slide-style"
                key={imageIndex}
              >
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
            ))}
          </div>
        </div>
      </div>
  );
}

