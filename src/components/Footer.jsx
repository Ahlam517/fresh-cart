import { Link } from "react-router";
import "../assets/styles/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="inner_footer">
              <Link to="/" className="logo">
                <img src="/fav.svg" alt="logo" />
                <h1>FRESH CART</h1>
              </Link>

              <div className="socialMedia">
                <Link to="https://www.facebook.com/">
                  <img src="/facebook.svg" alt="facebook" />
                </Link>
                <Link to="https://twitter.com/">
                  <img src="/twitter.svg" alt="twitter" />
                </Link>
                <Link to="https://www.instagram.com/">
                  <img src="/instagram.svg" alt="instagram" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="copy_rights">
              <p>Copyright &copy; {new Date().getFullYear()} Fresh Cart</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
