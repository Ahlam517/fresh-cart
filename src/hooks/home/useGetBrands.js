import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../services/brandsApi";

export default function useGetBrands() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}
