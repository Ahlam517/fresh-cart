import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartApi";

export default function useGetCart() {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error, refetch };
}
