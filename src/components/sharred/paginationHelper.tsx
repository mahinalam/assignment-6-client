import React from 'react';

interface IProps {
  page: number;
  setPage: any;
  totalPages: number;
}

const PaginationHelper = ({ page, setPage, totalPages }: IProps) => {
  return (
    <div className="flex  justify-center mt-8">
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => {
            setPage((prev: number) => prev - 1);
            // setLimit(1);
          }}
          disabled={page <= 1}
          className={`px-4 py-2 text-sm rounded-md transition ${
            page <= 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border hover:bg-gray-100'
          }`}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md">
          {page}
        </span>
        <button
          onClick={() => {
            setPage((prev: number) => prev + 1);
            // setLimit(1);
          }}
          disabled={page >= totalPages}
          className={`px-4 py-2 text-sm rounded-md transition ${
            page >= totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationHelper;
