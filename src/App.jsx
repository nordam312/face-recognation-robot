import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank.jsx";
import MemoParticles from "./MemoParticles.jsx";
import FaceRecognition from "./components/faceRecognition/FaceRecognition.jsx";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocations = (regions) => {
    if (!regions || regions.length === 0) return [];
    return regions.map((region) => {
      const boundingBox = region.region_info.bounding_box;
      return {
        topRow: boundingBox.top_row,
        leftCol: boundingBox.left_col,
        bottomRow: boundingBox.bottom_row,
        rightCol: boundingBox.right_col,
      };
    });
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch("http://localhost:5000/face-detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: input }),
    })
      .then((response) => response.json())
      .then((regions) => {
        const faceBoxes = calculateFaceLocations(regions);
        setBoxes(faceBoxes);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <MemoParticles />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
    </>
  );
}

export default App;
