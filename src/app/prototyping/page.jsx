"use client";
import { useRef } from "react";
import {
  CaretRightFill,
  CaretLeftFill,
} from "react-bootstrap-icons";

export default function Carousel() {
  const sliderRef = useRef(null);
  
  const slides = [
    "https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg",
    "https://i.pinimg.com/236x/16/13/d2/1613d2927c0c9f1a7ac7f7b8b0d7c31e.jpg",
    "https://i.pinimg.com/236x/75/e9/ef/75e9ef58248657fc164181b57a68c42c.jpg",
  ];



const goToPrevious = () => {
  if (sliderRef.current) {
    const prevScrollPosition = sliderRef.current.scrollLeft;
    const newScrollPosition =
      prevScrollPosition - sliderRef.current.offsetWidth;
    if (newScrollPosition < 0) {
      // If scrolling past the first slide, loop to the last slide
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
      // If scrolling past the last slide, loop to the first slide
      sliderRef.current.scrollLeft = 0;
    } else {
      sliderRef.current.scrollLeft = newScrollPosition;
    }
  }
};


  return (
    <div className="page-container">
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
            {slides.map((slide, slideIndex) => (
              <div
                style={{ backgroundImage: `url(${slide})` }}
                className="slide-style"
                key={slideIndex}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// style={{transform: `translateX(-${currentIndex * 100}%)`}}