import React, { useState } from "react";

interface Props {
  imageUrls: string[];
}

const Carousel: React.FC<Props> = ({ imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (imageUrls.length === 1) return;

    if (currentImageIndex + 1 === imageUrls.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="w-60 h-60 m-auto" onClick={nextImage}>
      <img
        className="w-60 h-60"
        src={imageUrls[currentImageIndex]}
        alt="carousel"
      />
    </div>
  );
};

export default Carousel;
