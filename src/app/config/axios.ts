import axios from "axios";
import { API_URL } from "../constants/app.constants";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
});

export default api;
