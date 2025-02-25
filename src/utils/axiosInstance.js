import axios from "axios";

axios.defaults.baseURL = "https://ecommerce.routemisr.com/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInstance = axios.create();

export default axiosInstance;
