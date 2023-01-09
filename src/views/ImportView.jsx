import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Spinner } from "../components";
import { client } from "../services/axios";

const ImportView = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { count, data } = await (
        await client.get(`/import?status=${status}&offset=${(page - 1) * 10}`)
      ).data;
      setData(data);
      setMaxPages(Math.ceil(count / 10));
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (status, historyId) => {
    setLoading(true);
    try {
      await client.patch(`/import/${historyId}`, {
        status,
      });
      const arr = data.map((item) => {
        if (item.historyId === historyId) {
          item.status = status;
        }
        return item;
      });
      setData(arr);
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, [page, status]);

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
        <div className="mb-4">
          <label htmlFor="">Trạng thái: </label>
          <select
            className="bg-slate-50 border rounded-lg border-slate-300 px-4 py-3 appearance-none focus:outline-none"
            name="status"
            id=""
            value={status}
            onChange={(e) => setStatus(e.currentTarget.value)}
          >
            <option value="" defaultChecked>
              Tất cả
            </option>
            <option value="ACCEPTED">Đồng ý</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="REJECTED">Từ chối</option>
          </select>
        </div>
        <div className="text-center text-4xl py-4 font-bold">Nhập Kho</div>
        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="border-collapse w-full text-sm text-left text-gray-500 border border-slate-300">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Mã
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Ngày lập đơn
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Ngày duyệt đơn
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Trạng thái
                </th>
                <th className="py-3 px-6 text-center border border-slate-300">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 ? (
                data.map((item, index) => (
                  <tr className="bg-white hover:bg-slate-100" key={index}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap border border-slate-300"
                    >
                      {item.historyId}
                    </th>
                    <td className="py-4 px-6 border border-slate-300">
                      {dayjs(dayjs(item.createdAt)).format(
                        "H:mm ngày DD/MM/YYYY"
                      )}
                    </td>
                    <td className="py-4 px-6 border border-slate-300">
                      {dayjs(dayjs(item.updatedAt)).format(
                        "H:mm ngày DD/MM/YYYY"
                      )}
                    </td>
                    <td className="py-4 px-6 border border-slate-300">
                      <div
                        className={`w-fit mx-auto p-2 rounded-lg
                            ${
                              item.status === "ACCEPTED"
                                ? "bg-green-300"
                                : item.status === "REJECTED"
                                ? "bg-red-300"
                                : item.status === "PENDING"
                                ? "bg-yellow-300"
                                : ""
                            }`}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="py-4 px-6 border border-slate-300 text-center">
                      <Link
                        className={`p-2 rounded-lg bg-blue-300 text-black mr-2`}
                        to={`/detail/${item.historyId}`}
                      >
                        Xem
                      </Link>
                      {item.status === "PENDING" && (
                        <>
                          <button
                            onClick={() =>
                              handleImport("ACCEPTED", item.historyId)
                            }
                            className={`p-2 rounded-lg bg-green-300 text-black mr-2`}
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() =>
                              handleImport("REJECTED", item.historyId)
                            }
                            className={`p-2 rounded-lg bg-red-300 text-black`}
                          >
                            Từ chối
                          </button>
                        </>
                      )}
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
        <div className="mt-4">
          <Pagination page={page} setPage={setPage} maxPages={maxPages} />
        </div>
      </div>
    </div> // end
  );
};

export default ImportView;
