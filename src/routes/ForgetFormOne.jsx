import { useState } from "react";
import { toast } from "sonner";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axiosInstance from "../utils/axiosInstance";

export default function ForgetFormOne({ setStep, formData, setFormData }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgotPasswords", {
        email: formData.email,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Password reset link sent to your email");
        setStep(2);
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
        please enter your email to receive a link to create a new password
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

        <SubmitButton name="Send" loading={loading} />
      </form>
    </div>
  );
}
