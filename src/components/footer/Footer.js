import React from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import "./Footer.scss";
import locationicon from "../../assets/SVG/location-svgrepo-com.png";
import IGicon from "../../assets/SVG/instagram-svgrepo-com.png";
import TKicon from "../../assets/SVG/tiktok-svgrepo-com.png";
import WPicon from "../../assets/SVG/whatsapp-svgrepo-com.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
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
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div className="social-container">
              <h2>Redes sociales</h2>
              <ul id="social-list">
                <li>
                  <a
                    href="https://www.instagram.com/fullhouse_shoes/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  <img src={IGicon} alt="Instagram Icon" className="IG-icon" />
                </li>
                <li>
                  <a href="https://www.tiktok.com/@fullhouse_shoes?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">Tik Tok</a>
                  <img src={TKicon} alt="Tik Tok Icon" className="TK-icon" />
                </li>
                <li>
                  <a
                    href="https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2F2mtkwp&e=AT3Hqj1-Fn4RixjbyzV0xhcm3rfdvxNhUx5IO2Xrp-INatXUdBbmKkxCuMCEfjBloLUwdfg8mKcy2tSuu0MykiCIakLysdS7hb7gNg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <img src={WPicon} alt="WhatsApp Icon" className="WP-icon" />
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div className="privacy-container">
              <h2>Política y privacidad de datos</h2>
              <Button
                variant="contained"
                className="button-politics"
                onClick={() => navigate("/terms")}
              >
                ¡Conozca nuestras políticas!
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
