import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mỗi 1 itemId có 1 cái này 
const Product = () => {
  const navigate = useNavigate();
  const product = {
    "itemId": 1,
    "productId": 2,
    "productName": "Iphone 12",
    "goodQuantity": 12,
    "badQuantity" : 11,
  };
  const [goodQuantity, setGood] = useState(product.goodQuantity);
  const [badQuantity, setBad] = useState(product.badQuantity);
  const total = product.goodQuantity + product.badQuantity;

  function updateGoodProduct(number) {
    if (number > product.goodQuantity) number = product.goodQuantity;
    if (number < 0) number = 0;
    console.log(number);
    setGood(number);
    setBad(total - number);
  }

  function updateBadProduct(number) {
    if (number > total) number = total;
    if (number < 0) number = 0;
    setBad(number);
    setGood(total - number);
  }

  function update() {
    console.log("IN");
    // Thao tác với bên backend cập nhật số liệu 
    navigate('/products');
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
          <tr className="bg-white border-b" 
          >
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
            >
              {product.itemId}
            </th>
            <td className="py-4 px-6">{product.productId}</td>
            <td className="py-4 px-6">{product.productName}</td>
            <td className="py-4 px-6">
              <input type="number" min={0} max={product.goodQuantity} value={goodQuantity} onChange={(event) => updateGoodProduct(event.target.value)}
                className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </td>
            <td className="py-4 px-6">
              <input type="number" min={0} max={product.goodQuantity + product.badQuantity} value={badQuantity} onChange={(event) => updateBadProduct(event.target.value)}
                className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </td>
            <td className="py-4 px-6">{product.goodQuantity + product.badQuantity}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center">
        <button className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg px-5 py-2.5 text-lg mt-4"
          onClick={() => update()}
        >
          Chỉnh sửa thông tin sản phẩm
        </button>
      </div>
    </div>
  </div>
  );
}

export default Product;