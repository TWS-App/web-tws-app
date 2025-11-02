"use client";

// REACT Components
import { useEffect, useState } from "react";

// Antd Components
import { Modal, Spin, Tabs, Tooltip } from "antd";

// Services
import {
  OrderHeader,
  orderHeaderService,
} from "@/api/services/orders/serviceHeader";

// Antd Components
import { FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { HiViewfinderCircle } from "react-icons/hi2";

// Utils
import { Orders } from "./types/types";

// Page Components
import Pagination from "@/app/components/pagination/pagination";
import ModalViewOrder from "../../modals/orders/modalView";
import ModalEditOrder from "../../modals/orders/modalEdit";
import ModalCategoryProduct from "@/app/components/modals/master/category/modal";

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

// Modals
const { confirm } = Modal;

// CODE
export default function TableOrders() {
  // STATES
  const [data, setData] = useState<OrderHeader[]>([]);
  const [dataEdit, setDataEdit] = useState(null);

  const [orderView, setOrderView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // FETCH DATA
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await orderHeaderService.getAll();

      console.log("Fetch res: ", data);

      if (result?.length > 0) {
        setData(result);
      } else {
        setData([]);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // USEEFFECTS
  useEffect(() => {
    fetchData();
  }, []);

  // Handle Edit
  const handleEdit = (value: any) => {
    setEdit(true);
    setDataEdit(value);
  };

  // ON CHANGE
  const onChangeTabs = (values: any) => {
    console.log(values);

    fetchData()
  };

  // Handle Refresh
  const handleRefresh = () => {
    fetchData();
  };

  // Handle Delete
  const handleView = (value: any) => {
    const _data = value;
    setDataEdit(_data);

    setOrderView(true);
  };

  // Handle Close
  const handleClose = (values: any) => {
    setOrderView(false);
    setEdit(false);

    setDataEdit(null);
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

      <Tabs
        type="card"
        onChange={onChangeTabs}
        defaultActiveKey="product"
        items={[
          {
            key: "product",
            label: "Product",
            children: (
              <div className="relative min-h-[200px]">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
                    <Spin size="large" />
                  </div>
                ) : data.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    No data found.
                  </div>
                ) : (
                  <div className="w-full">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-700 text-gray-300">
                        <tr>
                          <th className="py-3 px-4 text-center">Actions</th>
                          <th className="py-3 px-4 text-left">Order No.</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Address</th>
                          <th className="py-3 px-4 text-left">Email</th>
                          <th className="py-3 px-4 text-left">Phone Nmber</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Payment Date</th>
                          <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((items) => (
                          <tr
                            key={items.id}
                            className="border-b border-gray-700 hover:bg-gray-700/50"
                          >
                            <td className="py-3 px-4 text-center flex justify-center gap-3">
                              <button
                                onClick={() => handleEdit(items)}
                                className="text-blue-400 hover:text-blue-600 cursor-pointer"
                              >
                                <Tooltip title="Edit Orders">
                                  <FiEdit size={16} />
                                </Tooltip>
                              </button>
                              <button
                                onClick={() => handleView(items)}
                                className="text-green-400 hover:text-green-600 cursor-pointer"
                              >
                                <Tooltip title="View Orders">
                                  <HiViewfinderCircle size={20} />
                                </Tooltip>
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-bold">{items?.order_number}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-semibold">
                                {items?.customer_name}
                              </p>
                            </td>
                            <td className="py-3 px-4">{items?.address}</td>
                            <td className="py-3 px-4">{items?.email}</td>
                            <td className="py-3 px-4">{items?.phone_number}</td>
                            <td className="py-3 px-4">{items?.order_date}</td>
                            <td className="py-3 px-4">{items?.payment_date}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded font-semibold ${
                                  items?.status_order === "Delivered"
                                    ? "bg-green-600 text-white"
                                    : items?.status_order === "On Shipping"
                                    ? "bg-orange-500 text-white"
                                    : items?.status_order === "Pending"
                                    ? "bg-sky-300 text-black"
                                    : "bg-red-600 text-white"
                                }`}
                              >
                                {items?.status_order}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      data={data}
                      loading={loading}
                      totalPages={data?.length}
                    />
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "service",
            label: "Service",
            children: (
              <div className="relative min-h-[200px]">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
                    <Spin size="large" />
                  </div>
                ) : data.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    No data found.
                  </div>
                ) : (
                  <div className="w-full">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-700 text-gray-300">
                        <tr>
                          <th className="py-3 px-4 text-center">Actions</th>
                          <th className="py-3 px-4 text-left">Order No.</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Address</th>
                          <th className="py-3 px-4 text-left">Email</th>
                          <th className="py-3 px-4 text-left">Phone Nmber</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Payment Date</th>
                          <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((items) => (
                          <tr
                            key={items.id}
                            className="border-b border-gray-700 hover:bg-gray-700/50"
                          >
                            <td className="py-3 px-4 text-center flex justify-center gap-3">
                              <button
                                onClick={() => handleEdit(items)}
                                className="text-blue-400 hover:text-blue-600 cursor-pointer"
                              >
                                <Tooltip title="Edit Orders">
                                  <FiEdit size={16} />
                                </Tooltip>
                              </button>
                              <button
                                onClick={() => handleView(items)}
                                className="text-green-400 hover:text-green-600 cursor-pointer"
                              >
                                <Tooltip title="View Orders">
                                  <HiViewfinderCircle size={20} />
                                </Tooltip>
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-bold">{items?.order_number}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-semibold">
                                {items?.customer_name}
                              </p>
                            </td>
                            <td className="py-3 px-4">{items?.address}</td>
                            <td className="py-3 px-4">{items?.email}</td>
                            <td className="py-3 px-4">{items?.phone_number}</td>
                            <td className="py-3 px-4">{items?.order_date}</td>
                            <td className="py-3 px-4">{items?.payment_date}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded font-semibold ${
                                  items?.status_order === "Delivered"
                                    ? "bg-green-600 text-white"
                                    : items?.status_order === "On Shipping"
                                    ? "bg-orange-500 text-white"
                                    : items?.status_order === "Pending"
                                    ? "bg-sky-300 text-black"
                                    : "bg-red-600 text-white"
                                }`}
                              >
                                {items?.status_order}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      data={data}
                      loading={loading}
                      totalPages={data?.length}
                    />
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />

      <ModalViewOrder
        isOpen={orderView}
        dataEdit={dataEdit}
        isClose={handleClose}
      />

      <ModalEditOrder isOpen={edit} dataEdit={dataEdit} isClose={handleClose} />
    </div>
  );
}
