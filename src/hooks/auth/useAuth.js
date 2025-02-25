import { useEffect, useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token", "id"]);
  const { token, id } = cookies;
  const navigate = useNavigate();

  const { decodedToken } = useMemo(() => {
    if (!token) return { decodedToken: null };

    try {
      const tokenString = token.startsWith("Bearer ")
        ? token.substring(7)
        : token;
      const decoded = jwtDecode(tokenString);
      return { decodedToken: decoded };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { decodedToken: null };
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Token"] = token;
    }
  }, [token]);

  useEffect(() => {
    console.log("Decoded Token ID:", decodedToken?.id);
    console.log("Cookie ID:", id);

    if (!decodedToken?.id || decodedToken.id !== id) {
      console.warn("Invalid token or mismatched ID. Removing cookies...");
      removeCookie("token", { path: "/" });
      removeCookie("id", { path: "/" });
      navigate("/");
      setLoading(false);
      setIsAuthed(false);
    } else {
      setLoading(false);
      setIsAuthed(true);
    }
  }, [decodedToken?.id, id, navigate, removeCookie, token]);

  return { loading, isAuthed };
}
