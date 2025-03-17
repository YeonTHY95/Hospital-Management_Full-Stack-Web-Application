"use client";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function ImageSlider() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><div className='w-screen h-[250px] flex justify-center items-center'><p>Slide 1</p></div></SwiperSlide>
        <SwiperSlide><div className='w-screen h-[250px] flex justify-center items-center'><p>Slide 2</p></div></SwiperSlide>
        <SwiperSlide><div className='w-screen h-[250px] flex justify-center items-center'><p>Slide 3</p></div></SwiperSlide>
      </Swiper>
    </>
  );
}