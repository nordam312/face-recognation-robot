import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
// import FaceRecognition from "./components/faceRecognition/FaceRecognition";
function App() {
  return (
    <>
      <Navigation />
      <Logo />
      <ImageLinkForm/>
  {/* <FaceRecognition/> */}
    </>
  );
}

export default App;
