import useGetProducts from "../../hooks/home/useGetProducts";
import ProductCard from "../../ui/cards/ProductCard";

export default function ProductsList() {
  const { data: products } = useGetProducts();

  return (
    <div className="col-lg-9 col-md-6 col-12 p-0">
      <div className="row">
        {products?.data?.map((product) => (
          <div className="col-lg-4 col-md-6 col-12 p-2" key={product?._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
