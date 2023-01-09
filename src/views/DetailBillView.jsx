import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "../components";
import { client, clientP01 } from "../services/axios";

export const DetailBillView = () => {
  const location = useLocation();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const historyId = location.pathname.split("/")[2];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await (await client.get(`/history/${historyId}`)).data;
      const arr = { ...response };
      arr.HistoryItem = await Promise.all(
        response?.HistoryItem?.map(async (item) => {
          const response = await (
            await clientP01.get(`/products/${item.item.productId}`)
          ).data;
          const responseTwo = await (
            await clientP01.get(`/sub-products/${item.itemId}`)
          ).data;
          item.name = response.data?.name;
          if (responseTwo.data) {
            item.subName = `Màu ${responseTwo.data?.color.name} Size ${responseTwo.data?.size.name}`;
          }
          return item;
        })
      );
      setData(arr);
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
          <table className="border-collapse w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Tên sản phẩm
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Tên vật phẩm
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Số lượng
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Trạng thái hàng
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 ? (
                data.HistoryItem.map((item, index) => (
                  <tr className="bg-white hover:bg-slate-100" key={index}>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      {item.name || item.item?.productId}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      {item.subName || item.itemId}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300">
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
                <tr>
                  <th
                    colSpan={5}
                    className="w-full text-slate-300 p-4 border border-slate-300 text-center"
                  >
                    <p className="text-2xl text-slate-400 py-10">
                      Chưa có dữ liệu 😎
                    </p>
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
