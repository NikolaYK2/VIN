import axios from "axios";

export const authInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_APP_URL}`,
});
