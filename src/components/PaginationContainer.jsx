import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathName } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    //create new search params based on 'search'
    // add page number to the search params (to existing query)
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);

    //then navigate user to that path
    // have to convert  'searchParams' to String
    navigate(`?${searchParams.toString()}`);

    console.log(pageNumber);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <button
        className="btn btn-xs sm:btn-md join-item"
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = pageCount;
          handlePageChange(prevPage);
        }}
      >
        Prev
      </button>
      {pages.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            className={`btn btn-xs md:btn-md border-none join-item ${
              pageNumber === page ? "bg-base-300 border-base-300" : ""
            }`}
            onClick={() => {
              handlePageChange(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className="btn btn-xs sm:btn-md join-item"
        onClick={() => {
          let nextPage = page + 1;
          if (nextPage > pageCount) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationContainer;
