import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8800/", 
  baseURL: "https://lebon-backend.onrender.com/", 
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
