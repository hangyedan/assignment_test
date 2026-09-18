import { useState } from "react";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransition, setIsTransition] = useState(true);
  const clonedImage = formatImageArr(images);

  const handlePrev = () => {
    setIsTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    setIsTransition(false);
    if (currentIndex === 0) {
      setCurrentIndex(clonedImage.length - 2);
    } else if (currentIndex === clonedImage.length - 1) {
      setCurrentIndex(1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "600px",
        margin: "0 auto",
      }}
    >
      <button onClick={handlePrev}>Prev</button>
      <div style={{ overflow: "hidden", width: "600px" }}>
        <div
          style={{
            display: "flex",
            width: "600px",
            height: "400px",
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: `${isTransition ? "all 0.3s" : "none"}`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedImage.map(({ alt, src }) => (
            <img key={src} alt={alt} src={src} width='100%' />
          ))}
        </div>
      </div>
      <button onClick={handleNext}>Next</button>
      <ul
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "5px",
          margin: "0px",
          listStyle: "none",
        }}
      >
        {clonedImage.map((img, index) => {
          if (index === 0 || index === clonedImage.length - 1) return null;

          const isTarget =
            index === currentIndex ||
            (currentIndex === 0 && index === clonedImage.length - 2) ||
            (currentIndex === clonedImage.length - 1 && index === 1);

          const handleClick = () => {
            setIsTransition(true);
            setCurrentIndex(index);
          };

          return (
            <li
              key={img.alt}
              style={{
                cursor: "pointer",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: `${isTarget ? "orange" : "gray"}`,
              }}
              onClick={handleClick}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}

function formatImageArr(images: ReadonlyArray<{ src: string; alt: string }>) {
  const clone = [images[images.length - 1], ...images, images[0]];
  return clone;
}
