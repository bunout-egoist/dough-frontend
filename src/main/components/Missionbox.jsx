import React, { useState } from "react";
import PropTypes from "prop-types";
import { Camera, CameraSource, CameraResultType } from "@capacitor/camera";

export default function MissionBox({
  isChecked,
  onCheck,
  missionText,
  backgroundColor,
  tag1, tag2,
  status,
  onImageUpload, // New prop to pass image file to parent
}) {
  const [imageSrc, setImageSrc] = useState("/images/main/photo.png");

  const boxClassName = `mainpage-mission-box ${
    status === "now-clicked" ? "mission-now-clicked" : ""
  } ${status === "finished" ? "mission-finished" : ""} ${
    isChecked ? "mission-checked" : ""
  }`;

  const tagClassName = `mission-tag ${isChecked ? "mission-tag-checked" : ""}`;

  // Function to open the gallery and select an image
  const handleOpenGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 90,
      });

      setImageSrc(image.webPath); // Set the selected image as the src
      const response = await fetch(image.webPath);
      const blob = await response.blob(); // Convert the image URI to a blob
      onImageUpload(blob); // Pass the blob to Mainpage
    } catch (err) {
      console.error("Error selecting image: ", err);
    }
  };

  return (
    <div className={`${boxClassName}`} style={{ backgroundColor: `${backgroundColor}` }}>
      <div>
        <div className="mission-tag-flex">
          <div className={tagClassName} style={{ color: `${backgroundColor}` }}>
            {tag1}
          </div>
          <div className={tagClassName} style={{ color: `${backgroundColor}` }}>
            {tag2}
          </div>
        </div>
        <div className={`mission-title ${isChecked ? "mission-checked" : ""}`}>
          {missionText}
        </div>
      </div>

      {/* Conditionally render checkbox or image based on isChecked */}
      {isChecked ? (
        <div className="mission-img-box" onClick={handleOpenGallery}>
          <img className="img-width" src={imageSrc} alt="Mission completed" />
        </div>
      ) : (
        <div className="mainpage-mission-checkbox">
          <input
            type="checkbox"
            className={`mainpage-mission-check ${
              isChecked ? "mission-checkbox-checked" : ""
            }`}
            checked={isChecked}
            onChange={onCheck}
          />
        </div>
      )}
    </div>
  );
}

MissionBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  missionText: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func.isRequired, // New prop type
};
