import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../main.css";

// Swiper modules
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export default function RoundSlide({ onSubmit, selectedMissionId }) {
  const initialImages = [
    {
      img: "/images/main/evaluate/1.png",
      name: 1,
      centerimg: "/images/main/evaluate/center-1.png",
    },
    {
      img: "/images/main/evaluate/2.png",
      name: 2,
      centerimg: "/images/main/evaluate/center-2.png",
    },
    {
      img: "/images/main/evaluate/3.png",
      name: 3,
      centerimg: "/images/main/evaluate/center-3.png",
    },
    {
      img: "/images/main/evaluate/4.png",
      name: 4,
      centerimg: "/images/main/evaluate/center-4.png",
    },
    {
      img: "/images/main/evaluate/5.png",
      name: 5,
      centerimg: "/images/main/evaluate/center-5.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(2); // Start with round-2 in the center

  useEffect(() => {
    // Log the name of the initial centered item
    console.log(initialImages[currentIndex].name);
  }, [currentIndex, initialImages]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    setCurrentIndex(newIndex);
  };

  const handleSubmit = () => {
    // Pass the selectedMissionId and the name of the currently centered slide back to the parent
    const selectedName = initialImages[currentIndex].name;
    onSubmit({
      missionId: selectedMissionId,
      selectedName: selectedName,
    });
  };

  return (
    <div className="roundslide-area">
      <div className={styles.carouselContainer}>
        <div className="pos-rel">
          <Swiper
            spaceBetween={0}
            slidesPerView={5}
            centeredSlides={true}
            onSlideChange={handleSlideChange}
            initialSlide={currentIndex} // Set the initial slide
            // modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {initialImages.map((imageItem, index) => {
              const isCenter = index === currentIndex;
              return (
                <SwiperSlide key={index} className={`round-slide-item ${isCenter ? "center" : "opacity"}`}>
                  <div className="roundslide-img-container">
                    <img
                      className="roundslide-img"
                      src={isCenter ? imageItem.centerimg : imageItem.img}
                      alt={imageItem.name}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="roundslide-submit-btn-area">
            <button className="roundslide-submit-btn" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
