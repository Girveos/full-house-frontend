import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import "./menu.scss";
import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/Frank1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { images } from "../../assets";
import ShoppingCar from "../shoppingCar/ShoppingCar";
import Footer from "../footer/Footer";
import Favorites from "../favorites/Favorites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginPage from "../loginPage/LoginPage";
import SliderProducts from "../sliderProducts/SliderProducts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const posts = [
  {
    _id: "1",
    title: "Air Jordan SB",
    subtitle: "¡Lo último de moda!",
    Description:
      "¡Los Air Jordan SB combinan la elegancia de los Air Jordan con la funcionalidad de los Nike SB. Diseñados para los amantes del skate y el baloncesto, estos tenis ofrecen un rendimiento superior y un estilo inigualable!",
    avatar: images.post1,
  },
  {
    _id: "2",
    title: "Nike SB Dunk Low",
    subtitle: "♥♥ Para que disfrutes San Valentin ♥♥",
    Description:
      "¡Descubre el estilo clásico reinventado con los Nike SB Dunk Low. Con su diseño atemporal y comodidad inigualable, estos tenis son la elección perfecta para expresar tu individualidad y tu amor por el skateboarding!",
    avatar: images.post2,
  },
  {
    _id: "3",
    title: "Adidas Forum Bad Bunny",
    subtitle: "¡Colaboración de Adidas con BaddBunny!",
    Description:
      "¡Los Adidas Forum Bad Bunny son un tributo al icónico artista y a su estilo inconfundible. Estos tenis combinan a la perfección la herencia clásica de Adidas con el espíritu creativo de Bad Bunny. Perfectos para aquellos que buscan destacar en la multitud!",
    avatar: images.post4,
  },
  {
    _id: "4",
    title: "Jordan Retro Travis Scott Purple",
    subtitle: "¡Tuyos si eres alguien exclusivo!",
    Description:
      "¡Los Jordan 4 Retro Travis Scott Purple son una obra maestra de la colaboración entre Jordan Brand y el famoso rapero Travis Scott. Estos tenis destacan por su diseño único y colores vibrantes que te harán destacar en cualquier ocasión!",
    avatar: images.post3,
  },
];

export const MenuReact = () => {
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleOpen = (post_id) => {
    const post = posts.find((post) => post._id === post_id);
    setSelectedPost(post);
    setOpen(true);
  };
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const handleAlertModalOpen = () => {
    setShowAlertModal(true);
  };

  const handleAlertModalClose = () => {
    setShowAlertModal(false);
  };
  const addToCart = (product) => {
    if (!localStorage.getItem("accessToken")) {
      handleAlertModalOpen();
    } else {
      setCartItems((prevCartItems) => {
        const exists = prevCartItems.some((item) => item._id === product._id);
        if (!exists) {
          const updatedCart = [...prevCartItems, product];
          return updatedCart;
        }
        return prevCartItems;
      });
    }
  };

  const [likedProducts, setLikedProducts] = useState([]);
  const addLikedProduct = (product) => {
    if (!localStorage.getItem("accessToken")) {
      handleAlertModalOpen();
    } else {
      setLikedProducts((prevLikedProducts) => {
        const exists = prevLikedProducts.some(
          (item) => item._id === product._id
        );
        if (!exists) {
          const updatedLikedProducts = [...prevLikedProducts, product];
          return updatedLikedProducts;
        }
        return prevLikedProducts;
      });
    }
  };
  const handleLogin = () => {
    navigate("/LogIn");
  };
  const handleCancel = () => {
    setShowAlertModal(false);
  };

  const handleClose = () => setOpen(false);
  /* const [showAdditionalCards, setShowAdditionalCards] = useState(false); */

  /*  const handleCardClick = () => {
    console.log("Handle Card Click");
    setShowAdditionalCards(!showAdditionalCards);
  };
   */

  useEffect(() => {

    if(localStorage.getItem("accessToken")){
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(accessToken);
      const roleUser = decodedToken.role;
    if (roleUser === "admin") {
      navigate( "/DashboardAdminFullHouse");
    }
    }

    const handleMenuToggle = () => {
      const menuList = document.getElementById("menu-list");
      menuList.classList.toggle("show-menu");
    };

    const handleResize = () => {
      if (window.innerWidth > 530) {
        const menuList = document.getElementById("menu-list");
        menuList.classList.remove("show-menu");
      }
    };

    const handleScroll = () => {
      // Obtén la distancia desde la parte superior de la página
      const scrollY = window.scrollY;

      // Define una altura de desplazamiento mínima para mostrar los iconos
      const minHeightToShowIcons = 100; // Ajusta este valor según tus necesidades

      // Muestra los iconos si el usuario ha bajado lo suficiente en la página
      if (scrollY > minHeightToShowIcons) {
        setShowIcons(true);
      } else {
        setShowIcons(false);
      }
    };

    const menuToggle = document.getElementById("menu-toggle");
    menuToggle.addEventListener("click", handleMenuToggle);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      menuToggle.removeEventListener("click", handleMenuToggle);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      {/* Sección de iconos que se mostrará al desplazarse hacia abajo */}
      {showIcons && (
        <div className="icon-section">
          <a href="#" className="iconlist">
            <FontAwesomeIcon icon={faHome} />
          </a>

          <a href="#products1" className="iconlist">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </a>

          <a href="#contact1" className="iconlist">
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      )}

      <div className="menu">
        <img className="uamLogo" src={logo} alt="Logo UAM" />
        <button id="menu-toggle" className="menu-toggle">
          ☰
        </button>
        <ul id="menu-list">
          <li>
            <a href="#flex1">Novedades</a>
          </li>
          <li>
            <a href="#products1">Favoritos</a>
          </li>
          <li>
            <a href="#contact1">Carrito de compra</a>
          </li>
        </ul>
        <Button
          variant="contained"
          className="button-login"
          style={{ backgroundColor: 'gray', color: 'white' }}
          onClick={() => {
            if(localStorage.getItem("accessToken")){
              const accessToken = localStorage.getItem("accessToken");
              const decodedToken = jwtDecode(accessToken);
              const roleUser = decodedToken.role;
            if (roleUser) {
              navigate(roleUser === "admin" ? "/DashboardAdminFullHouse" : "/DashboardUserFullHouse");
            }
            }
             else {
              navigate("/LogIn");
            }
          }}
        >
          {localStorage.getItem("accessToken") ? "Perfil" : "Iniciar sesión"}
        </Button>
      </div>
      <div className="bienvenida">
        <h2>FullHouse Shoes</h2>
      </div>
      <div className="ListaDeProductos">
      <img
            style={{ maxWidth: '100%', height: 'auto' }}
          />
      <SliderProducts/>
      </div>
      <div className="bienvenida">
        <h2>Novedades</h2>
      </div>
      <div className="flex1" id="flex1">
        <div className="slider-container">
          <div className="slider-main">
            <Slider {...sliderSettings}>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div className="slider-content">
                    <img src={post.avatar} class="slidePic" />
                    <div className="slider-title">
                      <h2>{post.title}</h2>
                    </div>
                    <div className="slider-subtitle">
                      <h3>{post.subtitle}</h3>
                    </div>
                    <Button
                      className="button-mas-info"
                      onClick={() => handleOpen(post._id)}
                    >
                      ¡Más información!
                    </Button>
                  </div>
                ))
              ) : (
                <p>No hay servicios</p>
              )}
            </Slider>
          </div>
        </div>
      </div>
      <Modal
        open={showAlertModal}
        onClose={handleAlertModalClose}
        aria-labelledby="alert-modal-title"
        aria-describedby="alert-modal-description"
        className="modal-iniciar"
      >
        <Box
          className="box-style"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 4,
          }}
        >
          <div>Debes iniciar sesión para continuar</div>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <div className="button-container">
              <Button
                className="VolverButton"
                onClick={handleCancel}
                variant="contained"
                color="primary"
              >
                Volver
              </Button>
              <Button onClick={handleLogin} variant="contained" color="grey">
                Iniciar sesión
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
      <div className="products1" id="products1">
        <Favorites favoritesItems={likedProducts} />
      </div>
      <div className="contact1" id="contact1">
        <ShoppingCar cartItems={cartItems} />
      </div>
      <div className="footer">
        <Footer />
      </div>

      <Modal
        className="modal-style"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-style">
          {selectedPost && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="title-modal"
              >
                {selectedPost.title}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="title-modal"
              >
                {selectedPost.subtitle}
              </Typography>
              <img
                src={selectedPost.avatar}
                alt={selectedPost.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="title-modal"
              >
                {selectedPost.Description}
              </Typography>
              <div className="button-fav-group">
                <Fab
                  className="fab-button"
                  color="primary"
                  aria-label="Favorite icon"
                  onClick={() => addLikedProduct(selectedPost)}
                >
                  <FavoriteIcon />
                </Fab>
                <Fab
                  className="shop-button"
                  color="seconday"
                  aria-label="Favorite icon"
                  onClick={() => addToCart(selectedPost)}
                >
                  <AddShoppingCartIcon />
                </Fab>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MenuReact;
