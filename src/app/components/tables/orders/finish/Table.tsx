"use client";

// REACT Components
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Antd Components
import { Button, Col, Modal, Row, Spin, Tabs, Tag, Tooltip } from "antd";

// Services
import {
  OrderHeader,
  orderHeaderService,
} from "@/api/services/orders/serviceHeader";
import api from "@/api/context/config";

// Antd Components
import {
  FiEdit,
  FiTrash2,
  FiRefreshCcw,
  FiPrinter,
  FiPlusCircle,
} from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FaTrashCan } from "react-icons/fa6";

// Utils

// Page Components
import Pagination from "@/app/components/pagination/pagination";
import ModalViewOrder from "@/app/components/modals/orders/modalView";
import InvoiceModal from "../../../modals/invoice/invoice";

import ModalCategoryProduct from "@/app/components/modals/master/category/modal";
import { styleActive, styleInactive } from "@/utils/styles/styles";

// Utils
import { orderStatus } from "@/utils/constans/orderStatus";
import { formatTime } from "@/utils/function/time";

// Modals
const { confirm } = Modal;

// CODE
export default function TableOrderFinish() {
  // React
  const router = useRouter();

  // STATES
  const [data, setData] = useState<OrderHeader[]>([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [activeKey, setActiveKey] = useState<string>("product");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    next: null,
    previous: null,
  });

  const [printView, setPrintView] = useState(false);
  const [orderView, setOrderView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // FETCH DATA
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const result = params.linkUrl
        ? await api.get(params.linkUrl).then((res) => {
            return res.data;
          })
        : await orderHeaderService.getPaginated({
            page: params?.page ? params.page : pagination.page,
            page_size: params?.pageSize ? params.pageSize : pagination.pageSize,
            status: 5,
          });

      // console.log("Fetch res: ", data);

      if (result?.results?.length > 0) {
        const prod = result.results.filter((items: any) => {
          if (params?.keys === "product") {
            return !items.is_service;
          } else {
            return items.is_service;
          }
        });

        console.log("Filter: ", prod);

        setData(prod);
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
    fetchData({ keys: activeKey });
  }, []);

  // Handle Edit
  const handleEdit = (value: any) => {
    setEdit(true);
    setDataEdit(value);
  };

  // ON CHANGE
  const onChangeTabs = (values: any) => {
    console.log(values);

    setActiveKey(values);
    fetchData({ keys: values });
  };

  // Handle Refresh
  const handleRefresh = (values: any) => {
    fetchData({ ...values, keys: activeKey });
  };

  // Handle Add Order
  const handleCreate = () => {
    router.push("/orders/ongoing/create");
  };

  // Handle View
  const handleView = (value: any) => {
    const _data = value;
    setDataEdit(_data);

    setOrderView(true);
  };

  // Handle Delete
  const handleDelete = (value: any) => {
    showModalConfirm(value);
  };

  // Handle Print
  const handlePrint = (value: any) => {
    const _data = value;
    setDataEdit(_data);

    setPrintView(true);
  };

  // Handle Close
  const handleClose = (values: any) => {
    setOrderView(false);
    setEdit(false);
    setPrintView(false);

    setDataEdit(null);
  };

  // SHOW MODAL CONFIRM
  const showModalConfirm = (value: any) => {
    const _data = value;

    console.log("Submit: ", _data);

    confirm({
      className: "modals-confirm",
      title: `Are you sure want to Cancel Order ${_data.order_number}?`,
      okText: "Confirm",
      cancelText: "Cancel",
      centered: true,

      onOk() {
        handleDeleteOrder(_data);
      },

      onCancel() {
        // setLoadingBtn(false);
      },

      okButtonProps: {
        className: "submit-btn",
        type: "primary",
        danger: true,
      },

      cancelButtonProps: {
        className: "cancel-btn",
        type: "default",
      },

      width: 750,
      //   bodyStyle: {
      //     padding: 30,
      //     borderRadius: 10,
      //   },
    });
  };

  // Handle Delet Order
  const handleDeleteOrder = async (value: any) => {
    const _id = value?.id;

    try {
      const result = await orderHeaderService.delete(_id);

      console.log("Delete result: ", result);

      fetchData({ keys: activeKey });
    } catch (error) {}
  };

  // STATUS
  const handleStatus = (item: any) => {
    // cari data status berdasarkan value/status id
    const found = orderStatus.find((status) => status.value == item);

    return found ? found.color : "default"; // fallback jika tidak ditemukan
  };

  const handleLabel = (item: any) => {
    const found = orderStatus.find((status) => status.value == item);

    return found ? found.label : "Unknown";
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 text-white">
      <Tabs
        type="card"
        onChange={onChangeTabs}
        defaultActiveKey="product"
        activeKey={activeKey}
        destroyOnHidden={false}
        size="large"
        items={[
          {
            key: "product",
            label: (
              <>
                <div>Product</div>
              </>
            ),
            children: (
              <div className="w-full">
                <div className="flex justify-end items-center mb-4 gap-4">
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded hover:bg-gray-100 hover:text-blue-500 transition cursor-pointer"
                  >
                    <FiRefreshCcw /> Refresh
                  </button>
                </div>

                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
                    <Spin size="large" />
                  </div>
                ) : data.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    No data found.
                  </div>
                ) : (
                  <>
                    <div className="w-full overflow-x-auto rounded-lg">
                      <table className="w-full sm:min-w-full text-sm border-collapse">
                        <thead className="bg-gray-300 text-black">
                          <tr>
                            <th className="py-3 px-4 text-center">Actions</th>
                            <th className="py-3 px-4 text-left">Order No.</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Address</th>
                            <th className="py-3 px-4 text-left break-words">
                              Email
                            </th>
                            <th className="py-3 px-4 text-left">
                              Phone Number
                            </th>
                            <th className="py-3 px-4 text-left">Payment</th>
                            <th className="py-3 px-4 text-left">Order Date</th>
                            <th className="py-3 px-4 text-left">
                              Payment Status
                            </th>
                            <th className="py-3 px-4 text-left">
                              Payment Date
                            </th>
                            <th className="py-3 px-4 text-left">
                              Status Order
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((items) => (
                            <tr
                              key={items.id}
                              className="border-b border-gray-200 hover:bg-gray-700/50 cursor-pointer"
                            >
                              <td className="py-3 px-4 min-w-[100px]">
                                <span className="grid grid-cols-3 content-center justify-center gap-3">
                                  <button
                                    onClick={() => handleEdit(items)}
                                    className="text-blue-400 hover:text-blue-600 cursor-pointer"
                                  >
                                    <Tooltip title="Edit Orders">
                                      <FiEdit size={16} />
                                    </Tooltip>
                                  </button>

                                  <button
                                    onClick={() => handlePrint(items)}
                                    className="text-green-400 hover:text-green-600 cursor-pointer"
                                  >
                                    <Tooltip title="Print Orders">
                                      <FiPrinter size={20} />
                                    </Tooltip>
                                  </button>

                                  <button
                                    onClick={() => handleDelete(items)}
                                    className="text-red-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <Tooltip title="Cancel Orders">
                                      <FaTrashCan size={20} />
                                    </Tooltip>
                                  </button>
                                </span>
                              </td>
                              <td className="py-3 px-4 text-white break-words max-w-[100px]">
                                {items?.order_number}
                              </td>
                              <td className="py-3 px-4 text-white">
                                <p className="font-semibold break-words">
                                  {items?.customer_name}
                                </p>
                              </td>
                              <td className="py-3 px-4 text-white break-words">
                                {items?.address}
                              </td>
                              <td className="py-3 px-4 text-white break-words max-w-[100px]">
                                {items?.email}
                              </td>
                              <td className="py-3 px-4 text-white">
                                {items?.phone_number}
                              </td>
                              <td className="py-3 px-4 text-white">
                                {items?.payment_name}
                              </td>
                              <td className="py-3 px-4 text-white text-center">
                                {items?.order_date
                                  ? formatTime(items?.order_date ?? "")
                                  : " - "}
                              </td>
                              <td className="py-3 px-4 text-white">
                                <span
                                  className={`px-2 py-1 rounded font-semibold ${
                                    items?.payment_status == 0
                                      ? "bg-orange-500 text-white"
                                      : items?.payment_status == 1
                                      ? "bg-green-500 text-white"
                                      : items?.payment_status == 2
                                      ? "bg-sky-300 text-black"
                                      : items?.payment_status == 3
                                      ? "bg-orange-300 text-white"
                                      : "bg-black text-white"
                                  }`}
                                >
                                  {items?.payment_status == 0
                                    ? "PENDING"
                                    : items?.payment_status == 1
                                    ? "PAID"
                                    : items?.payment_status == 3
                                    ? "UNPAID"
                                    : items?.payment_status == 4
                                    ? "REFUND"
                                    : items?.payment_status == 5
                                    ? "CANCEL"
                                    : "UNKNOWN"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-white">
                                {items.payment_date
                                  ? formatTime(items?.payment_date ?? "")
                                  : "-"}
                              </td>
                              <td className="py-3 px-4 text-white">
                                <Tag
                                  color={handleStatus(items.status_order || "")}
                                >
                                  {handleLabel(items?.status_order || "")}
                                </Tag>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <Pagination
                      data={data}
                      loading={loading}
                      totalPages={pagination.total}
                      onChange={handleRefresh}
                      pageSize={{
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        pageOption: Math.ceil(
                          pagination.total / pagination.pageSize
                        ),
                      }}
                      next={pagination.next}
                      previous={pagination.previous}
                    />
                  </>
                )}
              </div>
            ),
          },
          {
            key: "service",
            label: <div>Service</div>,
            children: (
              <div className="w-full">
                <div className="flex justify-end items-center mb-4 gap-4">
                  {/* <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-3 py-2 text-white bg-green-700 rounded hover:bg-green-600  transition cursor-pointer"
                  >
                    <FiPlusCircle /> Add New Service Order
                  </button> */}

                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded hover:bg-gray-100 hover:text-blue-500 transition cursor-pointer"
                  >
                    <FiRefreshCcw /> Refresh
                  </button>
                </div>

                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
                    <Spin size="large" />
                  </div>
                ) : data.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    No data found.
                  </div>
                ) : (
                  <>
                    <div className="w-full overflow-x-auto rounded-lg">
                      <table className="w-full sm:min-w-full text-sm border-collapse">
                        <thead className="bg-gray-300 text-black">
                          <tr>
                            <th className="py-3 px-4 text-center">Actions</th>
                            <th className="py-3 px-4 text-left">Order No.</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Address</th>
                            <th className="py-3 px-4 text-left break-words">
                              Email
                            </th>
                            <th className="py-3 px-4 text-left">
                              Phone Number
                            </th>
                            <th className="py-3 px-4 text-left">Payment</th>
                            <th className="py-3 px-4 text-left">Order Date</th>
                            <th className="py-3 px-4 text-left">
                              Payment Status
                            </th>
                            <th className="py-3 px-4 text-left">
                              Payment Date
                            </th>
                            <th className="py-3 px-4 text-left">
                              Status Order
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((items) => (
                            <tr
                              key={items.id}
                              className="border-b border-gray-200 hover:bg-gray-700/50 cursor-pointer"
                            >
                              <td className="py-3 px-4 min-w-[100px]">
                                <span className="grid grid-cols-3 content-center justify-center gap-3">
                                  {/* <button
                                    onClick={() => handleEdit(items)}
                                    className="text-blue-400 hover:text-blue-600 cursor-pointer"
                                  >
                                    <Tooltip title="Edit Orders">
                                      <FiEdit size={16} />
                                    </Tooltip>
                                  </button> */}

                                  <button
                                    onClick={() => handlePrint(items)}
                                    className="text-green-400 hover:text-green-600 cursor-pointer"
                                  >
                                    <Tooltip title="Print Orders">
                                      <FiPrinter size={20} />
                                    </Tooltip>
                                  </button>

                                  <button
                                    onClick={() => handleDelete(items)}
                                    className="text-red-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <Tooltip title="Cancel Orders">
                                      <FaTrashCan size={20} />
                                    </Tooltip>
                                  </button>
                                </span>
                              </td>
                              <td className="py-3 px-4 text-white break-words max-w-[100px]">
                                {items?.order_number}
                              </td>
                              <td className="py-3 px-4 text-white">
                                <p className="font-semibold break-words">
                                  {items?.customer_name}
                                </p>
                              </td>
                              <td className="py-3 px-4 text-white break-words">
                                {items?.address}
                              </td>
                              <td className="py-3 px-4 text-white break-words max-w-[100px]">
                                {items?.email}
                              </td>
                              <td className="py-3 px-4 text-white">
                                {items?.phone_number}
                              </td>
                              <td className="py-3 px-4 text-white">
                                {items?.payment_name}
                              </td>
                              <td className="py-3 px-4 text-white text-center">
                                {items?.order_date
                                  ? formatTime(items?.order_date ?? "")
                                  : " - "}
                              </td>
                              <td className="py-3 px-4 text-white">
                                <span
                                  className={`px-2 py-1 rounded font-semibold ${
                                    items?.payment_status == 0
                                      ? "bg-orange-500 text-white"
                                      : items?.payment_status == 1
                                      ? "bg-green-500 text-white"
                                      : items?.payment_status == 2
                                      ? "bg-sky-300 text-black"
                                      : items?.payment_status == 3
                                      ? "bg-orange-300 text-white"
                                      : "bg-black text-white"
                                  }`}
                                >
                                  {items?.payment_status == 0
                                    ? "PENDING"
                                    : items?.payment_status == 1
                                    ? "PAID"
                                    : items?.payment_status == 3
                                    ? "UNPAID"
                                    : items?.payment_status == 4
                                    ? "REFUND"
                                    : items?.payment_status == 5
                                    ? "CANCEL"
                                    : "UNKNOWN"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-white">
                                {items.payment_date
                                  ? formatTime(items?.payment_date ?? "")
                                  : "-"}
                              </td>
                              <td className="py-3 px-4 text-white">
                                <Tag
                                  color={handleStatus(items.status_order || "")}
                                >
                                  {handleLabel(items?.status_order || "")}
                                </Tag>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <Pagination
                      data={data}
                      loading={loading}
                      totalPages={data?.length}
                      onChange={handleRefresh}
                      pageSize={{
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        pageOption: Math.ceil(
                          pagination.total / pagination.pageSize
                        ),
                      }}
                      next={pagination.next}
                      previous={pagination.previous}
                    />
                  </>
                )}
              </div>
            ),
          },
        ]}
        color="white"
      />

      <ModalViewOrder
        isOpen={orderView}
        dataEdit={dataEdit}
        isClose={handleClose}
        onRefresh={handleRefresh}
      />

      {/* <ModalEditOrder
        isOpen={edit}
        dataEdit={dataEdit}
        isClose={handleClose}
        onRefresh={handleRefresh}
      /> */}

      <InvoiceModal
        isOpen={printView}
        isClose={handleClose}
        dataEdit={dataEdit}
      />
    </div>
  );
}
