import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api",
});

const clientP01 = axios.create({
  baseURL: "https://p01-product-api-production.up.railway.app/api",
});

export { client, clientP01 };
