import useGetCategories from "../hooks/home/useGetCategories";
import CategoryCard from "../ui/cards/CategoryCard";

export default function Categories() {
  const { data } = useGetCategories();

  return (
    <section className="categories_page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <h2 className="title">Explore our Categories</h2>
            <p className="subtitle">
              Fresh Mart is an online store that offers a wide range of products
              from various categories. Our goal is to make sure that you have a
              great shopping experience with us.
            </p>
          </div>

          {data?.map((category) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={category?._id}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
