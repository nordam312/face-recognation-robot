import React, { useRef, useState, useEffect } from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  const imageRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imageRef.current) {
      setDimensions({
        width: imageRef.current.width,
        height: imageRef.current.height,
      });
    }
  }, [imageUrl]);

  return (
    <div className="face-center">
      <div className="face-container">
        {imageUrl && (
          <img
            id="inputImage"
            ref={imageRef}
            src={imageUrl}
            alt=""
            width="500px"
            height="auto"
            onLoad={() => {
              if (imageRef.current) {
                setDimensions({
                  width: imageRef.current.width,
                  height: imageRef.current.height,
                });
              }
            }}
          />
        )}
        {boxes.map((box, i) => (
          <div
            key={i}
            className="bounding-box"
            style={{
              top: box.topRow * dimensions.height,
              left: box.leftCol * dimensions.width,
              width: (box.rightCol - box.leftCol) * dimensions.width,
              height: (box.bottomRow - box.topRow) * dimensions.height,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
