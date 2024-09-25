import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Camera, CameraSource, CameraResultType } from "@capacitor/camera";

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

  const boxClassName = `mainpage-mission-box ${
    status === "now-clicked" ? "mission-now-clicked" : ""
  } ${status === "finished" ? "mission-finished" : ""} ${
    isChecked ? "mission-checked" : ""
  } ${special === '스페셜퀘스트' ? 'special-background' : ''}`;

  const tagClassName = `mission-tag ${isChecked ? "mission-tag-checked" : ""}`;

  // Function to open the gallery and select an image

  const handleOpenGallery = async () => {
    try {
      // 권한 요청
      const permission = await Camera.requestPermissions({
        permissions: ['camera', 'photos'],
      });
  
      // 권한이 부여되지 않았으면 종료
      if (permission.camera !== 'granted' || permission.photos !== 'granted') {
        alert('카메라 또는 사진 라이브러리에 접근할 수 없습니다. 권한을 확인해주세요.');
        return;
      }
  
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 90,
      });
  
      console.log("Selected image:", image); // 선택된 이미지 확인
  
      if (image && image.webPath) {
        setImageSrc(image.webPath);
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        
        console.log("Image blob:", blob);
        const file = new File([blob], "image.jpg", { type: blob.type });
  
        onImageUpload(id, file); // 이미지 업로드 함수 호출
      } else {
        console.error("No valid webPath returned from Camera.getPhoto");
      }
    } catch (err) {
      console.error("Error selecting image: ", err);
    }
  };
  const isFinished = status === 'finished';

  return (
    <div className={`${boxClassName} `}  style={{ backgroundColor, pointerEvents: isFinished ? 'none' : 'auto' }}>
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
        <div className={`mission-title ${isChecked ? "mission-checked" : ""}`}>
          {missionText}
        </div>
      </div>

      {/* Conditionally render checkbox or image based on isChecked */}
      {isChecked || isFinished ?(
        <div className="mission-img-box" onClick={handleOpenGallery}>
          <img className="img-width" src={imageSrc} alt="Mission completed" />
        </div>
      ) : 
      (
        <div className="mainpage-mission-checkbox">
          <input
            type="checkbox"
            className={`mainpage-mission-check ${
              isChecked ? "mission-checkbox-checked" : ""
            }`}
            checked={isChecked}
            onChange={onCheck}
            accept="images/*" 
            capture="filesystem"
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
