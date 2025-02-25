import { Form } from "react-bootstrap";

export default function InputField({ label, error, ...props }) {
  return (
    <div className="input_field mb-3">
      {label && <Form.Label htmlFor={props.id}>{label}</Form.Label>}
      <Form.Control {...props} isInvalid={!!error} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </div>
  );
}
