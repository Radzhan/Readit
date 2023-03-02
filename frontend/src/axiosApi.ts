import axios from "axios";
import { BaseUrl } from "./constants";

const axiosApi = axios.create({
  baseURL: BaseUrl,
});

export default axiosApi;
