import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productsApi";
import { useSearchParams } from "react-router";

export default function useGetProducts() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const { isLoading, data, error } = useQuery({
    queryKey: ["products", category, brand, search, page],
    queryFn: () => getProducts(category, brand, search, page),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
