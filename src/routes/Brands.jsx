import BrandCard from "../ui/cards/BrandCard";
import useGetBrands from "./../hooks/home/useGetBrands";

export default function Brands() {
  const { data } = useGetBrands();

  return (
    <section className="brands_section">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <h2 className="title">Explore our Brands</h2>
            <p className="subtitle">
              Fresh Mart is an online store that offers a wide range of products
              from various brands. Our goal is to make sure that you have a
              great shopping experience with us.
            </p>
          </div>

          {data?.data?.map((brand) => (
            <div className="col-lg-3 col-md-4 col-6 p-2" key={brand?._id}>
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
