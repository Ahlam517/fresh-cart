import HeroSection from "../components/home/HeroSection";
import "../assets/styles/home.css";
import CategoriesSection from "../components/home/CategoriesSection";
import Products from "../components/home/Products";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <Products />
    </>
  );
}
