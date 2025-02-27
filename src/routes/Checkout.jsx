import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useGetCart from "../hooks/cart/useGetCart";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axiosInstance from "../utils/axiosInstance";

export default function Checkout() {
  const { data: cart, refetch } = useGetCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(`/orders/${cart._id}`, {
        shippingAddress: data,
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Order placed successfully");
        refetch();
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating order => ", error);
      toast.error("Error creating order");
    }
  };

  return (
    <section className="checkout_page">
      <div className="container">
        <div className="row">
          {/* Checkout Form */}
          <div className="col-lg-6 col-12 p-2">
            <form className="auth_form" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Phone Number"
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone", { required: "Phone number is required" })}
                error={errors.phone?.message}
              />

              <InputField
                label="City"
                id="city"
                placeholder="Enter your city"
                {...register("city", { required: "City is required" })}
                error={errors.city?.message}
              />

              <InputField
                label="Additional Info"
                id="details"
                placeholder="Write here..."
                {...register("details")}
                as="textarea"
                error={errors.details?.message}
              />

              <SubmitButton name="Place Order" loading={isSubmitting} />
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-lg-6 col-12 p-2">
            <div className="order_info">
              <h3>Order Summary</h3>
              {cart?.products?.length ? (
                <ul>
                  {cart.products.map((product) => (
                    <li key={product._id}>
                      <span>{product.product?.title}</span>
                      <span className="ms-2">X{product.count}</span>
                      <span className="ms-auto price">{product.price} EGP</span>
                    </li>
                  ))}
                  <li>
                    Order Total:{" "}
                    <span className="price">{cart.totalCartPrice} EGP</span>
                  </li>
                </ul>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
