import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`,
  },
});

export const getUserGoals = () =>
  axios.get(`${BASE_URL}/goals`, authHeader()).then(res => res.data);

export const addGoal = (goal) =>
  axios.post(`${BASE_URL}/goals`, goal, authHeader()).then(res => res.data);

export const deleteGoal = (payload) =>
  axios.delete(`${BASE_URL}/goals`, { data: payload, ...authHeader() })
    .then(res => res.data);

