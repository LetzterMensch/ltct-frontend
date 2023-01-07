import React, { useEffect, useState } from "react";

// truyền tham số changePage để thay đổi state ở cha

/**
 *
 * @param {object} props
 * @param {*} props.setPage
 * @param {number} props.page
 * @param {number} props.maxPages
 * @returns
 */
function Pagination({ page, setPage, maxPages }) {
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  let items = [];
  let leftSide = currentPage - 2;
  leftSide = leftSide <= 0 ? 1 : leftSide;
  let rightSide = currentPage + 2;
  rightSide = rightSide > maxPages ? maxPages : rightSide;
  // for (let number = leftSide; number <= r)
  let active =
    "bg-orange-500 text-white flex items-center justify-center cursor-pointer text-base text-center p-5 h-5 w-5 shadow-lg bg-white m-1 rounded-full";
  let noActive =
    "flex items-center justify-center text-orange-500 cursor-pointer text-base text-center p-5 h-5 w-5 shadow-lg bg-white m-1 rounded-full";
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={number === currentPage ? active : noActive}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </div>
    );
  }

  const firstPage = () => {
    if (currentPage != 1) {
      setCurrentPage(1);
    }
  };

  const lastPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(maxPages);
    }
  };

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center ">
        <div
          className="flex items-center justify-center text-orange-500 cursor-pointer text-xl text-center p-5 h-5 w-5 shadow-lg bg-white m-1 rounded-full"
          onClick={firstPage}
        >
          &lsaquo;&lsaquo;
        </div>
        <div
          className="flex items-center justify-center text-orange-500 cursor-pointer text-xl text-center p-5 h-5 w-5 shadow-lg bg-white m-1 rounded-full"
          onClick={prevPage}
        >
          &lsaquo;
        </div>
        <div className="flex items-center justify-center">{items}</div>
        <div
          className="flex items-center justify-center text-orange-500 cursor-pointer text-xl text-center p-5 h-5 w-5 shadow-lg bg-white m-1 rounded-full"
          onClick={nextPage}
        >
          &rsaquo;
        </div>
        <div
          className="flex items-center justify-center text-orange-500 cursor-pointer text-xl text-center p-5 h-5 w-5 shadow-lg bg-white m-1 rounded-full"
          onClick={lastPage}
        >
          &rsaquo;&rsaquo;
        </div>
      </div>
    </div>
  );
}

export default Pagination;
