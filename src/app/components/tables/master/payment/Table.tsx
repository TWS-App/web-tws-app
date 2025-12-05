"use client";

// REACTS
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ANTD Components
import { FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import { BiPlus, BiSolidEdit } from "react-icons/bi";
import { Input, Modal, Spin, Table, TableProps, Tooltip } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { PiArrowCircleLeftFill } from "react-icons/pi";
import { IoCloseCircle } from "react-icons/io5";

// Utils
import type { Payment } from "./types/types";

// Services
import { masterPaymentServices } from "@/api/services/master/payment";

// Page Components
import ModalMasterPayment from "@/app/components/modals/master/payment/modal";
import Pagination from "@/app/components/pagination/pagination";

// CONFIRM
const { confirm } = Modal;

// CODE
export default function TablePayments() {
  // Router
  const router = useRouter();

  // STATES
  const [data, setData] = useState<Payment[]>([]);
  const [bulks, setBulks] = useState<Payment[]>([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(5);

  // Boolean
  const [modals, setModals] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // FETCH DATA
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await masterPaymentServices.getAll();

      console.log("Fetch res: ", data);

      if (result?.length > 0) {
        setData(result);
        setBulks(result);
      } else {
        setData([]);
        setBulks([]);
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

  // COLUMNS
  const columns: TableProps<any>["columns"] = [
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      width: 75,
      fixed: "left",
      render: (_, record) => {
        return (
          <div className="flex flex-wrap justify-around">
            <button
              onClick={() => handleEdit(record)}
              className="text-[#4096ff] hover:text-blue-600 cursor-pointer"
            >
              <Tooltip title="Edit Data">
                <BiSolidEdit size={20} />
              </Tooltip>
            </button>
            <button
              onClick={() => handleDelete(record)}
              className="text-[#ff4d4f] hover:text-red-600 cursor-pointer"
            >
              <Tooltip title="Delete Data">
                <AiFillDelete size={20} />
              </Tooltip>
            </button>
          </div>
        );
      },
    },
    {
      title: "Payment Name",
      dataIndex: "payment_name",
      key: "payment_name",
    },
    {
      title: "Payment Number",
      dataIndex: "payment_number",
      key: "payment_number",
    },
    {
      title: "Descriptions",
      dataIndex: "description",
      key: "description",
    },
  ];

  // Handle Edit
  const handleEdit = (value: any) => {
    setEdit(true);
    setDataEdit(value);
    setModals(true);
  };

  // RETURN
  const handleReturn = () => {
    router.back();
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
      title: `Are you sure want to Delete Payment Named: ${
        _data?.payment_name ? _data.payment_name.toUpperCase() : null
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

  // CHANGE PAGE SIZE
  const changePageSize = (val: any, size: number) => {
    setPageSize(size);
  };

  // SEARCH FUNCTION
  const onSearch = () => {
    setLoading(true);

    if (bulks.length > 0) {
      const filter = bulks.filter((items: any) => {
        let _names = items.payment_name.toLowerCase();
        return _names.includes(searchQuery);
      });

      setData(filter);
    } else {
      setData([]);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Handle Reset
  const handleReset = () => {
    setLoading(true);

    setSearchQuery(null);

    setTimeout(() => {
      setData(bulks);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 text-white">
      {/* Header with Refresh */}
      <div className="flex justify-between">
        <div className="justify-start items-center mb-4 gap-4">
          <Input.Search
            placeholder="Search Payment..."
            enterButton="Search"
            value={searchQuery ?? ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            loading={loading}
            suffix={
              <IoCloseCircle
                className="text-black hover:text-red-500 cursor-pointer"
                size={20}
                onClick={handleReset}
              />
            }
            onSearch={onSearch}
          />
        </div>

        <div className="flex justify-end items-center mb-4 gap-4">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 rounded hover:bg-green-500 transition cursor-pointer"
          >
            <BiPlus /> Add New Payment
          </button>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 bg-[#4096ff] rounded hover:bg-[#1677ff] transition cursor-pointer"
          >
            <FiRefreshCcw /> Refresh
          </button>

          <button
            onClick={handleReturn}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
          >
            <PiArrowCircleLeftFill /> Return
          </button>
        </div>
      </div>

      <div className="relative min-h-[200px] bg-gray-500 p-2 rounded-2xl">
        <Table
          className="payment-table"
          key="payment-table"
          loading={loading}
          columns={columns}
          dataSource={data}
          // bordered={true}
          size="middle"
          pagination={{
            pageSize: pageSize,
            pageSizeOptions: [5, 10, 20, 50, 100],
            showSizeChanger: true,
            onChange: changePageSize,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} entries`,
          }}
          scroll={{
            x: true,
          }}
          rowClassName={(record, index) => {
            return index % 2 === 0 ? "odd" : "even";
          }}
          rowKey={(record) => (record.id ? record.id : record.name)}
        />
        {/* {loading ? (
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

            <Pagination
              data={data}
              loading={loading}
              totalPages={data?.length}
            />
          </div>
        )} */}
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
