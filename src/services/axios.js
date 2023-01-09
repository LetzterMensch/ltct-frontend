import axios from "axios";

const client = axios.create({
  baseURL: "https://ltct-warehouse-backend.onrender.com/api",
});

const clientP01 = axios.create({
  baseURL: "https://p01-product-api-production.up.railway.app/api",
});

export { client, clientP01 };
