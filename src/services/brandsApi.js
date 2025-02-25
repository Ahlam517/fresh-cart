import axiosInstance from "../utils/axiosInstance";

export async function getBrands() {
  try {
    const res = await axiosInstance.get("brands");
    return res?.data;

  } catch (error) {
    console.error("Error featching brands => ", error);
  }
}
