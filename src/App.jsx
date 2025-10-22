import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank.jsx";
import MemoParticles from "./MemoParticles.jsx";
import FaceRecognition from "./components/faceRecognition/FaceRecognition.jsx";
import Signin from "./components/signin/signin.jsx";
import Register from "./components/register/register.jsx";
import axios from "axios";
import { submitImage } from "./user.js";
import { useState, useEffect } from "react";

const initialUser = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: "",
};

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("home"); // start on signin by default
  const [user, setUser] = useState({ ...initialUser });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  // load user from localStorage on mount (if present) and go to home
  useEffect(() => {
    try {
      const saved = localStorage.getItem("frb_current_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          setUser(parsed);
          setRoute("home");
        }
      }
    } catch (err) {
      console.error("failed to read current user", err);
    }
  }, []);

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

  const onButtonSubmit = async () => {
    setImageUrl(input);
    const faceBoxes = await axios.post(
      "https://face-recognation-robot-api.onrender.com",
      { imageUrl: input },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const regions = faceBoxes.data;
    const faceLocations = calculateFaceLocations(regions);
    setBoxes(faceLocations);
    if (faceBoxes) {
      try {
        const entries = await submitImage(user.id);
        const updatedUser = { ...user, entries: entries };
        setUser(updatedUser);
        localStorage.setItem("frb_current_user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error("failed to update entries", err);
      }
    }
  };

  // handle routing and signout: clear user on signout
  const onRouteChange = (newRoute) => {
    if (newRoute === "signout") {
      setUser({ ...initialUser });
      setImageUrl("");
      setBoxes([]);
      try {
        localStorage.removeItem("frb_current_user");
      } catch (err) {
        console.error("failed to remove current user", err);
      }
      setRoute("home");
      return;
    }
    setRoute(newRoute);
  };

  return (
    <>
      <MemoParticles />
      <Navigation onRouteChange={onRouteChange} userExist={!!user.id} />
      {route === "home" ? (
        <div style={{ marginTop: 150 }}>
          <Logo />
          <Rank data={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </div>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </>
  );
}

export default App;
