import { useQuery } from "@tanstack/react-query";
import { getWishList } from "../../services/wishListApi";

export default function useGetWishList() {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishList,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error, refetch };
}
