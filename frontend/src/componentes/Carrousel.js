import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Link as LinkRouter} from "react-router-dom"
import "../style/style.css";
import cities from "../componentes/datos.js"
import { Grid, Autoplay, Pagination, Navigation } from "swiper";


export default function Carrousel() {
  return (
    <div className="carro">
      <div>
      <h1 className="title">Popular MYtineraries</h1>
      </div>
    <>
      <Swiper
      breakpoints={{
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          grid:{
            rows: 2,
          },
          spaceBetween:6,
        },
      
        768: {
          slidesPerView: 2,
              slidesPerGroup: 2,
              grid:{
                rows: 2,
              },
              spaceBetween:6,
        }
      }}
        slidesPerView={2}
        slidesPerGroup={2}
        grid={{
          rows: 2
        }}
        spaceBetween={2}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Grid, Pagination, Autoplay, Pagination, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
       
      >
        <div className="cards-carrousell">
        {cities.map(evento =>
            
            <div className="cards-carrousell" key={evento.name}>
            <SwiperSlide>
           <img className="imagenes" src={process.env.PUBLIC_URL+ `/imagenes/${evento.image}`} />
            <LinkRouter className="title-card" to={`/`}>{evento.name}</LinkRouter>
            </SwiperSlide>
            </div>
          )}
          </div>
      
      </Swiper>
    </>
    </div>
  );
}



