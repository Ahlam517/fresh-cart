import { Accordion, Form } from "react-bootstrap";
import useGetBrands from "../../hooks/home/useGetBrands";
import useGetCategories from "../../hooks/home/useGetCategories";
import { useSearchParams } from "react-router";

export default function FilterSideBar() {
  const { data: brands } = useGetBrands();
  const { data: categories } = useGetCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <aside className="col-lg-3 col-md-6 col-12 p-2">
      <form className="side_bar form">
        <Form.Control
          type="text"
          placeholder="Search"
          className="search"
          value={searchParams.get("search")}
          onChange={(e) => setSearchParams({ search: e.target.value })}
        />

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              {categories?.map((category) => (
                <Form.Check
                  key={category._id}
                  type="Radio"
                  name="category"
                  label={category.name}
                  className="checkbox"
                  value={searchParams.get("category")}
                  onChange={(e) => setSearchParams({ category: e.target.value })}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Brands</Accordion.Header>
            <Accordion.Body>
              {brands?.data?.map((brand) => (
                <Form.Check
                  key={brand._id}
                  type="Radio"
                  name="brand"
                  label={brand.name}
                  className="checkbox"
                  value={searchParams.get("brand")}
                  onChange={(e) => setSearchParams({ brand: e.target.value })}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <span className="line"></span>

        <div className="actions">
          <button className="confirm">Confirm</button>
          <button className="reset">Reset</button>
        </div>
      </form>
    </aside>
  );
}
