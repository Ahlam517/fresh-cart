export default function CategoryCard({ category }) {
  return (
    <div className="category_card">
      <img src={category?.image} alt={category?.slug} />
      <div className="content">
        <h5>{category?.name}</h5>
      </div>
    </div>
  );
}
