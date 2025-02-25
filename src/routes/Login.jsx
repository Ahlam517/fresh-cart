import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { Form } from "react-bootstrap";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import * as yup from "yup";
import axiosInstance from "./../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [, setCookies] = useCookies(["token", "id"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signin", data);
      if (res.status === 200) {
        navigate("/");
        toast.success("Login successful");
        setCookies("token", res.data.token);
        setCookies("id", jwtDecode(res.data.token.substring(7)).id);
      }
    } catch (error) {
      console.error("Error logging in => ", error);
      toast.error("Error logging in");
    }
  };

  return (
    <section className="auth_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-12 p-2">
            <h1>Login to your account !!</h1>
            <p className="subtitle mb-2">
              Welcome back! Log in to access your personalized dashboard, manage
              your orders, and explore new products tailored just for you.
            </p>
          </div>
          <div className="col-lg-7 col-12 p-2">
            <Form className="auth_form" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Email Address:"
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                error={errors.email?.message}
              />

              <InputField
                label="Password:"
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
              />

              <Link to="/forget-password">Forget Password?</Link>

              <SubmitButton name="Login" loading={isSubmitting} />

              <p>
                Don&apos;t have an account?{" "}
                <Link to="/register">Create an account</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
