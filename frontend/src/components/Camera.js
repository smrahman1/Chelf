import "./Camera.css";
import { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function CameraPage() {
  function handleTakePhoto(dataUri) {
    // This gets given to backend
    console.log(dataUri);
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result;
      // This gets given to the backend
      console.log(base64data);
    };
  };
  const [cameraOpen, setCameraOpen] = useState(false);

  return (
    <>
      <div className="imageContainer">
        <button className="buttonClass">Upload Image</button>
        <input type="file" onChange={handleFileChange} />
        <h3>OR</h3>
        <button
          className="buttonClass"
          onClick={() => setCameraOpen(!cameraOpen)}
        >
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
