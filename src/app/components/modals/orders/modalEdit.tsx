// REACT
import React, { useEffect, useState } from "react";

// Antd Components
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { IoCheckmark, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { PiCheckCircle, PiFileFill } from "react-icons/pi";

// Service
import { orderDetailsService } from "@/api/services/orders/serviceDetails";
import {
  OrderHeader,
  orderHeaderService,
} from "@/api/services/orders/serviceHeader";

// Page Components
import Pagination from "../../pagination/pagination";

// Utils
import { formatPrice } from "@/utils/function/price";
import MasterOrderStatus from "../../masters/status/orderStatus";

// INTERFACE
interface ModalProps {
  isOpen: boolean;
  isEdit?: boolean;
  dataEdit?: any;
  isClose: (value: boolean) => void;
  onRefresh?: any;
  children?: React.ReactNode;
}

const { confirm } = Modal;

// CODE
export default function ModalEditOrder({
  isOpen,
  isEdit,
  isClose,
  onRefresh,
  dataEdit,
  children,
}: ModalProps) {
  // STATES
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  // DATA
  const [data, setData] = useState<OrderHeader>();
  const [details, setDetails] = useState([]);

  // FORMS
  const [form] = Form.useForm();

  // USE EFFECTS
  useEffect(() => {
    if (isOpen) {
      // console.log("Data Edit: ", dataEdit);

      if (dataEdit?.id > 0) {
        fetchDetails(dataEdit);
        setData(dataEdit);

        setTimeout(() => {
          handleFormField(dataEdit);
        }, 500);
      } else {
        setOpen(true);
      }
    } else {
      setOpen(false);
    }
  }, [isOpen, dataEdit?.customer_name]);

  // FETCH DATA DETAILS
  const fetchDetails = async (value: any) => {
    setOpen(true);
    setLoading(true);

    try {
      const res = await orderHeaderService.getById(dataEdit?.id);
      const result = await orderDetailsService.getAll();

      console.log("Fetch res: ", result);

      // setData(result);

      if (result?.length > 0) {
        const filter = result.filter((items: any) => {
          return items.header_id == value?.id;
        });

        console.log("Filter: ", filter);
        setDetails(filter);
      } else {
        setDetails([]);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Fields
  const handleFormField = (value: any) => {
    form.setFieldsValue({
      customer_name: value?.customer_name,
      payment_number: value?.payment_number,
      phone_number: value?.phone_number,
      email: value?.email,
      address: value.address,
      id: value?.id,
      order_number: value?.order_number || "YHSN2510300001",
      total_harga: value?.total_harga,
      total_order: value?.total_order,
    });
  };

  // ON FINISH
  const onFinish = (values: any) => {
    console.log("Finish: ", values);

    setLoadingBtn(true);
    showModalConfirm(values);
  };

  // ON FINISH FAILED
  const onFinishFailed = (errors: any) => {
    console.log("Failed: ", errors);
  };

  // SHOW MODAL CONFIRM
  const showModalConfirm = (value: any) => {
    const _data = value;

    console.log("Submit: ", _data);

    confirm({
      className: "modals-confirm",
      title: `Are you sure want to Update Order?`,
      okText: "Confirm",
      cancelText: "Cancel",
      centered: true,

      onOk() {
        handleSubmit(_data);
      },

      onCancel() {
        setLoadingBtn(false);
        // console.log("Confirmation Cancelled");
      },

      okButtonProps: {
        className: "submit-btn",
        type: "primary",
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

  // Get Status Order
  const getStatusOrder = (value: any) => {
    console.log(value);

    form.setFieldsValue({
      status_order: value.id,
    });
  };

  // Handle Close
  const handleClose = () => {
    form.resetFields();
    setLoadingBtn(false);

    setOpen(false);
    isClose(false);
  };

  // Handle Submit
  const handleSubmit = async (value: any) => {
    try {
      const body = value;
      const id = Number(data?.id);
      delete body["id"];

      const result = await orderHeaderService.update(id, body);

      console.log("Update res: ", result);

      handleClose();
      onRefresh(true);
    } catch (err) {
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <Modal
        title={
          <>
            <Row className="modal-title-row" justify="start" align="middle">
              <FiEdit
                className="modal-icon"
                style={{
                  color: "#3699FF",
                  fontSize: 24,
                }}
              />
              <Typography style={{ marginLeft: 15 }}>
                {"Edit Orders"}
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
          scrollToFirstError
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          key="category-product-form"
          layout="vertical"
          style={{ padding: "20px 10px 0px" }}
        >
          <Row justify="start" gutter={30}>
            <Col xs={24} sm={24} md={12} lg={12} xxl={12} xl={12}>
              <Form.Item name="order_number" label="Order No.">
                <Input placeholder="Order's Number" readOnly />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xxl={12} xl={12}>
              <Form.Item name="customer_name" label="Customer's Name">
                <Input placeholder="Customer's Name" readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="start" gutter={30}>
            <Col xs={24} sm={24} md={12} lg={12} xxl={12} xl={12}>
              <Form.Item name="email" label="Email">
                <Input placeholder="Email" readOnly />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xxl={12} xl={12}>
              <Form.Item name="phone_number" label="Phone's No.">
                <Input placeholder="Phone's Number" readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="start" gutter={30}>
            <Col xs={24} sm={24} md={8} lg={8} xxl={8} xl={8}>
              <Form.Item name="total_order" label="Total Items">
                <InputNumber
                  readOnly
                  formatter={(value: any) => {
                    return formatPrice(value);
                  }}
                  placeholder="Totam Items"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xxl={8} xl={8}>
              <Form.Item name="total_harga" label="Total Price">
                <InputNumber
                  placeholder="Total Price"
                  readOnly
                  addonBefore={"Rp"}
                  formatter={(value: any) => {
                    return formatPrice(value);
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Col span={24}>
            <Form.Item name="address" label="Address">
              <Input.TextArea showCount placeholder="Address" rows={2} />
            </Form.Item>

            <Form.Item name="id" label="ID" hidden>
              <InputNumber placeholder="ID" />
            </Form.Item>
          </Col>

          <Divider
            className="divider-form"
            style={{ margin: "15px 0px 10px", background: "#EBEDF3" }}
          />

          <Row justify="start" gutter={30}>
            <Col xs={24} sm={24} md={12} lg={12} xxl={12} xl={12}>
              <Form.Item name="payment_status" label="Payment Status">
                <Select
                  placeholder="Payment Status"
                  allowClear
                  showSearch
                  options={[
                    {
                      label: "Paid ( Confirmed )",
                      value: 1,
                    },
                    {
                      label: "Pending",
                      value: 2,
                    },
                    {
                      label: "Unpaid ( Outstanding )",
                      value: 3,
                    },
                    {
                      label: "Refund",
                      value: 4,
                    },
                    {
                      label: "Cancelled",
                      value: 5,
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xxl={12} xl={12}>
              <Form.Item name="status_order" label="Status Order">
                {/* <Select
                  placeholder="Status Order"
                  allowClear
                  showSearch
                  options={[
                    {
                      label: "Ordered",
                      value: 1,
                    },
                    {
                      label: "On Packaging",
                      value: 2,
                    },
                    {
                      label: "On Shipping",
                      value: 3,
                    },
                    {
                      label: "Pending",
                      value: 4,
                    },
                    {
                      label: "Completed ( Closed )",
                      value: 5,
                    },
                    {
                      label: "Refunded",
                      value: 6,
                    },
                    {
                      label: "Cancelled",
                      value: 7,
                    },
                  ]}
                /> */}
                <MasterOrderStatus
                  getStatusOrder={getStatusOrder}
                  status={data?.status_order || ""}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider
            className="divider-form"
            style={{ margin: "15px 0px 10px", background: "#EBEDF3" }}
          />

          <div className="relative min-h-[200px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
                <Spin size="large" />
              </div>
            ) : details.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No data found.
              </div>
            ) : (
              <div className="w-full">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 text-gray-300">
                    <tr>
                      <th className="py-3 px-4 text-center">No.</th>
                      <th className="py-3 px-4 text-left">Product</th>
                      <th className="py-3 px-4 text-right">Price</th>
                      <th className="py-3 px-4 text-right">Discount</th>
                      <th className="py-3 px-4 text-left">Colors</th>
                      <th className="py-3 px-4 text-left">Variants</th>
                      <th className="py-3 px-4 text-center">Qty</th>
                      <th className="py-3 px-4 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {details.map((items: any) => (
                      <tr
                        key={items?.id}
                        className="border-b border-gray-700 hover:bg-gray-700/50"
                      >
                        <td className="py-3 px-4">
                          <p className="font-semibold">{items?.id}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold">{items.product_name}</p>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {formatPrice(items.price || 0)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {formatPrice(items.discount || 0)}
                        </td>
                        <td className="py-3 px-4">{items?.colors}</td>
                        <td className="py-3 px-4">{items?.variants}</td>
                        <td className="py-3 px-4 text-center">
                          {formatPrice(items.qty)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {formatPrice(items.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  data={details}
                  loading={loading}
                  totalPages={details?.length}
                />
              </div>
            )}
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
              {`Update`}
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
