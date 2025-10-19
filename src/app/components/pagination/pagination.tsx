import { useState } from "react";

// INTERFACE
interface Props {
  loading: boolean;
  data: any[];
  totalPages: number;
  children?: React.ReactNode;
}

// CODE
export default function Pagination({ loading, data, totalPages }: Props) {
  // STATES
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  return (
    <>
      {!loading && data.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <label htmlFor="rows" className="text-sm text-gray-400">
              Rows per page:
            </label>

            <select
              id="rows"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="bg-gray-700 text-white rounded px-2 py-1 cursor-pointer hover:bg-gray-600"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
