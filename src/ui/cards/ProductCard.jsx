import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import useAuth from "./../../hooks/auth/useAuth";
import axiosInstance from "../../utils/axiosInstance";
import useGetCart from "./../../hooks/cart/useGetCart";
import useGetWishList from "../../hooks/wishlist/useGetWishList";

export default function ProductCard({ product }) {
  const { isAuthed } = useAuth();
  const { data: wishList, refetch: refetchFavs } = useGetWishList();
  const { refetch } = useGetCart();
  const navigate = useNavigate();

  const isFav = wishList?.find((p) => p._id === product?._id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    }
  };

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

  return (
    <Link to={`/products/${product?._id}`} className="product_card">
      <div className="img">
        <button onClick={isFav ? handleRemoveFav : handleAddToFav}>
          <img src="/heart.svg" alt="heart" className={isFav ? "inFav" : ""} />
        </button>
        <img src={product?.imageCover} alt={product?.name} />
      </div>
      <div className="content">
        <h6>{product?.title}</h6>

        <div className="category">
          <span>{product?.subcategory?.[0]?.name}</span>
          <div className="rate">
            <img src="/star.svg" alt="start" />
            <span>{product?.ratingsAverage}</span>
          </div>
        </div>

        <div className="price_cart">
          <h6 className="price">
            {product?.price} <span>EGP</span>
          </h6>
          <button className="btn" onClick={handleAddToCart}>
            <img src="/cart.svg" alt="cart" />
          </button>
        </div>
      </div>
    </Link>
  );
}
