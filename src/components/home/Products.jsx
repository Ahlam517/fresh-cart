import ProductCard from "../../ui/cards/ProductCard";
import useGetProducts from "./../../hooks/home/useGetProducts";

export default function Products() {
  const { data: products } = useGetProducts();

  return (
    <section className="products-section">
      <div className="container">
        <div className="row ">
          <div className="col-12 p-2">
            <form>
              <input type="text" placeholder="Search for products" />
              <button type="submit">
                <img src="/search.svg" alt="search" />
              </button>
            </form>
          </div>
          {products?.data?.map((product) => (
            <div className="col-lg-3 col-md-6 col-12 p-2" key={product?._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
