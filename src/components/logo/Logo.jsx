import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 flex justify-center">
      <Tilt className="br2" glareMaxOpacity={0.45} scale={1.05}>
        <div
          style={{
            height: 150,
            width: 150,
            backgroundColor: "black",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ paddingTop: "5px", width: "80px", height: "80px" }}
            alt="logo"
            src="/logo.png"
          />
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
