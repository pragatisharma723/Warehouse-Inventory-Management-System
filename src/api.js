import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // your Node server
});

export default API;
