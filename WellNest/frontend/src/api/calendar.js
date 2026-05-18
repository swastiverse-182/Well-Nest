import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`,
  },
});

export const fetchEvents = async () => {
  const res = await axios.get(`${BASE}/calendar`, authHeader());
  return res.data;
};

export const createEvent = async (event) => {
  const res = await axios.post(`${BASE}/calendar`, event, authHeader());
  return res.data;
};

export const removeEvent = async (id) => {
  await axios.delete(`${BASE}/calendar/${id}`, authHeader());
};
