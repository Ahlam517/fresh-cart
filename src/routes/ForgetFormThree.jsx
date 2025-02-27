import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axiosInstance from "../utils/axiosInstance";

export default function ForgetFormThree({ formData, setFormData }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.put("/auth/resetPassword", {
        email: formData.email,
        newPassword: formData.newPassword,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Password reset successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging in => ", error);
      toast.error("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-7 col-12 p-2">
      <h1>Reset Your Password !!</h1>
      <p className="subtitle mb-2">
        please enter the code you received to reset your password on{" "}
        <span>{formData.email}</span>
      </p>
      <form className="auth_form mt-5" onSubmit={handleSubmit}>
        <InputField
          label="Email Address:"
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <InputField
          label="New Password"
          id="newPassword"
          type="password"
          placeholder="Enter new password here"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />

        <SubmitButton name="Confirm" loading={loading} />
      </form>
    </div>
  );
}
