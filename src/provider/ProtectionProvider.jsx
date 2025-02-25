import { useNavigate } from "react-router";
import { useEffect } from "react";
import useAuth from "../hooks/auth/useAuth";

function ProtectionProvider({ children }) {
  const navigate = useNavigate();

  const { loading, isAuthed } = useAuth();

  console.log(isAuthed);
  

  useEffect(() => {
    if (!loading && !isAuthed) {
      navigate("/");
    }
  }, [isAuthed, loading, navigate]);

  if (loading) return null;

  return <>{isAuthed ? children : null}</>;
}

export default ProtectionProvider;
