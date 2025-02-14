import { AxiosAdapter } from "../adapters/http/axios.adapter";

export const apiChatFetcher = new AxiosAdapter({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});