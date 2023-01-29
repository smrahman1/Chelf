import "./Camera.css";
import { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function CameraPage() {
  function handleTakePhoto(dataUri) {
    console.log(dataUri);
  }
  const [cameraOpen, setCameraOpen] = useState(false);

  return (
    <>
      <div className="imageContainer">
        <button>Upload Image</button>
        <h3>OR</h3>
        <button onClick={() => setCameraOpen(!cameraOpen)}>
          {cameraOpen ? "Close Camera" : "Open Camera to take photo"}
        </button>
      </div>
      {cameraOpen && (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      )}
    </>
  );
}

export default CameraPage;
