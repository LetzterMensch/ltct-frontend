import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  BuildingWarehouse,
  Dashboard,
  List,
  PackgeExport,
  PackgeImport,
  User,
} from "tabler-icons-react";

function AppLayout() {
  const { pathname } = useLocation();
  const items = [
    {
      key: "/",
      icon: <Dashboard />,
      label: "Trang chủ",
    },
    {
      key: "/products",
      icon: <List />,
      label: "Các sản phẩm",
    },
    {
      key: "/import",
      icon: <PackgeImport />,
      label: "Nhập kho",
    },
    {
      key: "/export",
      icon: <PackgeExport />,
      label: "Xuất kho",
    },
    {
      key: "/best-seller",
      icon: <PackgeExport />,
      label: "Hàng bán chạy",
    },
    {
      key: "/worst-seller",
      icon: <PackgeExport />,
      label: "Hàng bán ế",
    },
    // {
    //   key: "/history-update",
    //   icon: <PackgeExport />,
    //   label: "Lịch sử cập nhật",
    // },
  ];
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="h-full sticky bg-slate-900 min-w-[240px] px-4">
        <Link
          to="/"
          className="text-slate-200 flex gap-1 flex-row items-center m-4 cursor-pointer select-none"
        >
          <BuildingWarehouse className="h-8 w-8 flex items-center justify-center" />
          <p className="text-2xl flex-1 text-center font-semibold">Warehouse</p>
        </Link>
        <div>
          {items.map((item) => (
            <Link
              to={item.key}
              key={item.key}
              className={`flex flex-row px-2 py-3 gap-2 uppercase rounded-lg ${
                pathname === item.key
                  ? "text-slate-900 bg-slate-100"
                  : "text-slate-300 hover:text-slate-50"
              }`}
            >
              {item.icon}
              <p>{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-full flex flex-col">
        <div className="flex flex-row items-center h-16 px-4 bg-slate-900">
          <Link
            className="flex items-center gap-1 text-slate-200 hover:text-slate-50"
            to={-1}
          >
            <ArrowLeft />
            Quay lại
          </Link>
          <span className="flex-1" />
          <span className="bg-slate-50 rounded-full h-10 w-10 flex items-center justify-center">
            <User />
          </span>
        </div>
        <div className={"bg-slate-100 flex-1 overflow-y-scroll"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
