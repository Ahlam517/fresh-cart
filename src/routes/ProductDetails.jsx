import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import useGetProduct from "../hooks/home/useGetProduct";
import useAuth from "../hooks/auth/useAuth";
import useGetWishList from "../hooks/wishlist/useGetWishList";
import useGetCart from "../hooks/cart/useGetCart";

export default function ProductDetails() {
  const { data: product } = useGetProduct();
  const { isAuthed } = useAuth();
  const { data: wishList, refetch: refetchFavs } = useGetWishList();
  const { refetch } = useGetCart();
  const navigate = useNavigate();

  const isFav = wishList?.find((p) => p._id === product?._id);

  return (
    <section className="product_details">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 p-2">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              speed={1000}
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
            >
              {product?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt="slide1" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-lg-6 col-12 p-2">
            <div className="content">
              <h1>{product?.title}</h1>
              <p className="mb-3">{product?.description}</p>

              <div className="brand">
                <img src={product?.brand?.image} alt={product?.brand?.name} />
                <h6>{product?.brand?.name}</h6>
              </div>

              <h6>Sold Items: {product?.sold} item</h6>
              <h6>In Stock: {product?.quantity} item</h6>
              <h6>Price: {product?.price} EGP</h6>

              <div className="d-flex gap-2">
                <div className="rate">
                  <img src="/star.svg" alt="start" />
                  <span>{product?.ratingsAverage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
