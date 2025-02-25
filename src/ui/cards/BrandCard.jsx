export default function BrandCard({ brand }) {
  return (
    <div className="brand_card">
      <img src={brand?.image} alt={brand?.name} />
      <h6>{brand?.name}</h6>
    </div>
  )
}
