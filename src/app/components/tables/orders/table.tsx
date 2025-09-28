"use client";

import { useState } from "react";
import { FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { Orders } from "./types/types";

const clients: Orders[] = [
  {
    id: 1,
    address: "Jl. Sudirman No. 123, Jakarta",
    customer_name: "Budi Santoso",
    email: "budi@example.com",
    order_date: "2025-09-20",
    order_number: "ORD-20250920-001",
    payment_date: "2025-09-21",
    payment_status: 1,
    payment_type: 2,
    phone_number: "081234567890",
    shipment: 1,
    status_order: "On Shipping",
    total_harga: 250000,
    total_order: 2,
  },
  {
    id: 2,
    address: "Jl. Malioboro No. 45, Yogyakarta",
    customer_name: "Siti Aminah",
    email: "siti@example.com",
    order_date: "2025-09-19",
    order_number: "ORD-20250919-002",
    payment_date: null,
    payment_status: 0,
    payment_type: 1,
    phone_number: "081987654321",
    shipment: 0,
    status_order: "Pending",
    total_harga: 500000,
    total_order: 5,
  },
  {
    id: 3,
    address: "Jl. Asia Afrika No. 88, Bandung",
    customer_name: "Andi Wijaya",
    email: "andi@example.com",
    order_date: "2025-09-18",
    order_number: "ORD-20250918-003",
    payment_date: "2025-09-18",
    payment_status: 1,
    payment_type: 3,
    phone_number: "085612345678",
    shipment: 2,
    status_order: "Delivered",
    total_harga: 1200000,
    total_order: 1,
  },
  {
    id: 4,
    address: "Jl. Diponegoro No. 55, Surabaya",
    customer_name: "Rahmat Hidayat",
    email: "rahmat@example.com",
    order_date: "2025-09-17",
    order_number: "ORD-20250917-004",
    payment_date: "2025-09-18",
    payment_status: 1,
    payment_type: 2,
    phone_number: "082134567890",
    shipment: 1,
    status_order: "Cancel",
    total_harga: 750000,
    total_order: 3,
  },
  {
    id: 5,
    address: "Jl. Gajah Mada No. 12, Medan",
    customer_name: "Maria Ulfa",
    email: "maria@example.com",
    order_date: "2025-09-16",
    order_number: "ORD-20250916-005",
    payment_date: null,
    payment_status: 0,
    payment_type: 1,
    phone_number: "081345678912",
    shipment: 0,
    status_order: "Pending",
    total_harga: 980000,
    total_order: 4,
  },
  {
    id: 6,
    address: "Jl. Pemuda No. 30, Semarang",
    customer_name: "Ahmad Fauzi",
    email: "ahmad@example.com",
    order_date: "2025-09-15",
    order_number: "ORD-20250915-006",
    payment_date: "2025-09-15",
    payment_status: 1,
    payment_type: 3,
    phone_number: "085798765432",
    shipment: 2,
    status_order: "Delivered",
    total_harga: 1350000,
    total_order: 6,
  },
  {
    id: 7,
    address: "Jl. Veteran No. 88, Malang",
    customer_name: "Nur Aini",
    email: "nuraini@example.com",
    order_date: "2025-09-14",
    order_number: "ORD-20250914-007",
    payment_date: null,
    payment_status: 0,
    payment_type: 2,
    phone_number: "081245678900",
    shipment: 0,
    status_order: "Pending",
    total_harga: 420000,
    total_order: 2,
  },
  {
    id: 8,
    address: "Jl. Ahmad Yani No. 20, Makassar",
    customer_name: "Hendra Gunawan",
    email: "hendra@example.com",
    order_date: "2025-09-13",
    order_number: "ORD-20250913-008",
    payment_date: "2025-09-14",
    payment_status: 1,
    payment_type: 1,
    phone_number: "082134567800",
    shipment: 1,
    status_order: "On Shipping",
    total_harga: 670000,
    total_order: 3,
  },
  {
    id: 9,
    address: "Jl. Kartini No. 50, Denpasar",
    customer_name: "Putri Maharani",
    email: "putri@example.com",
    order_date: "2025-09-12",
    order_number: "ORD-20250912-009",
    payment_date: "2025-09-12",
    payment_status: 1,
    payment_type: 2,
    phone_number: "081356789012",
    shipment: 2,
    status_order: "Delivered",
    total_harga: 890000,
    total_order: 5,
  },
  {
    id: 10,
    address: "Jl. Merdeka No. 77, Palembang",
    customer_name: "Dewi Lestari",
    email: "dewi@example.com",
    order_date: "2025-09-11",
    order_number: "ORD-20250911-010",
    payment_date: "2025-09-11",
    payment_status: 1,
    payment_type: 3,
    phone_number: "081478901234",
    shipment: 2,
    status_order: "Delivered",
    total_harga: 1500000,
    total_order: 7,
  },
];

export default function TableOrders() {
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
            <th className="py-3 px-4 text-left">Order No.</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Payment Date</th>
            <th className="py-3 px-4 text-left">Status</th>
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
                <p className="font-bold">{c.order_number}</p>
              </td>
              <td className="py-3 px-4">
                <p className="font-semibold">{c.customer_name}</p>
              </td>
              <td className="py-3 px-4">{c.address}</td>
              <td className="py-3 px-4">{c.email}</td>
              <td className="py-3 px-4">{c.order_date}</td>
              <td className="py-3 px-4">{c.payment_date}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded font-semibold ${
                    c.status_order === "Delivered"
                      ? "bg-green-600 text-white"
                      : c.status_order === "On Shipping"
                      ? "bg-orange-500 text-white"
                      : c.status_order === "Pending"
                      ? "bg-sky-300 text-black"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {c.status_order}
                </span>
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
