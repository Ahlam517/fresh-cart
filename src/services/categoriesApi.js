import axiosInstance from "../utils/axiosInstance";

export async function getCategories() {
  try {
    const res = await axiosInstance.get("categories");
    return res.data?.data;
  } catch (error) {
    console.error("Error while fetching categories => ", error);
  }
}
