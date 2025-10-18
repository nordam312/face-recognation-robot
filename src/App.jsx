import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank.jsx";
import MemoParticles from "./MemoParticles.jsx";
import FaceRecognition from "./components/faceRecognition/FaceRecognition.jsx";
import Signin from "./components/signin/signin.jsx";
import Register from "./components/register/register.jsx";
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

  // set user in state and persist current user
  const loadUser = (userData) => {
    setUser({ ...userData });
    try {
      localStorage.setItem("frb_current_user", JSON.stringify(userData));
    } catch (err) {
      console.error("failed to save current user", err);
    }
  };

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

  // handle routing and signout: clear user on signout
  const onRouteChange = (newRoute) => {
    if (newRoute === "signout") {
      setUser({ ...initialUser });
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
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </div>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </>
  );
}

export default App;
