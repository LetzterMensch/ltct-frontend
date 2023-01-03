import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/vi";
import { client } from "../services/axios";

dayjs.locale("vi");
dayjs.extend(calendar);

function ImportView() {
  const [defaultData, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const defaultData = await client.get('/import');
      setData(defaultData.data);
      console.log(defaultData.data);
    }
    getData();
  }, []);

  return (
    <div className="p-8">
      <div className="bg-white flex flex-col rounded-lg p-4">
        <h2 className="text-center font-medium mb-4">
          Danh sách các đơn nhập đã thực hiện
        </h2>
        <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Ngày lập đơn
              </th>
              <th scope="col" className="py-3 px-6">
                Tổng mặt hàng
              </th>
              <th scope="col" className="py-3 px-6">
                Trạng thái
              </th>
              <th scope="col" className="py-3 px-6">
                Tình trạng đóng gói
              </th>
            </tr>
          </thead>
          <tbody>
            {defaultData.map((item, index) => (
              <tr className="bg-white border-b hover:cursor-pointer" key={index} 
                onClick={() => viewDetail(item.historyId)}
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.historyId}
                </th>
                <td className="py-4 px-6">{item.createdAt}</td>
                <td className="py-4 px-6">2</td>
                <td className="py-4 px-6">
                  <div className="px-4 py-2 text-blue-800 rounded-xl bg-yellow-300 w-fit">
                    {item.status}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="px-4 py-2 text-green-800 font-semibold rounded-xl bg-green-400 w-fit">
                    {!item.packingStatus && "PENDING"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default ImportView;
