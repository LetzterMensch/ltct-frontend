import React, { useState } from "react";
import BestChar from "../components/BestSellerBarChart";
import Pagination from "../components/Pagination";
import WorstChar from "../components/WorstSellerBarChart";

function DashboardView() {
  let [currentPage, setCurrentPage] = useState(0);
  return (
    <div>
      <div>
        <h2 className="font-4xl text-5xl">Best seller</h2>
        <BestChar />
      </div>
      <div>
        <h2 className="font-4xl text-5xl">Worts seller</h2>
        <WorstChar />
      </div>
      <Pagination page={currentPage} changePage={setCurrentPage}/>
    </div>  
  );
}

export default DashboardView;
