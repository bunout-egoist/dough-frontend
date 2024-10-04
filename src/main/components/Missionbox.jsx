import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Camera, CameraSource, CameraResultType } from "@capacitor/camera";
import { Filesystem } from '@capacitor/filesystem';
export default function MissionBox({
  isChecked,
  onCheck,
  missionText,missionSubText,
  backgroundColor,
  tag1, tag2,
  status,special,
  onImageUpload,
  imageUrl,id 
}) {
  const [imageSrc, setImageSrc] = useState("/images/main/photo.png");
  useEffect(() => {
    if (imageUrl) {
      setImageSrc(imageUrl);
    }
  }, [imageUrl]); // Only run this effect when imageUrl changes
  const [isBoxChecked, setIsBoxChecked] = useState(false); // 로컬 상태로 체크 여부 관리
  useEffect(() => {
    if (isChecked !== isBoxChecked) {
      setIsBoxChecked(isChecked);
    }
  }, [isChecked]);
  console.log('음2',isBoxChecked);
  const boxClassName = `mainpage-mission-box ${
    status === "now-clicked" ? "mission-now-clicked" : ""
  } ${status === "finished" ? "mission-finished" : ""} 
  ${
    isBoxChecked ? "mission-checked" : ""
  } 
  ${special === '스페셜퀘스트' ? 'special-background' : ''}`;

  const tagClassName = `mission-tag ${isBoxChecked ? "mission-tag-checked" : ""}`;
  console.log('음3',isBoxChecked);
  // Function to open the gallery and select an image
  const handleOpenGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 80,
        allowEditing: false,
      });

      setImageSrc(image.webPath);
    //   const fileData = await Filesystem.readFile({
    //     path: image.path, // Capacitor가 제공하는 이미지 경로
    //   });
    //   const blob = new Blob([fileData.data], { type: image.format }); 
    // const file = new File([blob], "image.jpg", { type: blob.type });

       // Fetch the image using the webPath
    const response = await fetch(image.webPath);
    const blob = await response.blob(); // Convert the image URI to a blob
    const file = new File([blob], "image.jpg", { type: blob.type });

      onImageUpload(id,file); // Pass the blob to Mainpage
    } catch (err) {
      console.error("Error selecting image: ", err);
    }
  };
  const isFinished = status === 'finished';
  console.log('음4',isBoxChecked,isFinished);
  const handleBoxClick = (event) => {
    event.stopPropagation();
    if (!isFinished && !isBoxChecked) {
      setIsBoxChecked(true); // 체크 상태를 true로 변경
      onCheck(); // 부모 컴포넌트의 체크 상태 변경 함수 호출
    }
  };
  console.log('음5',isBoxChecked,isFinished);
  return (
    <div className={`${boxClassName} `}        onClick={handleBoxClick} style={{ backgroundColor, pointerEvents: isFinished ? 'none' : 'auto' }}>
      <div>
        {/* <div className="mission-tag-flex">
          <div className={tagClassName} style={{ color: `${backgroundColor}` }}>
            {tag1}
          </div>
          <div className={tagClassName} style={{ color: `${backgroundColor}` }}>
            {tag2}
          </div>
        </div> */}
        <div className="mission-subtitle">
          {missionSubText}
        </div>
        <div className={`mission-title ${isBoxChecked ? "mission-checked" : ""}`}>
          {missionText}
        </div>
      </div>

      {/* Conditionally render checkbox or image based on isChecked */}
      {isBoxChecked || isFinished ?(
        <div className="mission-img-box" onClick={handleOpenGallery}>
          <img className="img-width" src={imageSrc} alt="Mission completed" />
        </div>
      ) : 
      (
        <div className="mainpage-mission-checkbox"   onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            className={`mainpage-mission-check ${
              isChecked ? "mission-checkbox-checked" : ""
            }`}
            checked={isChecked}
            onChange={handleBoxClick}
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
  onImageUpload: PropTypes.func.isRequired,
  id: PropTypes.string 
};
