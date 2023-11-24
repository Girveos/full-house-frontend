import React, { useState }from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import "./Footer.scss";
import locationicon from "../../assets/SVG/location-svgrepo-com.png";
import IGicon from "../../assets/SVG/instagram-svgrepo-com.png";
import TKicon from "../../assets/SVG/tiktok-svgrepo-com.png";
import WPicon from "../../assets/SVG/whatsapp-svgrepo-com.png";
import { useNavigate } from "react-router-dom";
import MapComponent from '../mapa/MapComponent';
import logo from "../../assets/images/Frank1.png";

const Footer = () => {
  const navigate = useNavigate();
  const [showMap, setshowMap] = useState(false);

  const handleLocationIconClick = () => {
    setshowMap(!showMap);
  };
  const handleCloseMap = () => {
    setshowMap(false);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
      {showMap && <MapComponent onClose={handleCloseMap}/>}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3}>
            <div className="direction-container">
              <h2>Ubicación</h2>
              <div className="direction">
                <div>
                  <h5>CR 5 #64-30 - Villamaría - La Florida</h5>
                  <h5>Colombia - Caldas - Manizales</h5>
                </div>
                <div>
                  <img
                    src={locationicon}
                    alt="Location Icon"
                    className="location-icon"
                    style={{ cursor: 'pointer' }} 
                    onClick={handleLocationIconClick}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <div className="social-container">
              <h2>Redes sociales</h2>
              <div className="icons-social">
              <ul id="social-list">
                <li>
                  <a
                    href="https://www.instagram.com/fullhouse_shoes/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={IGicon} alt="Instagram Icon" className="IG-icon" />
                  </a>
                  
                </li>
                <li>
                  <a href="https://www.tiktok.com/@fullhouse_shoes?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer"><img src={TKicon} alt="Tik Tok Icon" className="TK-icon" /></a>
                  
                </li>
                <li>
                  <a
                    href="https://wa.link/2mtkwp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
           <img src={WPicon} alt="WhatsApp Icon" className="WP-icon" />
                  </a>
                  
                </li>
              </ul>
              </div>
             
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <div className="privacy-container">
              <h2>Política y privacidad de datos</h2>
              <div className="button-privacy">
              <Button
                variant="contained"
                className="button-politics"
                onClick={() => navigate("/terms")}
              >
                ¡Conozca nuestras políticas!
              </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <div className="hours-container">
              <h2>Contacto</h2>
              <p>Correo: fullhouse.shoes721@gmail.com</p>
              <p>Celular: 314 720 1104</p>
              <h4>Horarios de atención</h4>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábado: 10:00 AM - 2:00 PM</p>
            </div>
          </Grid>
        </Grid>
        <div className="logo"><img className="uamLogo" src={logo} alt="Logo UAM" /></div>
        
      </div>
    </footer>
  );
};

export default Footer;
