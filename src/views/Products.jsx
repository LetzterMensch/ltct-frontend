import React from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const list = [{
    "itemId": 1,
    "productId": 2,
    "productName": "Iphone 12",
    "goodQuantity": 12,
    "badQuantity" : 11,
  }];

  function updateProduct(id) {
    console.log(id);
    navigate('/product/' + id);
  }

  return (
      <div>
    <div className="text-center text-4xl py-4 font-bold">Các mặt hàng trong kho</div>
    {/* Filter */}
    <div className="filter flex justify-between items-center p-4">
      <div className="select">
        <select
          name=""
          id=""
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
        >
          <option value="">Ngày hôm qua</option>
          <option value="">Tuần này</option>
          <option value="">Tháng này</option>
        </select>
      </div>
      <div className="search">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tìm kiếm"
          />
        </div>
      </div>
    </div>
    {/* Table */}
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Item ID
            </th>
            <th scope="col" className="py-3 px-6">
              Product ID
            </th>
            <th scope="col" className="py-3 px-6">
              Tên sản phẩm
            </th>
            <th scope="col" className="py-3 px-6">
              Tổng mặt hàng tốt
            </th>
            <th scope="col" className="py-3 px-6">
              Tổng mặt hàng xấu
            </th>
            <th scope="col" className="py-3 px-6">
              Tổng mặt hàng
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr className="bg-white border-b hover:cursor-pointer" key={index}
              onClick={() => updateProduct(item.itemId)}
            >
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                {item.itemId}
              </th>
              <td className="py-4 px-6">{item.productId}</td>
              <td className="py-4 px-6">{item.productName}</td>
              <td className="py-4 px-6">{item.goodQuantity}</td>
              <td className="py-4 px-6">{item.badQuantity}</td>
              <td className="py-4 px-6">{item.goodQuantity + item.badQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default Products;