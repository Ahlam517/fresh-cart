import axiosInstance from "../utils/axiosInstance";

export async function getProducts() {
  try {
    const res = await axiosInstance.get("products", {
      params: {
        limit: 12,
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Error featching products => ", error);
  }
}


export async function getProduct(id) {
  try {
    const res = await axiosInstance.get(`products/${id}`);
    return res?.data?.data;
  } catch (error) {
    console.error("Error featching product => ", error);
  }
}