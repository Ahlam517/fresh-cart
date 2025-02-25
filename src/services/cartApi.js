import axiosInstance from "../utils/axiosInstance";

export async function getCart() {
  try {
    const res = await axiosInstance.get("cart");
    return res.data?.data;
  } catch (error) {
    console.error("Error while fetching cart => ", error);
  }
}
