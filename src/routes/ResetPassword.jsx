import { useState } from "react";
import ForgetFormOne from "./ForgetFormOne";
import ForgetFormTwo from "./ForgetFormTwo";
import ForgetFormThree from "./ForgetFormThree";

export default function ResetPassword() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
  });
  return (
    <section className="auth_section">
      <div className="container">
        <div className="row justify-content-center">
          {step === 1 && (
            <ForgetFormOne
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <ForgetFormTwo
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 3 && (
            <ForgetFormThree formData={formData} setFormData={setFormData} />
          )}
        </div>
      </div>
    </section>
  );
}
