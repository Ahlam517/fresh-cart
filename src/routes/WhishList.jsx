import useGetWishList from "../hooks/wishlist/useGetWishList";
import ProductCard from "./../ui/cards/ProductCard";

export default function WhishList() {
  const { data: products } = useGetWishList();
  return (
    <section className="whish_list_page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <h2 className="title">My Wishlist</h2>
            <p className="subtitle">
              🛒 Welcome to Fresh Mart! Discover a wide variety of products 🌟
              and enjoy a fantastic shopping experience with us! 😊
            </p>
          </div>
          {products?.map((product) => (
            <div className="col-lg-3 col-md-6 col-12 p-2" key={product?._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
