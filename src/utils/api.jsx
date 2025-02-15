import axios from "axios";



const API = axios.create({
  // baseURL: "http://localhost:8800/",   
  // baseURL: "https://lebon-backend.onrender.com/", 
  baseURL: import.meta.env.VITE_BACKEND_URL, 
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const adminPhoneNumber = import.meta.env.VITE_ADMIN_PHONE_NUMBER;

export default API;
