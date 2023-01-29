import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function CameraPage() {
  function handleTakePhoto(dataUri) {
    console.log("takePhoto");
  }
  return (
    <Camera
      onTakePhoto={(dataUri) => {
        handleTakePhoto(dataUri);
      }}
    />
  );
}

export default CameraPage;
