import React, { useState, useRef, useEffect } from "react";
import styles from "./main.css";

export default function Mainpage() {
    const [cameraOn, setCameraOn] = useState(false);
    const [photo, setPhoto] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (cameraOn) {
            startCamera();
        }
        // Cleanup the video stream on component unmount or when camera is turned off
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        };
    }, [cameraOn]);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => {
                console.error("Something went wrong!", err);
            });
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (video && video.srcObject) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL("image/png");
            setPhoto(dataURL);

            // Stop all video tracks and hide video element
            const stream = video.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                video.srcObject = null;
            }

            // Hide video element by setting display to none
            video.style.display = 'none';
            setCameraOn(false); // Stop the camera activation
        }
    };

    const deletePhoto = () => {
        setPhoto(null);
        // Show the video element again when the photo is deleted
        const video = videoRef.current;
        if (video) {
            video.style.display = 'block'; // Show the video element
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mainpage">
            <div className="mainpage-title">
                오늘 퀘스트는<br/><span className="mission-tag1">#밖에서</span><span className="mission-tag2">혼자</span> 할 수 있어요!
            </div>
            <div className="mainpage-level">
                <div className="mainpage-level-title">레벨 5</div>
                <div className="outer">
                    <div className="inner"></div>
                </div>
            </div>
            <div className="mainpage-img">
                <img src="/images/main/main_icon.png" className="img-width" alt="Main icon"/>
            </div>
            <div className="mainpage-cam-area">
                {!cameraOn && !photo && (
                    <button onClick={() => setCameraOn(true)}>카메라 켜기</button>
                )}
                {cameraOn && (
                    <div id="container">
                        <video ref={videoRef} autoPlay id="videoElement" style={{ display: 'block' }}></video>
                        <button onClick={capturePhoto}>사진 찍기</button>
                    </div>
                )}
                {photo && (
                    <div className="camera-img-area">
                        <img src={photo} alt="Captured" className="captured-photo"/>
                        <button onClick={deletePhoto}>사진 삭제</button>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                />
                <button onClick={() => fileInputRef.current.click()}>사진 업로드</button>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
        </div>
    );
}
