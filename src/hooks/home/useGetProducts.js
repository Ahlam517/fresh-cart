import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productsApi";

export default function useGetProducts() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
