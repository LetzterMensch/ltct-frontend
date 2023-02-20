/* eslint-disable no-unused-vars */
import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { client } from "../services/axios";


const BarChart = () => {
  const [data, setData] = useState();
  const [label, setLabel] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const getData = await client.get(`/static/worst-seller`);
      let tmpData = [], tmpLabel = [];
      for (let i = 0; i < getData.data.length; i++) {
        tmpData[i] = getData.data[i].sum;
        tmpLabel[i] = getData.data[i].itemId;
      }
      setData(tmpData);
      setLabel(tmpLabel);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Bar
        data={{
          labels: label,
          datasets: [
            {
              label: "# of items sold",
              data: data,
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
