"use client";

import { useState } from "react";
import { FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { ProductCategory } from "../types/product";

const clients: ProductCategory[] = [
  {
    id: 1,
    category_name: "Earphone",
    code: "EAR",
    description: null,
  },
  {
    id: 2,
    category_name: "Headset",
    code: "HDS",
    description: null,
  },
  {
    id: 3,
    category_name: "Airpods",
    code: "AIR",
    description: null,
  },
  {
    id: 4,
    category_name: "Handsfree",
    code: "HFR",
    description: null,
  },
];

export default function TableProductCategory() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(clients.length / rowsPerPage);

  const paginatedClients = clients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (id: number) => {
    // alert(`Edit client with ID: ${id}`);
  };

  const handleAdd = () => {
    // alert(`Edit client with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // if (confirm("Are you sure you want to delete this client?")) {
    // alert(`Deleted client with ID: ${id}`);
    // }
  };

  const handleRefresh = () => {
    // alert("Table data refreshed!");
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 text-white">
      {/* Header with Refresh */}
      <div className="flex justify-end items-center mb-4 gap-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 rounded hover:bg-green-500 transition cursor-pointer"
        >
          <BiPlus /> Add New Category
        </button>

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
            <th className="py-3 px-4 text-center">Actions</th>
            <th className="py-3 px-4 text-left">Category Name</th>
            <th className="py-3 px-4 text-left">Code</th>
            <th className="py-3 px-4 text-left">Descriptions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-700 hover:bg-gray-700/50"
            >
              <td className="py-3 px-4 text-center flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(c.id || 0)}
                  className="text-blue-400 hover:text-blue-600 cursor-pointer"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(c.id || 0)}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                >
                  <FiTrash2 size={16} />
                </button>
              </td>
              <td className="py-3 px-4">
                <p className="font-semibold">{c.category_name}</p>
              </td>
              <td className="py-3 px-4">
                <p className="font-bold">{c.code}</p>
              </td>

              <td className="py-3 px-4">{c.description}</td>
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
