import { createBrowserRouter } from "react-router";
import Home from "../routes/Home";
import Cart from "../routes/Cart";
import Layout from "../layout/Layout";
import Brands from "../routes/Brands";
import Categories from "../routes/Categories";
import WhishList from "../routes/WhishList";
import Products from "../routes/Products";
import Login from "../routes/Login";
import Register from "../routes/Register";
import ResetPassword from "../routes/ResetPassword";
import ProtectionProvider from "./ProtectionProvider";
import ProductDetails from "../routes/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: (
          <ProtectionProvider>
            <Cart />
          </ProtectionProvider>
        ),
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "wish-list",
        element: (
          <ProtectionProvider>
            <WhishList />
          </ProtectionProvider>
        ),
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":id",
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forget-password",
        element: <ResetPassword />,
      },
    ],
  },
]);
