// REACT
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Service
import api from "@/api/context/config";
import { OrderHeader } from "@/api/services/orders/serviceHeader";
import { servicesService } from "@/api/services/service/service";

// Antd Components
import {
  Button,
  Divider,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  Typography,
} from "antd";
import { PiCheckCircle } from "react-icons/pi";
import { IoCloseCircle } from "react-icons/io5";

// Utils
import { FaScrewdriverWrench } from "react-icons/fa6";
import { categoryServiceServices } from "@/api/services/master/category";
import { formatPrice } from "@/utils/function/price";

// Notif
import { notifyWarning } from "@/utils/notification/notifications";

// INTERFACE
interface ModalProps {
  isOpen: boolean;
  isEdit?: boolean;
  initialSelected?: any[];
  dataSelected: (value: any[]) => void;
  isClose: (value: boolean) => void;
  children?: React.ReactNode;
}

// CODE
export default function ServiceItemsModal({
  isOpen,
  initialSelected,
  isClose,
  dataSelected,
  children,
}: ModalProps) {
  // STATES
  // DATA
  const [data, setData] = useState<any[]>();
  const [bulks, setBulks] = useState([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [categories, setCategories] = useState([]);

  // Boolean
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 5,
    next: null,
    previous: null,
  });

  // FORMS
  const [form] = Form.useForm();

  // USE EFFECTS
  useEffect(() => {
    if (isOpen) {
      // console.log("Data Edit: ", dataEdit);

      fetchData({ page: pagination.page, pageSize: pagination.pageSize });
    } else {
      setOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (open && initialSelected) {
      setSelectedItems(initialSelected);
    }
  }, [open, initialSelected]);

  // FETCH DATA DETAILS
  const fetchData = async (params: any) => {
    setOpen(true);
    setLoading(true);

    try {
      const result = params?.linkUrl
        ? await api.get(params.linkUrl).then((res) => {
            return res.data;
          })
        : await servicesService.getAll({
            page: params?.page ? params.page : pagination.page,
            page_size: params?.pageSize ? params.pageSize : pagination.pageSize,
          });

      const resultCat = await categoryServiceServices.getAll();

      console.log("Fetch res: ", result, resultCat);

      if (result?.results?.length > 0) {
        setData(result.results);
        setBulks(result.results);
      } else {
        setData(result.results);
        setBulks(result.results);
      }

      if (resultCat?.length) {
        resultCat.push({
          id: 0,
          category_name: "ALL",
        });

        setCategories(resultCat);
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
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  // Handle Close
  const handleClose = () => {
    // form.resetFields();
    setLoadingBtn(false);

    setOpen(false);
    isClose(false);
  };

  const handleQtyChange = (qty: number, item: any) => {
    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      const index = prev.findIndex((p) => p.id === item.id);

      const selectedItem = {
        id: Number(item.id),
        name: item.service_name,
        price: Number(item.price),
        variant: item.variants || null,
        color: item.colors || null,
        quantity: qty,
        image: item.images?.[0]?.url,
        type: "service",
        version: item?.version,
        discount: item?.discount || 0,
      };

      if (!qty) {
        return prev.filter((p) => p.id !== item.id);
      }

      if (index !== -1) {
        const copy = [...prev];
        copy[index] = selectedItem;
        return copy;
      }

      if (exists) {
        // update qty
        return prev.map((p) => (p.id === item.id ? selectedItem : p));
      } else {
        // add new item
        return [...prev, selectedItem];
      }
    });
  };

  // On Finish
  const onFinish = (value: any) => {
    const _data = value;

    if (!selectedItems.length) {
      return notifyWarning(
        "No Items Selected",
        "Please choose at least 1 service!"
      );
    }

    console.log("Selected services: ", selectedItems);
    dataSelected(selectedItems);
    handleClose();
  };

  // On Finish Failed
  const onFinishFailed = (value: any) => {
    const _data = value;

    console.log("Finish: ", _data);
    notifyWarning("Incomplete", _data.errorFields[0].errors);
  };

  // On Filter
  const onFilter = (values: any) => {
    const _data = bulks.length > 0 ? bulks : [];
    console.log("On Filter: ", values);

    if (values.id == 0) {
      setData(bulks);
    } else {
      const filtered = _data.filter((items: any) => {
        return items.category === values.id;
      });

      setData(filtered);
    }
  };

  return (
    <>
      <Modal
        title={
          <>
            <Row className="modal-title-row" justify="start" align="middle">
              <FaScrewdriverWrench
                className="modal-icon"
                style={{
                  color: "#3699FF",
                  fontSize: 24,
                }}
              />
              <Typography style={{ marginLeft: 15 }}>
                {"Service Items"}
              </Typography>
            </Row>
          </>
        }
        centered
        open={open}
        onCancel={handleClose}
        loading={loading}
        closable
        width={"75%"}
        footer={null}
      >
        <Form
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-center">
            {categories.map((cat: any) => (
              <button
                key={cat?.id}
                className="text-gray-600 hover:text-purple-600 font-medium cursor-pointer transition-colors"
                onClick={() => onFilter(cat)}
              >
                {cat?.category_name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(data ?? []).map((item: any) => (
              <div className="w-full block self-center-safe text-center group">
                <div key={item.id} className="text-center">
                  {item?.images && item?.images?.length > 0 ? (
                    <Image
                      src={item?.images[0]?.url || "error"}
                      alt={item?.service_name}
                      className="object-contain group-hover:scale-105 transition-transform duration-500 bg-gray-200"
                      height={200}
                      fallback="data:image/png;base64,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"
                      preview={false}
                    />
                  ) : (
                    <Image
                      src={item?.image || "eror"}
                      alt={item?.service_name}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 bg-gray-200"
                      height={200}
                      fallback="data:image/png;base64,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"
                      preview={false}
                    />
                  )}
                </div>

                <h3 className="text-xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600 transition-colors">
                  {item.service_name}
                </h3>

                <div className="text-gray-500">
                  {item?.discount && (
                    <span className="line-through mr-2">
                      {formatPrice(item?.price)}
                    </span>
                  )}
                  <span className="font-semibold">
                    {item.discount
                      ? formatPrice(item?.price - item.discount)
                      : formatPrice(item.price)}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <Form.Item label="Qty">
                    <InputNumber
                      min={1}
                      value={
                        selectedItems.find((x) => x.id === item.id)?.quantity ||
                        0
                      }
                      onChange={(value: any) => handleQtyChange(value, item)}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 m-auto mt-20">
            <div className="flex items-center gap-2">
              <label htmlFor="rows" className="text-sm text-white">
                Rows per page:
              </label>

              <select
                id="rows"
                value={pagination.pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  const newPage =
                    pagination.total / newSize < newSize ? 1 : pagination.page;

                  fetchData?.({
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
            </div>

            <button
              onClick={() => {
                fetchData({
                  linkUrl: pagination.previous || null,
                });
              }}
              disabled={!pagination.previous}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(1)].map((_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded cursor-pointer transition ${
                  pagination.page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {pagination.page}
              </button>
            ))}

            <button
              onClick={() => {
                // setPage((prev) => Math.min(prev + 1, totalPages));

                fetchData({
                  linkUrl: pagination.next || null,
                });
              }}
              disabled={!pagination.next}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <Divider
            className="divider-form"
            style={{ margin: "15px 0px 10px", background: "#EBEDF3" }}
          />

          <Row justify="end" align="middle">
            <Button
              icon={<PiCheckCircle />}
              variant="solid"
              color="green"
              htmlType="submit"
              style={{
                marginRight: 15,
              }}
            >
              {`Submit`}
            </Button>

            <Button
              icon={<IoCloseCircle />}
              type="primary"
              danger
              onClick={handleClose}
            >
              {`Close`}
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
