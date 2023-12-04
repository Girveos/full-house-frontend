import React from 'react';
import './facebook.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function FacebookPage() {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="containers">
{/*       <div className="content">
        <Slider {...sliderSettings} style={{ height: '100%' }}>
          <div>
          <img src={anuel} class="slidePic" />
          </div>
          <div>
          <img src={maluma} class="slidePic"/>
          </div>
          <div>
          <img src={eladio} class="slidePic"/>
          </div>
        </Slider>
      </div> */}
      </div>
  );
}

export default FacebookPage;
