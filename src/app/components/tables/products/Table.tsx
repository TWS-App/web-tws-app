"use client";

import { useState } from "react";
import { FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import type { Client } from "./types/types";

const clients: Client[] = [
  {
    id: 1,
    name: "Chandler Jacobi",
    code: "Direct Security Executive",
    price: 989.4,
    status: "primary",
    date: "2025-09-20",
    discount: 0,
  },
  {
    id: 2,
    name: "Monserrat Marquardt",
    code: "Forward Accountability Producer",
    price: 471.44,
    status: "danger",
    date: "2025-09-19",
    discount: 0,
  },
  {
    id: 3,
    name: "Lonie Wyman",
    code: "Legacy Program Director",
    price: 934.24,
    status: "success",
    date: "2025-09-18",
    discount: 0,
  },
  {
    id: 4,
    name: "Corine Abernathy",
    code: "Chief Factors Planner",
    price: 351.28,
    status: "warning",
    date: "2025-09-17",
  },
  {
    id: 5,
    name: "Lorenz Botsford",
    code: "Central Accountability Developer",
    price: 355.3,
    status: "neutral",
    date: "2025-09-16",
  },
  {
    id: 6,
    name: "Everette Botsford",
    code: "Product Group Architect",
    price: 525.42,
    status: "success",
    date: "2025-09-15",
  },
  {
    id: 7,
    name: "Marilou Beahan",
    code: "Future Security Planner",
    price: 414.99,
    status: "success",
    date: "2025-09-14",
  },
  {
    id: 8,
    name: "Ceasar Sauer",
    code: "Direct Brand Specialist",
    price: 488.0,
    status: "primary",
    date: "2025-09-13",
  },
  {
    id: 9,
    name: "Rae McDermott",
    code: "Lead Branding Engineer",
    price: 502.69,
    status: "danger",
    date: "2025-09-12",
  },
  {
    id: 10,
    name: "Mable Steuber",
    code: "Chief Accountability Designer",
    price: 600.0,
    status: "neutral",
    date: "2025-09-11",
  },
];

export default function TableProducts() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(clients.length / rowsPerPage);

  const paginatedClients = clients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (id: number) => {
    alert(`Edit client with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this client?")) {
      alert(`Deleted client with ID: ${id}`);
    }
  };

  const handleRefresh = () => {
    alert("Table data refreshed!");
  };

  const statusColors: Record<Client["status"], string> = {
    primary: "bg-purple-600 text-white",
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-orange-500 text-white",
    neutral: "bg-gray-500 text-white",
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 text-white">
      {/* Header with Refresh */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Products</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
        >
          <FiRefreshCcw /> Refresh
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Categories</th>
            <th className="py-3 px-4 text-left">Discount</th>
            <th className="py-3 px-4 text-left">Last Updated</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-700 hover:bg-gray-700/50"
            >
              <td className="py-3 px-4">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-gray-400 text-xs">{c.code}</p>
                </div>
              </td>
              <td className="py-3 px-4">Rp. {c.price?.toFixed(2)}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    statusColors[c.status]
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td className="py-3 px-4">Rp. {c.discount?.toFixed(2) || 0}</td>
              <td className="py-3 px-4">{c.date}</td>
              <td className="py-3 px-4 text-center flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(c.id)}
                  className="text-blue-400 hover:text-blue-600 cursor-pointer"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                >
                  <FiTrash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination + Rows per page */}
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

        {/* Pagination */}
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
    </div>
  );
}
