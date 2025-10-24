"use client";

// REACT Components
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Services
import api from "@/api/context/config";
import { servicesService } from "@/api/services/service/service";

// Antd Components
import { FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Spin } from "antd";

// Page Components
import Pagination from "../../pagination/pagination";

// Utils
import type { Client } from "./types/types";
import { randomColors } from "@/utils/constans/colors";
import { formatPrice } from "@/utils/function/price";
import { PiCheckCircle, PiXCircle } from "react-icons/pi";

const clients: Client[] = [
  {
    id: 1,
    name: "Chandler Jacobi",
    code: "Direct Security Executive",
    price: 989.4,
    status: "primary",
    date: "2025-09-20",
  },
  {
    id: 2,
    name: "Monserrat Marquardt",
    code: "Forward Accountability Producer",
    price: 471.44,
    status: "danger",
    date: "2025-09-19",
  },
  {
    id: 3,
    name: "Lonie Wyman",
    code: "Legacy Program Director",
    price: 934.24,
    status: "success",
    date: "2025-09-18",
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

// CODE
export default function TableServices() {
  // Route
  const route = useRouter();

  // DATA STATE
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 5,
    next: null,
    previous: null,
  });

  // FETCH DATA
  const fetchData = async (params: any) => {
    setLoading(true);

    try {
      const result = params.linkUrl
        ? await api.get(params.linkUrl).then((res: any) => {
            return res.data;
          })
        : await servicesService.getAll({
            page: params?.page ? params.page : pagination.page,
            page_size: params?.pageSize ? params.pageSize : pagination.pageSize,
          });

      console.log("Fetch res: ", result, params);

      if (result?.results?.length > 0) {
        setData(result.results);
      } else {
        setData([]);
      }

      setPagination({
        total: result?.total ?? 0,
        page: result?.page ?? 1,
        pageSize: result?.page_size ?? 5,
        next: result.links?.next || null,
        previous: result.links?.previous || null,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // USEEFFECTS
  useEffect(() => {
    fetchData({ page: pagination.page, pageSize: pagination.pageSize });
  }, []);

  // Handle Edit
  const handleEdit = (values: any) => {
    console.log(values);

    route.push(`/items/services/edit/${values.id}`);
  };

  const handleDelete = (values: number) => {
    if (confirm("Are you sure you want to delete this client?")) {
      alert(`Deleted client with ID: ${values}`);
    }
  };

  // Handle Refresh
  const handleRefresh = (values: any) => {
    fetchData(values);
  };

  // Get Colors
  const getRandomColor = () => {
    const idx = Math.floor(Math.random() * randomColors.length);
    return randomColors[idx];
  };

  // Fungsi Colors
  const getColorByName = (name: string): string => {
    if (name.toLowerCase().includes("white")) return "default";
    if (name.toLowerCase().includes("black")) return "black";
    if (name.toLowerCase().includes("red")) return "red";
    if (name.toLowerCase().includes("green")) return "green";
    if (name.toLowerCase().includes("blue")) return "blue";
    return getRandomColor(); // fallback random
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 text-white">
      {/* Header with Refresh */}
      <div className="flex justify-end gap-4 items-center mb-4">
        <Link
          href="/items/services/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          <FaPlus /> Add New Service
        </Link>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
        >
          <FiRefreshCcw /> Refresh
        </button>
      </div>

      {/* Table */}
      <div className="relative min-h-[200px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
            <Spin size="large" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No data found.</div>
        ) : (
          <div className="w-full">
            <table className="w-full text-sm">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  {/* <th className="py-3 px-4 text-left">Categories</th> */}
                  <th className="py-3 px-4 text-left">{`Price (Rp)`}</th>
                  <th className="py-3 px-4 text-left">{`Discount (Rp)`}</th>
                  <th className="py-3 px-4 text-left">Last Updated</th>
                  <th className="py-3 px-4 text-left">Ready</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((items: any) => (
                  <tr
                    key={items?.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold">{items?.service_name}</p>
                        <p className="text-gray-400 text-xs">{items?.code}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {formatPrice(items.price)}
                    </td>
                    {/* <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusColors[items?.status]
                        }`}
                      >
                        {items?.status}
                      </span>
                    </td> */}
                    <td className="py-3 px-4 text-right">
                      {formatPrice(items?.discount || 0)}
                    </td>
                    <td className="py-3 px-4">{items?.date}</td>
                    <td className="py-3 px-4 text-center">
                      {items?.is_ready ? (
                        <PiCheckCircle size={24} className="text-green-500" />
                      ) : (
                        <PiXCircle size={24} className="text-red-500" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center flex justify-center items-center  gap-3">
                      <button
                        onClick={() => handleEdit(items)}
                        className="text-blue-400 hover:text-blue-600 cursor-pointer"
                      >
                        <FiEdit size={24} />
                      </button>
                      <button
                        onClick={() => handleDelete(items?.id)}
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <FiTrash2 size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              data={data}
              loading={loading}
              totalPages={pagination.total}
              onChange={handleRefresh}
              pageSize={{
                page: pagination.page,
                pageSize: pagination.pageSize,
                pageOption: Math.ceil(pagination.total / pagination.pageSize),
              }}
              next={pagination.next}
              previous={pagination.previous}
            />
          </div>
        )}
      </div>
    </div>
  );
}
