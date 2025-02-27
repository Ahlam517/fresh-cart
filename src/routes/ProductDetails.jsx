import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import useGetProduct from "../hooks/home/useGetProduct";
import useAuth from "../hooks/auth/useAuth";
import useGetWishList from "../hooks/wishlist/useGetWishList";
import useGetCart from "../hooks/cart/useGetCart";
import { toast } from "sonner";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

export default function ProductDetails() {
  const { data: product } = useGetProduct();
  const { isAuthed } = useAuth();
  const { data: wishList, refetch: refetchFavs } = useGetWishList();
  const { refetch } = useGetCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const isFav = wishList?.find((p) => p._id === product?._id);

  const handleAddToFav = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthed) navigate("/login");

    try {
      const res = await axiosInstance.post("/wishlist", {
        productId: product?._id,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Product added to wishlist");
        refetchFavs();
      }
    } catch (error) {
      console.error("Error adding to cart => ", error);
    }
  };

  const handleRemoveFav = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthed) navigate("/login");

    try {
      const res = await axiosInstance.delete(`/wishlist/${product?._id}`);

      if (res.status === 200 || res.status === 201) {
        toast.success("Product removed to wishlist");
        refetchFavs();
      }
    } catch (error) {
      console.error("Error adding to cart => ", error);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    if (!isAuthed) navigate("/login");

    try {
      const res = await axiosInstance.post("/cart", {
        productId: product?._id,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Product added to cart");
        navigate("/cart");
        refetch();
      }
    } catch (error) {
      console.error("Error adding to cart => ", error);
    } finally {
      setLoading(false);
    }
  };

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

              <div className="d-flex gap-5 mt-4">
                <div className="rate">
                  <img src="/star.svg" alt="start" />
                  <span>{product?.ratingsAverage}</span>
                </div>

                <button
                  disabled={!isAuthed}
                  className="fav_btn"
                  onClick={isFav ? handleRemoveFav : handleAddToFav}
                >
                  <img
                    src="/heart.svg"
                    alt="heart"
                    className={isFav ? "inFav" : ""}
                  />
                  {isFav ? "Remove from" : "Add to"} wishlist
                </button>
              </div>

              <button
                disabled={!isAuthed}
                style={{ opacity: loading ? 0.5 : 1 }}
                type="button"
                className="add_to_cart_btn"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
