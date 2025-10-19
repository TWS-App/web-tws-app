"use client";

import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import type { Payment } from "./types/types";
import { BiPlus } from "react-icons/bi";
import { masterPaymentServices } from "@/api/services/master/payment";
import { Modal, Spin, Tooltip } from "antd";
import ModalMasterPayment from "@/app/components/modals/master/payment/modal";
import Pagination from "@/app/components/pagination/pagination";

// CONFIRM
const { confirm } = Modal;

// CODE
export default function TablePayments() {
  // STATES
  const [data, setData] = useState<Payment[]>([]);

  const [modals, setModals] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const [loading, setLoading] = useState(false);

  // FETCH DATA
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await masterPaymentServices.getAll();

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
    setModals(true);
  };

  // Handle Modals
  const handleAdd = () => {
    setModals(true);
  };

  // Handle Close
  const handleClose = () => {
    setModals(false);
    setDataEdit(null);
    setEdit(false);
  };

  // Handle Delete
  const handleDelete = (value: any) => {
    const _data = value;

    confirm({
      className: "modals-confirm",
      title: `Are you sure want to Delete Category Product ${
        _data ? _data?.category_name : null
      }?`,
      okText: "Confirm",
      cancelText: "Cancel",
      centered: true,

      onOk() {
        handleSubmit(_data);
      },

      onCancel() {},

      okButtonProps: {
        className: "submit-btn",
        type: "primary",
      },

      cancelButtonProps: {
        className: "cancel-btn",
        type: "default",
      },

      width: 750,
    });
  };

  // REFRESH
  const handleRefresh = () => {
    fetchData();
  };

  // Handle Submit
  const handleSubmit = async (value: any) => {
    try {
      const body = value;

      const result = await masterPaymentServices.delete(body?.id);

      console.log("Delete res: ", result);

      handleRefresh();
    } catch (err) {}
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 text-white">
      {/* Header with Refresh */}
      <div className="flex justify-end items-center mb-4 gap-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-2 bg-green-600 rounded hover:bg-green-500 transition cursor-pointer"
        >
          <BiPlus /> Add New Payment
        </button>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
        >
          <FiRefreshCcw /> Refresh
        </button>
      </div>

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
                  <th className="py-3 px-4 text-center">Actions</th>
                  <th className="py-3 px-4 text-left">Payment Name</th>
                  <th className="py-3 px-4 text-left">Account Numbers</th>
                  <th className="py-3 px-4 text-left">Descriptions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((items) => (
                  <tr
                    key={items?.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(items)}
                        className="text-blue-400 hover:text-blue-600 cursor-pointer"
                      >
                        <Tooltip title="Edit Data">
                          <FiEdit size={16} />
                        </Tooltip>
                      </button>
                      <button
                        onClick={() => handleDelete(items)}
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <Tooltip title="Delete Data">
                          <FiTrash2 size={16} />
                        </Tooltip>
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold">{items.payment_name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold">{items.payment_number}</p>
                    </td>

                    <td className="py-3 px-4">{items.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination data={data} loading={loading} totalPages={1} />
          </div>
        )}
      </div>

      <ModalMasterPayment
        isOpen={modals}
        isClose={handleClose}
        isEdit={edit}
        dataEdit={dataEdit}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
