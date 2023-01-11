import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "tabler-icons-react";
import { Spinner } from "../components";
import { client } from "../services/axios";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemId = location.pathname.split('/')[2];

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchData(itemId);
  }, []);
  const fetchData = async (id) => {
    setLoading(true);
    try {
      const data = await client.get(`/product/${id}`);
      console.log(data.data);
      setData(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };


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
        <div className="text-center text-4xl py-4 font-bold">Các mặt hàng của sản phẩm ID: {itemId}</div>
        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Mã mặt hàng
                </th>
                <th scope="col" className="py-3 px-6">
                  Mã sản phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Số mặt hàng
                </th>
                <th scope="col" className="py-3 px-6">
                  Ảnh
                </th>
              </tr>
            </thead>
            <tbody>
              {data.sub_products?.length !== 0 ? (
                data.sub_products?.map((item, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap hover:cursor-pointer"
                      onClick={() => {
                        navigate('/item/' + item.id)
                      }}
                    >
                      {item.id}
                    </th>
                    <td className="py-4 px-6">
                      {item.size.name}
                    </td>
                    <td className="py-4 px-6">
                      {item.color.name}
                    </td>
                    <td className="py-4 px-6">
                      <img src={item.image_url} alt="" height="50px" width="50px"/>
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
    </div> // end
  );
};

export default Product;
