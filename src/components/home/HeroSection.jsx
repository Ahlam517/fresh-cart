import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container h-100">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          speed={1000}
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="hero-swiper"
        >
          <SwiperSlide>
            <img src="/s1.jpg" alt="slide1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/s2.jpg" alt="slide2" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
