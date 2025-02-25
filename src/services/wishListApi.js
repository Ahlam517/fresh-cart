import axiosInstance from "../utils/axiosInstance";

export async function getWishList() {
  try {
    const res = await axiosInstance.get("wishlist");
    return res.data?.data;
  } catch (error) {
    console.error("Error while fetching wishlist => ", error);
  }
}
