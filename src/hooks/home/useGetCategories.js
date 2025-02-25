import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoriesApi";

export default function useGetCategories() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
