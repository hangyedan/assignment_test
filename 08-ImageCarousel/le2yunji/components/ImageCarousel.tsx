import { useState } from "react";
import "../style/style.css";

type CarouselImage = {
  src?: string;
  alt?: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentImageNum, setCurrentImageNum] = useState<number>(0);
  const currentImage = images[currentImageNum];

  const handlePrevious = () => {
    setCurrentImageNum((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageNum((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="container">
      <div className="top">
        <button type="button" onClick={handlePrevious} className="button-left">
          ❮
        </button>
        <img src={currentImage.src} alt={currentImage.alt} className="image" />
        <button type="button" onClick={handleNext} className="button-right">
          ❯
        </button>
      </div>

      <div className="page-buttons">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setCurrentImageNum(index)}
            className={
              currentImageNum === index ? "page-button current" : "page-button"
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
