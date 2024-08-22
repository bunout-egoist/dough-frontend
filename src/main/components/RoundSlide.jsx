import React, { useState, useEffect } from "react";
import styles from "../main.css";

export default function RoundSlide() {
  // Data
  const initialImages = [
    {
      img: "https://via.placeholder.com/600/92c952",
      name: "Image 1",
      desc: "Description for Image 1",
    },
    {
      img: "https://via.placeholder.com/600/771796",
      name: "Image 2",
      desc: "Description for Image 2",
    },
    {
      img: "https://via.placeholder.com/600/24f355",
      name: "Image 3",
      desc: "Description for Image 3",
    },
    {
      img: "https://via.placeholder.com/600/ff69b4",
      name: "Image 4",
      desc: "Description for Image 4",
    },
    {
      img: "https://via.placeholder.com/600/ffa500",
      name: "Image 5",
      desc: "Description for Image 5",
    },
  ];

  // Carousel State
  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       moveItems();
//     }, 3000); // Change the interval (in milliseconds) as desired

//     return () => clearInterval(interval);
//   }, [currentIndex]);

  const moveItems = () => {
    // Get the next index
    const nextIndex = (currentIndex + 1) % images.length;

    // Update the state with the new current index
    setCurrentIndex(nextIndex);
  };

  const handleItemClick = (index) => {
    setCurrentIndex(index);
  };

  // Function to create a circular index based on the current index and array length
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
              const imageItem = images[getCircularIndex(currentIndex + index - 2, images.length)];
              return (
                <div
                  key={index}
                  className={`round-${index} ${index === 2 ? `center` : `opacity`} ${
                    (index === 0 || index === 4) && `${styles.end} d-none d-md-block d-lg-block`
                  } ${index === 1 || index === 3 ? "d-none d-md-block d-lg-block" : ""}`}
                  onClick={() =>
                    handleItemClick(getCircularIndex(currentIndex + index - 2, images.length))
                  }
                >
                  <img class="roundslide-img" src={imageItem.img} alt="item" />
                </div>
              );
            })}
        </div>
        
        </div>
        </div>
    </div>
  );
}
