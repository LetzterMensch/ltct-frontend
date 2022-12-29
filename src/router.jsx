import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { client } from "./services/axios";
import { BestSeller } from "./views/BestSeller";
import DashboardView from "./views/DashboardView";
import { DetailBillView } from "./views/DetailBillView";
import ExportView from "./views/ExportView";
import HistoryUpdate from "./views/HistoryUpdate";
import ImportView from "./views/ImportView";
import { WorstSeller } from "./views/WorstSeller";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardView />,
      },
      {
        path: "/import",
        element: <ImportView />,
        loader: async () => {
          try {
            const data = await client.get("/history/import");
            console.log(data.data);
            return data.data;
          } catch (error) {
            console.log(error);
            return "error";
          }
        },
      },
      {
        path: "/export",
        element: <ExportView />,
      },
      {
        path: "/detail",
        element: <DetailBillView />,
      },
      {
        path: "/best-seller",
        element: <BestSeller />,
      },
      {
        path: "/worst-seller",
        element: <WorstSeller />,
      },
      {
        path: "/history-update",
        element: <HistoryUpdate />,
      },
    ],
  },
]);

export default router;
