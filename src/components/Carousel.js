import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const imageProp = ["pizza", "burger", "milkshake"];

function CarouselComponent() {
  return (
    <Carousel
      showStatus={false}
      navButtonsAlwaysVisible
      showThumbs={false}
      autoPlay
      infiniteLoop
      emulateTouch
    >
      {imageProp.map((imageProp) => {
        return (
          <div
            key={imageProp}
            style={{ maxHeight: "36rem" }}
            className=" object-center brightness-50 "
          >
            <img
              alt={imageProp}
              src={`https://source.unsplash.com/random/900x600/?${imageProp}`}
            />
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;
