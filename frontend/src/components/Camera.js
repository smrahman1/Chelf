import "./Camera.css";
import { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function CameraPage() {
  const [uploaded, setUploaded] = useState(false);

  const photoFetcher = async (dataUri) => {
    const response = await fetch("http://localhost:5000/scanReceipt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: dataUri,
      }),
    });
    setUploaded(true);

    setTimeout(() => {
      setUploaded(false);
    }, 3000);
  };

  function handleTakePhoto(dataUri) {
    // This gets given to backend
    photoFetcher(dataUri);
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result;
      // This gets given to the backend
      photoFetcher(base64data);
    };
  };
  const [cameraOpen, setCameraOpen] = useState(false);

  return (
    <>
      <div className="imageContainer">
        <label for="file-upload" className="buttonClass uploadClass">
          Upload Image
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} />
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
      {uploaded && <h3 style={{ textAlign: "center" }}>Receipt Uploaded!</h3>}
    </>
  );
}

export default CameraPage;
