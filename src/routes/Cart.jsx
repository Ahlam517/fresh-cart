import { toast } from "sonner";
import useGetCart from "../hooks/cart/useGetCart";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router";

export default function Cart() {
  const { data: cart, refetch } = useGetCart();

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axiosInstance.delete(`/cart/${id}`);
      if (res.status === 200) {
        refetch();
        toast.success("Product deleted from cart");
      }
    } catch (error) {
      console.error("Error deleting product => ", error);
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await axiosInstance.delete("/cart");
      if (res.status === 200) {
        refetch();
        toast.success("Cart cleared successfully");
      }
    } catch (error) {
      console.error("Error deleting product => ", error);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      const res = await axiosInstance.put(`/cart/${id}`, {
        count: quantity,
      });
      if (res.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Error updating quantity => ", error);
    }
  };

  return (
    <section className="cart_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 p-2 mb-3">
            <h2 className="title">My Cart</h2>
          </div>

          <div className="col-lg-12 p-2">
            {cart?.products?.length === 0 ? (
              <div className="empty">
                <img src="/emptyCart.svg" alt="empty-cart" />
                <h4>Cart is empty</h4>
                <p>
                  Add items to it now <Link to="/products">Shop Now</Link>
                </p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.products?.map((product) => (
                    <tr key={product?._id}>
                      <td>
                        <div className="product">
                          <img
                            src={product?.product?.imageCover}
                            alt={product?.product?.title}
                          />
                          <h6>{product?.product?.title}</h6>
                        </div>
                      </td>
                      <td>{product?.price} EGP</td>
                      <td>
                        <div className="quantity">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                product?._id,
                                product?.count + 1
                              )
                            }
                          >
                            <img src="/plus.svg" alt="plus" />
                          </button>
                          {product?.count}
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                product?._id,
                                product?.count - 1
                              )
                            }
                          >
                            <img src="/minus.svg" alt="minus" />
                          </button>
                        </div>
                      </td>
                      <td>{product?.count * product?.price} EGP</td>
                      <td>
                        <button
                          className="remove"
                          onClick={() => handleDeleteProduct(product?._id)}
                        >
                          <img src="/trash.svg" alt="trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {cart?.products?.length > 0 && (
            <div className="col-12 p-2">
              <h6 className="total">
                Total:{" "}
                {cart?.products?.reduce((a, b) => a + b.count * b.price, 0)} EGP
              </h6>
              <div className="actions_btns">
                <button>Checkout</button>
                <button onClick={handleClearCart}>Clear Cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
