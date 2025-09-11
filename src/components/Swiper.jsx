"use client";
import React from "react";
import Slider2 from "@/assets/slider2.jpg";
import Slider3 from "@/assets/slider3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const Swipers = () => {
  const images = [Slider2, Slider3];
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            alt={`slider-${index}`}
            width={550}
            height={300}
            className="rounded-lg lg:h-[210px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Swipers;
