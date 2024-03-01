"use client";
import { useState } from "react";
import {
  CaretRightFill,
  CaretLeftFill,
  CircleFill,
} from "react-bootstrap-icons";

export default function ImageSlider() {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "https://i.pinimg.com/564x/f2/8b/b9/f28bb92377db206cdcbf1948d69fcfd7.jpg",
    "https://i.pinimg.com/236x/16/13/d2/1613d2927c0c9f1a7ac7f7b8b0d7c31e.jpg",
    "https://i.pinimg.com/236x/75/e9/ef/75e9ef58248657fc164181b57a68c42c.jpg",
  ];



  const goToPrevious = () => {
     setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));

  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < slides.length - 1 ? prevIndex + 1 : prevIndex
    );

  };



  return (
    <div className="page-container">
      <div>
        <div className="slider-container" >
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
          <div className="slider-container">
            {slides.map((slide, slideIndex) => (
              <div style={{ backgroundImage:`url(${slide})`, transform: `translateX(-${currentIndex * 100}%)`}} className="slide-style" key={slideIndex}></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
