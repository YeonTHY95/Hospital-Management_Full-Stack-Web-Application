"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation ,Autoplay} from 'swiper/modules';

export default function ImageSlider() {
  return (
    <>
      <Swiper autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }} navigation={true} modules={[Navigation,Autoplay]} className="mySwiper">
        <SwiperSlide><Image src="/medicalbanner.jpg" width={500} height={300} alt='Image' className='size-auto' /></SwiperSlide>
        <SwiperSlide><Image src="/medicalbanner2.png" width={626} height={417} alt='Image' className='object-contain w-[626px] h-[417px]'/></SwiperSlide>
        <SwiperSlide><Image src="/medicalbanner3.jpg" width={500} height={300} alt='Image' className='size-auto' /></SwiperSlide>
      </Swiper>
    </>
  );
}