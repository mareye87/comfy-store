import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationManyPages = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
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
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-xs md:btn-sm border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));
    // dots
    if (page > 2) {
      pageButtons.push(
        <button
          key={"dots-1"}
          className="btn btn-xs md:btn-sm border-none join-item"
        >
          ...
        </button>
      );
    }
    //current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    // dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          key={"dots-2"}
          className="btn btn-xs md:btn-sm border-none join-item"
        >
          ...
        </button>
      );
    }

    //last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <button
        className="btn btn-xs sm:btn-sm join-item"
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = pageCount;
          handlePageChange(prevPage);
        }}
      >
        Prev
      </button>
      {renderPageButtons()}
      <button
        className="btn btn-xs sm:btn-sm join-item"
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

export default PaginationManyPages;
