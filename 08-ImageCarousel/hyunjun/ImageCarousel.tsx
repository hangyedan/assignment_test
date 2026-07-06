import { useState } from "react";
import "./ImageCarousel.css";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <button onClick={handlePrev}>{"<"}</button>
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="carousel-img"
        />
        <button onClick={handleNext}>{">"}</button>{" "}
      </div>
      <div className="indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={` ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
