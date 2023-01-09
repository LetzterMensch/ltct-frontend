import { Chart as ChartJS, registerables } from "chart.js";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { Spinner } from "../components";
import { client } from "../services/axios";
ChartJS.register(...registerables);
function DashboardView() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const bestSeller = await (await client.get("/static/best-seller")).data;
      const worstSeller = await (await client.get("/static/worst-seller")).data;
      const response = { bestSeller, worstSeller };
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  return loading ? (
    <div className="flex h-full justify-center items-center">
      <Spinner />
    </div>
  ) : error ? (
    <div className="flex h-full justify-center items-center">
      <p className="text-4xl">😢 Có lỗi xảy ra khi lấy dữ liệu</p>
    </div>
  ) : (
    <div className="p-8">
      <div className="w-full flex">
        <div className="w-1/2">
          <Chart
            options={{
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Mặt hàng bán chạy",
                },
              },
            }}
            type="bar"
            data={{
              labels: data.bestSeller.map((item) => item.productId),
              datasets: [
                {
                  type: "bar",
                  label: "Số lượng xuất",
                  data: data.bestSeller.map((item) => item.sum),
                  backgroundColor: "rgba(34, 197, 94, 0.5)",
                },
              ],
            }}
          />
        </div>
        <div className="w-1/2">
          <Chart
            options={{
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Mặt hàng bán ế",
                },
              },
            }}
            type="bar"
            data={{
              labels: data.worstSeller.map((item) => item.productId),
              datasets: [
                {
                  type: "bar",
                  label: "Số lượng xuất",
                  data: data.worstSeller.map((item) => item.sum),
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default DashboardView;