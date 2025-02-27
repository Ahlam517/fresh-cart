import { useState } from "react";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { toast } from "sonner";
import axiosInstance from "../utils/axiosInstance";

export default function ForgetFormTwo({ setStep, formData, setFormData }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verifyResetCode", {
        resetCode: formData.resetCode,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("code confirmed successfully");
        setStep(3);
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
          label="Confirmation Code:"
          id="resetCode"
          type="test"
          placeholder="Enter code here"
          value={formData.resetCode}
          onChange={(e) =>
            setFormData({ ...formData, resetCode: e.target.value })
          }
        />

        <SubmitButton name="Confirm" loading={loading} />
      </form>
    </div>
  );
}
