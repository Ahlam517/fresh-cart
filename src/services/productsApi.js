import axiosInstance from "../utils/axiosInstance";

export async function getProducts(category, brand, search, page) {
  try {
    const res = await axiosInstance.get("products", {
      params: {
        limit: 12,
        page,
        keyword: category,
        brand,
        search,
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
