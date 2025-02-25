import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/auth/useAuth";
import useGetCart from "./../hooks/cart/useGetCart";
import "../assets/styles/header.css";

export default function Header() {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthed } = useAuth();
  const { data: cart } = useGetCart();
  const [, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current.classList.toggle("sticky", window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/");
  };

  const count = cart?.products?.reduce((acc, curr) => acc + curr?.count, 0);

  return (
    <header ref={headerRef}>
      <nav className="container">
        <Link to="/" className="logo">
          <img src="/fav.svg" alt="logo" />
          <h1>FRESH CART</h1>
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/wish-list">Wish List</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="brands">Brands</NavLink>
        </div>

        <div className="actions">
          {isAuthed ? (
            <>
              <Link to="/cart" className="cart">
                <span>{count}</span>
                <img src="/cart_bag.svg" alt="cart - bag" />
              </Link>
              <span onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login" className="login">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
