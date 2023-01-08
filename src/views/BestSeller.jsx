// eslint-disable-next-line no-unused-vars
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "tabler-icons-react";
import { Spinner } from "../components";
import { client } from "../services/axios";
import BarChart from "../components/BestSellerBarChart";
import "chart.js/auto";

export const BestSeller = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await client.get(`/static/best-seller`);
      console.log(data.data);
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
    console.log("Hello");
  }, []);

  function viewDetailItem(arg) {
    // navigate to view detail item
    navigate(`/detail/${arg}`);
  }

  return loading ? (
    <div className="flex h-full justify-center items-center">
      <Spinner />
    </div>
  ) : error ? (
    <div className="flex h-full justify-center items-center">
      <p className="text-4xl">😢 Có lỗi xảy ra khi lấy dữ liệu</p>
    </div>
  ) : (
    <div className="p-4">
      <div className="bg-white flex flex-col rounded-lg p-4">
        <div className="text-center text-4xl py-4 font-bold">Hàng bán chạy</div>
        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Thứ tự
                </th>
                <th scope="col" className="py-3 px-6">
                  Mã sản phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Mã mặt hàng
                </th>
                <th scope="col" className="py-3 px-6">
                  Đã bán
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 ? (
                data
                  .slice(0)
                  .reverse()
                  .map((item, index) => (
                    <tr className="bg-white border-b" key={index}>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap hover:cursor-pointer"
                        onClick={() => viewDetailItem(item.historyId)}
                      >
                        {index + 1}
                      </th>
                      <td className="py-4 px-6">{item.productId}</td>
                      <td className="py-4 px-6">{item.itemId}</td>
                      <td className="py-4 px-6">{item.sum}</td>
                    </tr>
                  ))
              ) : (
                <span className="col-span-full flex flex-col justify-center items-center text-slate-300 p-4 border border-slate-300">
                  <Box className="my-4" size={96} strokeWidth={1} />
                  <p className="text-2xl text-slate-400">Trống</p>
                </span>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
