import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-manager-production-de61.up.railway.app",
});

export default API;