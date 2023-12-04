import React from 'react';
//import './whatsapp.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function WhatsAppPage() {

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
{/*         <Slider {...sliderSettings}>
          <div>
          <img src={emilia} class="slidePic" />
          </div>
          <div>
          <img src={eladio} class="slidePic"/>
          </div>
          <div>
          <img src={don} class="slidePic"/>
          </div>
        </Slider> */}
      </div>
      </div>
  );
}

export default WhatsAppPage;
