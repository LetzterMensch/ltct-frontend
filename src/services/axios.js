import axios from "axios";

const client = axios.create({
  baseURL: "https://ltct-warehouse-backend.onrender.com/api",
});

export { client };
