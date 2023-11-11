import React from 'react';
//import './youtube.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nicki from "../../assets/images/nicki.gif";
import peso from "../../assets/images/peso.gif";
import romeo from "../../assets/images/romeo.gif";


function YoutubePage() {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="containers">
      <div className="content">
        <Slider {...sliderSettings}>
          <div>
          <img src={nicki} class="slidePic" />
          </div>
          <div>
          <img src={peso} class="slidePic"/>
          </div>
          <div>
          <img src={romeo} class="slidePic"/>
          </div>
        </Slider>
      </div>
      </div>
  );
}

export default YoutubePage;
