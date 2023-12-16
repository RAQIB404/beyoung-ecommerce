import React from "react";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import  Slider from 'react-slick';
import  bb from "../Components/Assets/bb.png";
import  hero1 from "../Components/Assets/hero1.png";
import ProductList from "./ProductList";

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,        // Enable automatic scrolling
        autoplaySpeed: 2000,   // Set the time between slides (in milliseconds)
    }

    return (
        <div className="deskhome">
            <Slider {...settings} className="silder">
                <div className="heroImg">
                    <img src={bb} alt="Hero 1" />
                </div>
                <div className="hero">
                    <img src={hero1} alt="Hero 2" />
                </div>
            </Slider>
            <ProductList />
        </div>
    );
}

export default Home;