import FilterSideBar from "../components/products/FilterSideBar";
import ProductsList from "../components/products/ProductsList";
import "../assets/styles/products.css";

export default function Products() {
  return (
    <section className="products_page">
      <div className="container">
        <div className="row">
          <FilterSideBar />
          <ProductsList />
        </div>
      </div>
    </section>
  );
}
