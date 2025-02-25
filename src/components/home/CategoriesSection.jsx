import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useGetCategories from "./../../hooks/home/useGetCategories";
import CategoryCard from "../../ui/cards/CategoryCard";
import "swiper/css";

export default function CategoriesSection() {
  const { data: categories } = useGetCategories();

  return (
    <section className="categories-section">
      <div className="container">
        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          loop={true}
          speed={1000}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="hero-swiper"
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {categories?.map((category) => (
            <SwiperSlide key={category?._id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
