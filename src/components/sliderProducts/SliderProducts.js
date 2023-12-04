import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "./SliderProducts.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SliderProducts = () => {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/product",
        {}
      );
      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);


  const loadImageUrls = async () => {
    const urls = await Promise.all(
      products.map(async (product) => {
        const imageModule = await import(`../../assets/images/Productsphotos/${product.photo1}`);
        return imageModule.default;
      })
    );
    setImageUrls(urls);
  };

  useEffect(() => {
    if (products.length > 0) {
      loadImageUrls();
    }
  }, [products]);


  const CustomPrevArrow = ({ onClick }) => (
    <button className="slick-prev2" onClick={onClick}>
      <KeyboardArrowLeftIcon />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button className="slick-next2" onClick={onClick}>
      <KeyboardArrowRightIcon />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Slider {...settings} >
      {imageUrls.map((url, index) => (
        <div key={products[index].id} className='containerproducts'>
          <img
            src={url}
            style={{ width: '300px', height: 'auto' }}
            alt={products[index].name}
          />
          <h3>{products[index].name}</h3>
          <p>Precio: ${products[index].price}</p>
        </div>
      ))}
    </Slider>
  );
};


export default SliderProducts;
