import { useEffect, useState } from "react";

// INTERFACE
interface Props {
  loading: boolean;
  data: any[];
  onChange?: (params: Record<string, any>) => void;
  totalPages: number;
  pageSize?: any;
  next?: string | null;
  previous?: string | null;
  children?: React.ReactNode;
}

// CODE
export default function Pagination({
  loading,
  data,
  totalPages,
  pageSize,
  next,
  previous,
  onChange,
}: Props) {
  // STATES
  const [rowsPerPage, setRowsPerPage] = useState(pageSize?.pageSize);
  const [page, setPage] = useState(pageSize?.page || 1);
  const [pageOption, setPageOption] = useState(pageSize?.pageOption || 1);

  return (
    <>
      {!loading && data.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <label htmlFor="rows" className="text-sm text-white">
              Rows per page:
            </label>

            <select
              id="rows"
              value={rowsPerPage}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                const newPage = totalPages / newSize < newSize ? 1 : page;

                setRowsPerPage(newSize);
                setPage(1);
                console.log(newSize);

                onChange?.({
                  page: newPage,
                  pageSize: newSize || 10,
                });
              }}
              className="bg-gray-700 text-white rounded px-2 py-1 cursor-pointer hover:bg-gray-600"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <p className="text-white">
              {`Showing ${page} to ${
                rowsPerPage || totalPages
              } of ${totalPages} entries`}
            </p>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // setPage((prev) => Math.max(prev - 1, 1));

                onChange?.({
                  linkUrl: previous || 10,
                });
              }}
              disabled={!previous}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(pageOption)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  onChange?.({
                    page: i + 1,
                    pageSize: rowsPerPage || 10,
                  });
                }}
                className={`px-3 py-1 rounded cursor-pointer transition ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => {
                // setPage((prev) => Math.min(prev + 1, totalPages));
                onChange?.({
                  linkUrl: next,
                });
              }}
              disabled={!next}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
