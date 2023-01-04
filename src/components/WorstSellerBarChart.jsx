/* eslint-disable no-unused-vars */
import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { client } from "../services/axios";

let chartLabel = [];
let chartData = [];
const BarChart = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await client.get(`/static/worst-seller`);
      console.log("Hello fetch Data.data");
      console.log(data.data);
      console.log("data");
      console.log(data);
      if (chartData.length != 10) {
        for (let i = 0; i < 10; i++) {
          chartData.push(data.data[i].sum);
          chartLabel.push(data.data[i].itemId);
        }
      } else {
        chartData.splice(0, chartData.length);
        chartLabel.splice(0, chartLabel.length);
        for (let i = 0; i < 10; i++) {
          chartData.push(data.data[i].sum);
          chartLabel.push(data.data[i].itemId);
        }
      }
      // console.log("chart data");
      // console.log(chartData);
      // console.log(Array.isArray(chartData))
      // console.log("chart label");
      // console.log(chartLabel)
      setData(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Hello - use effect");
    console.log(data);
    console.log("chart data 2");
    console.log(chartData);
  }, []);

  return (
    <div>
      <Bar
        data={{
          labels: chartLabel,
          datasets: [
            {
              label: "# of items sold",
              data: chartData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(163, 159, 64, 0.2)",
                "rgba(75, 159, 64, 0.2)",
                "rgba(54, 159, 64, 0.2)",
                "rgba(200, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(163, 159, 64, 1)",
                "rgba(75, 159, 64, 1)",
                "rgba(54, 159, 64, 1)",
                "rgba(200, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
