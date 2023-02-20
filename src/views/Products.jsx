import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "tabler-icons-react";
import { Spinner } from "../components";
import { client } from "../services/axios";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState({
    open: false,
    title: "title",
    content: "content"
  });

  const list = [{
    "itemId": 1,
    "productId": 2,
    "productName": "Iphone 12",
    "goodQuantity": 12,
    "badQuantity" : 11,
  }];

  function viewDetail(id) {
    console.log(id);
    navigate('/product/' + id);
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      let listProduct = [];
      
      try {
        const response = await axios.get('https://p01-product-api-production.up.railway.app/api/products');
        if (response.status === 200) listProduct = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }

      let showList = [];
      if (listProduct.data?.length > 0){
        await Promise.all(listProduct.data.map(async (item, index) => {
          let product = await client.get('/product/' + item.id);
          showList.push(product.data);
        }));
        console.log(showList);
        setData(showList);
      }
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
    <div className="p-4">
      <div className="bg-white flex flex-col rounded-lg p-4">
        <div className="text-center text-4xl py-4 font-bold">Các mặt hàng trong kho</div>
        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Mã sản phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Tên sản phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Miêu tả
                </th>
                <th scope="col" className="py-3 px-6">
                  Số mặt hàng
                </th>
                <th scope="col" className="py-3 px-6">
                  Số loại mặt hàng
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length !== 0 ? (
                data?.map((item, index) => (
                  <tr className="bg-white border-b" key={item.id}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap hover:cursor-pointer"
                      onClick={() => viewDetail(item.id)}
                    >
                      {item.id}
                    </th>
                    <td className="py-4 px-6">
                      {item.name}
                    </td>
                    <td className="py-4 px-6">
                      {item.description}
                    </td>
                    <td className="py-4 px-6">
                      {item.quantity ?? 0}
                    </td>
                    <td className="py-4 px-6">
                      {item.sub_products?.length}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="col-span-full flex flex-col justify-center items-center text-slate-300 p-4 border border-slate-300">
                    <Box className="my-4" size={96} strokeWidth={1} />
                    <p className="text-2xl text-slate-400">Trống</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal">
        {showModal.open ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">{showModal.title}</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(showModal.open = false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      {showModal.content}
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    {/* <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div> // end
  );
}

export default Products;