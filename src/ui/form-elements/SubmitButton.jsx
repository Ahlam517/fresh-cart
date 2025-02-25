export default function SubmitButton({ name, loading }) {
  return (
    <button
      type="submit"
      style={{ opacity: loading ? 0.5 : 1 }}
      disabled={loading}
    >
      {name}
    </button>
  );
}
