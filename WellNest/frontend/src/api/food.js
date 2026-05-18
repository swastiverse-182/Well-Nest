import axios from "axios";

// Use environment-based API URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Get food advice
export const getFoodAdvice = async (query) => {
  const res = await API.get(`/food-advice`, {
    params: { q: query },
  });
  return res.data;
};

