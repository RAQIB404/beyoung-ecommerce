import React from "react";
import  bb from "../Components/Assets/bb.png";
import  hero1 from "../Components/Assets/hero1.png";
import  homem from "../Components/Assets/homem.png";
import ProductList from "./ProductList";
import "./home.css"

function Home() {

    return (
        <div className="deskhome">
            <div  className="silder">
                <div className="heroImg">
                    <img src={bb} alt="Hero 1" />
                </div>
                <div className="hero">
                    <img src={hero1} alt="Hero 2" />
                </div>
            </div>
            <div className="homemob">
                <img src={homem} alt=" "/>
            </div>
            <ProductList />
        </div>
    );
}

export default Home;