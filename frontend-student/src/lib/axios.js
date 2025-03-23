import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

export const registerUser = (endpoint, data) =>
  API.post(`/${endpoint}/register`, data);
export const loginUser = (endpoint, data) =>
  API.post(`/${endpoint}/login`, data);
