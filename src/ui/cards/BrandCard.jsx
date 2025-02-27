import { Link } from "react-router";

export default function BrandCard({ brand }) {
  return (
    <Link to={`/products?brand=${brand?._id}`} className="brand_card">
      <img src={brand?.image} alt={brand?.name} />
      <h6>{brand?.name}</h6>
    </Link>
  )
}
