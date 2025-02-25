import { Form } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axiosInstance from "../utils/axiosInstance";

const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      if (res.status === 201) {
        const login = await axiosInstance.post("/auth/signin", {
          email: data.email,
          password: data.password,
        });

        if (login.status === 200) {
          toast.success("Registration successful! Redirecting...");
          setCookies("token", res.data.token);
          setCookies("id", jwtDecode(res.data.token.substring(7)).id);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Registration Error: ", error);

      if (error.response) {
        const { data, status } = error.response;

        if (status === 400 && data.errors) {
          Object.entries(data.errors).forEach(([key, msg]) => {
            setError(key, { type: "server", message: msg });
          });
        } else {
          toast.error(data.message || "Error signing up. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="auth_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-12 p-2">
            <h1>Create your account !!</h1>
            <p className="subtitle mb-2">
              Join us today! Sign up to access your personalized dashboard,
              manage your orders, and explore new products tailored just for
              you.
            </p>
          </div>
          <div className="col-lg-7 col-12 p-2">
            <Form className="auth_form" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Full Name:"
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...register("name")}
                error={errors.name?.message}
              />

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

              <InputField
                label="Confirm Password:"
                id="rePassword"
                type="password"
                placeholder="Confirm your password"
                {...register("rePassword")}
                error={errors.rePassword?.message}
              />

              <SubmitButton name="Register" loading={isSubmitting} />

              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
