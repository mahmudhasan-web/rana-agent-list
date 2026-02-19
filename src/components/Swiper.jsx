"use client";
import React from "react";
import Slider2 from "@/assets/IMG-20260130-WA0010.jpg";
import Slider3 from "@/assets/IMG-20260130-WA0011.jpg";
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
            height={350}
            className="rounded-lg w-fit h-60 mx-auto "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Swipers;
