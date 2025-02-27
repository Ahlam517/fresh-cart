import { Link } from "react-router";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/products?category=${category?._id}`} className="category_card">
      <img src={category?.image} alt={category?.slug} />
      <div className="content">
        <h5>{category?.name}</h5>
      </div>
    </Link>
  );
}
