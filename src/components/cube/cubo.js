import React, { useState, useRef } from "react";
import "./cubo.scss";
import youtube from "../../assets/images/youtube-168-svgrepo-com.svg";
import facebook from "../../assets/images/facebook-svgrepo-com.svg";
import whatsapp from "../../assets/images/whatsapp-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

function CubeReact() {
  const cubeRef = useRef(null);
  const optionsContainerRef = useRef(null);
  const navigate = useNavigate();
  const [animationPaused, setAnimationPaused] = useState(false);

  const handleCubeClick = () => {
    console.log("Di click en el cubo");
    const cube = cubeRef.current;
    const optionsContainer = optionsContainerRef.current;

    if (!animationPaused) {
      console.log("Animacion pausada");
      cube.style.animationPlayState = "paused";
      optionsContainer.style.display = "flex";
      optionsContainer.style.flexDirection = "column";
      setAnimationPaused(true);

       setTimeout(() => {
        cube.style.animationPlayState = "running";
        optionsContainer.style.display = "none";
        setAnimationPaused(false);
      }, 5000);
    } else {
      cube.style.animationPlayState = "running";
      optionsContainer.style.display = "none";
      setAnimationPaused(false);
    }
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case "facebook":
        navigate("/facebook");
        break;
      case "whatsapp":
        navigate("/whatsapp");
        break;
      case "youtube":
        navigate("/youtube");
        break;
      default:
    }
  };

  return (
    <div className="loader">
      <div
        className="cube"
        id="animatedCube"
        onClick={handleCubeClick}
        ref={cubeRef}
      >
        <div className="front"></div>
        <div className="back"></div>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="right"></div>
        <div className="left"></div>
      </div>
      <div className="optionsContainer" id="options" ref={optionsContainerRef}>
        <div
          className="cube1"
          id="option1"
          onClick={() => handleOptionClick("facebook")}
        >
          <div className="front">
            <img
              src={facebook}
              className="footer__icon-img-large-whatsapp"
              alt="Facebook"
            />
          </div>
          <div className="back"></div>
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="right"></div>
          <div className="left"></div>
        </div>
        <div
          className="cube2"
          id="option2"
          onClick={() => handleOptionClick("whatsapp")}
        >
          <div className="front">
            <img
              src={whatsapp}
              className="footer__icon-img-large-whatsapp"
              alt="WhatsApp"
            />
          </div>
          <div className="back"></div>
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="right"></div>
          <div className="left"></div>
        </div>
        <div
          className="cube3"
          id="option3"
          onClick={() => handleOptionClick("youtube")}
        >
          <div className="front">
            <img
              src={youtube}
              className="footer__icon-img-large-whatsapp"
              alt="YouTube"
            />
          </div>
          <div className="back"></div>
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="right"></div>
          <div className="left"></div>
        </div>
      </div>
    </div>
  );
}

export default CubeReact;
