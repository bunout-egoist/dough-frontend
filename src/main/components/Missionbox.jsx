import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function MissionBox({
  backgroundColor,
  isChecked,
  onCheck,
  missionText,
  status,
}) {
  const [cameraActive, setCameraActive] = useState(false);
  const [imageSrc, setImageSrc] = useState("/images/main/photo.png"); // Default image

  const boxClassName = `mainpage-mission-box ${
    status === "now-clicked" ? "mission-now-clicked" : ""
  } ${status === "finished" ? "mission-finished" : ""} ${
    isChecked ? "mission-checked" : ""
  }`;

  const tagClassName = `mission-tag ${isChecked ? "mission-tag-checked" : ""}`;

  const handleOpenCamera = () => {
    setCameraActive(true);
  };

  const handleCapturePhoto = () => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setImageSrc(dataUrl); // Set the captured image as the src

    // Stop the camera stream
    if (video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null; // Clear the video source
    }

    setCameraActive(false); // Close the camera overlay
  };

  useEffect(() => {
    const video = document.querySelector("video");

    if (cameraActive && video) {
      // Request access to the camera
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play(); // Ensure video plays
        })
        .catch((err) => {
          console.error("Error accessing the camera: ", err);
          setCameraActive(false);
        });
    } else if (video) {
      // Stop the camera stream when not active
      if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
    }
  }, [cameraActive]);

  return (
    <div className={boxClassName} style={{ backgroundColor }}>
      <div>
        <div className="mission-tag-flex">
          <div className={tagClassName} style={{ color: backgroundColor }}>
            #혼자
          </div>
          <div className={tagClassName} style={{ color: backgroundColor }}>
            #밖에서
          </div>
        </div>
        <div className={`mission-title ${isChecked ? "mission-checked" : ""}`}>
          {missionText}
        </div>
      </div>

      {/* Conditionally render checkbox or image based on isChecked */}
      {isChecked ? (
        <div className="mission-img-box" onClick={handleOpenCamera}>
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

      {/* Fullscreen Camera Overlay */}
      {cameraActive && (
        <div className="camera-overlay">
          <video autoPlay playsInline className="camera-video" />
          <button className="capture-button" onClick={handleCapturePhoto}>
            사진 찍기
          </button>
        </div>
      )}
    </div>
  );
}

// Define PropTypes for validation
MissionBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  missionText: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
