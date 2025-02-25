import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/productsApi";
import { useParams } from "react-router";

export default function useGetProduct() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
