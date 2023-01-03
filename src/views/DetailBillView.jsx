import React, {} from "react";

const fake = [
    {
      "idItem" : 1,
      "createdAt" :  "2012-10-15T21:26:17Z",
      "quantity": "12",
      "status": "GOOD",
      "packingStatus": "PENDING"
    }
];

export const DetailBillView = () => {
    var listDetail = fake;
    return (
        <div>
            <div className="text-center text-4xl py-4 font-bold">Chi tiết đơn hàng <span>ID: 5</span></div>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                    <th scope="col" className="py-3 px-6">
                        Id_item
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Ngày lập đơn
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Số lượng
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Chất lượng
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Tình trạng đóng gói
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {listDetail.map((item, index) => (
                        <tr className="bg-white border-b" key={index}>
                            <th
                                scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                            >
                                {item.idItem}
                            </th>
                            <td className="py-4 px-6">{item.createdAt}</td>
                            <td className="py-4 px-6">{item.quantity}</td>
                            <td className="py-4 px-6">{item.status}</td>
                            <td className="py-4 px-6">
                                <div className="px-4 py-2 text-green-800 font-semibold rounded-xl bg-green-400 w-fit">
                                    {item.packingStatus}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}