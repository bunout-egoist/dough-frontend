import React, { useState } from "react";
import styles from "../main.css";

export default function RoundSlide({ onSubmit }) {
  const initialImages = [
    {
      img: "/images/main/evaluate/3.png",
      name: "Image 1",
      centerimg: "/images/main/evaluate/center-3.png",
    },
    {
      img: "/images/main/evaluate/4.png",
      name: "Image 2",
      centerimg: "/images/main/evaluate/center-4.png",
    },
    {
      img: "/images/main/evaluate/5.png",
      name: "Image 3",
      centerimg: "/images/main/evaluate/center-5.png",
    },
    {
      img: "/images/main/evaluate/2.png",
      name: "Image 4",
      centerimg: "/images/main/evaluate/center-2.png",
    },
    {
      img: "/images/main/evaluate/1.png",
      name: "Image 5",
      centerimg: "/images/main/evaluate/center-1.png",
    },
  ];

  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveItems = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handleItemClick = (index) => {
    setCurrentIndex(index);
  };

  const getCircularIndex = (index, length) => {
    return (index + length) % length;
  };

  return (
    <div className="roundslide-area">
      <div className={styles.carouselContainer}>
        <div className="pos-rel">
          <div className="roundslide-area-flex">
            {Array(5)
              .fill()
              .map((_, index) => {
                const circularIndex = getCircularIndex(
                  currentIndex + index - 2,
                  images.length
                );
                const imageItem = images[circularIndex];
                const isCenter = index === 2; // Check if the item is in the center
                return (
                  <div className={`round-${index}-out`} key={index}>
                    <div
                      className={`round-${index} ${isCenter ? "center" : "opacity"} ${
                        (index === 0 || index === 4) && styles.end ? "d-none d-md-block d-lg-block" : ""
                      } ${index === 1 || index === 3 ? "d-none d-md-block d-lg-block" : ""}`}
                      onClick={() => handleItemClick(circularIndex)}
                    >
                      <img
                        className="roundslide-img"
                        src={isCenter ? imageItem.centerimg : imageItem.img}
                        alt="item"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="roundslide-submit-btn-area">
            <button className="roundslide-submit-btn" onClick={onSubmit}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
