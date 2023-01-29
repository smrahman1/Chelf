import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generate from "./components/Generate";
import CameraPage from "./components/Camera";
import NavBar from "./components/NavBar";
import PantryItem from "./components/PantryItem";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/pantry/:category" element={<PantryItem />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
