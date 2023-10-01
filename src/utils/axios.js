import axios from "axios";
import { API } from "./API.js";

export const axiosOpen = axios.create({
  baseURL: API,
});
