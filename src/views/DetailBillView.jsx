import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "tabler-icons-react";
import { Spinner } from "../components";
import { client } from "../services/axios";

export const DetailBillView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const historyId = location.pathname.split("/")[2];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await client.get(`/history/${historyId}`);
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

  function viewDetailItem (itemId) {
    // navigate to view detail item
    // 
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
    <div className="p-8">
      <div className="bg-white flex flex-col rounded-lg p-4">
        <h2 className="text-center font-medium text-2xl mb-4">
          Thông tin đơn yêu cầu <i>{historyId}</i>
        </h2>
        <div className="flex flex-row justify-between px-6">
          <div>
            <h3 className="">
              <b>Loại yêu cầu: </b>
              {data.type}
            </h3>
            <h3 className="">
              <b>Trạng thái: </b>
              {data.status}
            </h3>
            <h3 className="">
              <b>Trạng thái đóng gói: </b>
              {data.packingStatus}
            </h3>
          </div>
          <div>
            <h3 className="">
              <b>Ngày tạo: </b>
              {dayjs(dayjs(data.createdAt)).format("H:mm ngày DD/MM/YYYY")}
            </h3>
            <h3 className="">
              <b>Ngày xử lý: </b>
              {dayjs(dayjs(data.updatedAt)).format("H:mm ngày DD/MM/YYYY")}
            </h3>
          </div>
        </div>
        <h2 className="text-center font-bold text-xl mb-4 ">
          Danh sách vật phẩm {data.type}
        </h2>
        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Mã
                </th>
                <th scope="col" className="py-3 px-6">
                  Mã sản phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Mã vật phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Số lượng
                </th>
                <th scope="col" className="py-3 px-6">
                  Trạng thái hàng
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 ? (
                data.HistoryItem.map((item, index) => (
                  <tr
                    className="bg-white border-b"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap hover:cursor-pointer"
                      onClick={() => viewDetailItem(item.itemId)}
                    >
                      {item.historyId}
                    </th>
                    <td className="py-4 px-6">{item.item.productId}</td>
                    <td className="py-4 px-6">{item.itemId}</td>
                    <td className="py-4 px-6">{item.quantity}</td>
                    <td className="py-4 px-6">
                      <p
                        className={`w-fit mx-auto p-2 rounded-lg
                            ${
                              item.status === "GOOD"
                                ? "bg-green-300"
                                : "bg-red-300"
                            }`}
                      >
                        {item.status}
                      </p>
                    </td>
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
