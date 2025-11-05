"use client";

// REACTS
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "@/stores";

// Antd Components
import { Col, Divider, Form, Image, Modal, Row, Typography } from "antd";
import { BiHome, BiPrinter } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";

// Service
import { orderDetailsService } from "@/api/services/orders/serviceDetails";
import {
  OrderHeader,
  orderHeaderService,
} from "@/api/services/orders/serviceHeader";

// Utils
import { formatPrice } from "@/utils/function/price";
import { formatTime } from "@/utils/function/time";

// INTERFACE
interface ModalProps {
  isOpen: boolean;
  isEdit?: boolean;
  dataEdit?: any;
  isClose: (value: boolean) => void;
  onRefresh?: any;
  children?: React.ReactNode;
}

// Text Styles
const textForm = {
  fontWeight: 750,
  padding: "5px 0px 0px",
};

// CODE
export default function InvoiceModal({
  isOpen,
  isEdit,
  isClose,
  onRefresh,
  dataEdit,
  children,
}: ModalProps) {
  // Use Ref
  const printRef = useRef<HTMLDivElement>(null);

  // ID
  const { id } = useParams();
  const cart = useSelector((state: RootState) => state.cart.items);

  // STATE
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [discount, setDiscount] = useState(0);

  const [data, setData] = useState<OrderHeader>();
  const [details, setDetails] = useState<[]>([]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // FORMS
  const [form] = Form.useForm();

  // USE EFFECTS
  useEffect(() => {
    if (isOpen) {
      // console.log("Data Edit: ", dataEdit);

      if (dataEdit?.id > 0) {
        fetchData(dataEdit?.id);
        setData(dataEdit);
        setOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  }, [isOpen, dataEdit?.id]);

  // Use Effects
  useEffect(() => {
    if (details.length > 0) {
      handleDiscount(details);
    }
  }, [details]);

  // Fetch Data
  const fetchData = async (value: any) => {
    setLoading(true);
    try {
      const res = await orderHeaderService.getById(value);

      console.log("Res: ", res);
      setData(res);

      if (res.id) {
        try {
          const result = await orderDetailsService.getAll();

          const filter = result.filter((items: any) => {
            return items.header_id == res.id;
          });

          setDetails(filter);
        } catch (error) {
          //
        }
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  // Handle Print
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice #${data?.order_number || data?.id}`,
  });

  // Handle Discount
  const handleDiscount = (value: []) => {
    const discount: Record<number, any> = value.reduce(
      (init: any, current: any) => {
        init = current?.discount > 0 ? current.discount : 0;

        return init;
      },
      0
    );

    console.log("Discount: ", discount);
    setDiscount(Number(discount));
  };

  // Loading
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading Invoice...
      </div>
    );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle Close
  const handleClose = () => {
    setOpen(false);
    isClose(false);
  };

  return (
    <Modal
      title={
        <>
          <Row className="modal-title-row" justify="start" align="middle">
            <FiPrinter
              className="modal-icon"
              style={{
                color: "#3699FF",
                fontSize: 24,
              }}
            />
            <Typography style={{ marginLeft: 15 }}>{"PRINT ORDERS"}</Typography>
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
      <div className="bg-white text-black py-10 px-20">
        <Form
          name="invoice-form"
          className="invoice-form"
          key="invoice-form"
          form={form}
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 1000,
          }}
          autoComplete="off"
          layout="horizontal"
        >
          <div
            ref={printRef}
            className="max-w-4xl mx-auto border border-gray-300 p-10 rounded-lg shadow-md"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex justify-center gap-2">
                <Image
                  src="/images/assets/MainLogo.png"
                  alt="Logo"
                  preview={false}
                  width={30}
                  height={30}
                  style={{
                    background: "#03a9f4",
                  }}
                />
                <h1 className="text-3xl font-bold">Yhusan Store</h1>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">
                  Invoice #{data?.order_number || id}
                </p>
                <p className="text-gray-500">
                  {formatTime(
                    data?.order_date || new Date().toLocaleDateString("id-ID")
                  )}
                </p>
              </div>
            </div>

            {/* Buyer Info */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Buyer Information</h2>

              <Divider
                className="divider-form"
                style={{ margin: "10px 0px 5px", backgroundColor: "#000000" }}
              />

              <Row style={{ width: "100%", margin: 0, height: 30 }}>
                <Col span={12} className="col-room-no">
                  <Form.Item
                    label="Customer Name"
                    className="customer_name"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Typography className="text-room-no" style={textForm}>
                      {data?.customer_name}
                    </Typography>
                  </Form.Item>
                </Col>

                <Col span={12} className="col-room-no">
                  <Form.Item
                    label="Payment"
                    className="payment"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Typography className="text-room-no" style={textForm}>
                      {`${data?.payment_name} - ${
                        data?.payment_status == 1 ? "PAID" : "UNPAID"
                      }`}
                    </Typography>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ width: "100%", margin: 0, height: 30 }}>
                <Col span={12}>
                  <Form.Item
                    label="E-Mail"
                    className="email"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Typography className="text-adult" style={textForm}>
                      {data?.email}
                    </Typography>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Payment Date"
                    className="paydate"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Typography className="text-adult" style={textForm}>
                      {data?.payment_date
                        ? formatTime(data?.payment_date)
                        : " UNPAID "}
                    </Typography>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ width: "100%", margin: 0, height: 30 }}>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    className="phone"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Typography className="text-adult" style={textForm}>
                      {data?.phone_number}
                    </Typography>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Total Price"
                    className="total"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Typography className="text-adult" style={textForm}>
                      Rp {formatPrice(data?.total_harga ?? 0)}
                    </Typography>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ width: "100%", margin: 0, height: 30 }}>
                <Col span={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Typography className="text-room-price" style={textForm}>
                      {data?.address}
                    </Typography>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Divider */}
            <Divider
              className="divider-form"
              orientation="left"
              orientationMargin={0}
              style={{ margin: "10px 0px 5px", borderColor: "#000000" }}
            >
              Product List
            </Divider>

            {/* Product Table */}
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2">Items</th>
                  <th className="py-2">Colors</th>
                  <th className="py-2">Details</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2">{item?.product_name}</td>
                    <td className="py-2">{item.colors}</td>
                    <td className="py-2">
                      {item?.variants} {item.versions}
                    </td>
                    <td className="py-2 text-center">{item.qty}</td>
                    <td className="py-2 text-right">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-2 text-right">
                      {formatPrice(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div className="text-right mt-6">
              <div className="flex justify-between text-black text-lg font-semibold">
                <span>Subtotal</span>
                <span>Rp {formatPrice(Number(data?.total_harga))}</span>
              </div>

              <div className="flex justify-between text-black text-lg font-semibold">
                <span>Discount</span>
                <span>Rp {formatPrice(discount)}</span>
              </div>

              <div className="border-t border-gray-700 my-4" />

              <div className="flex justify-between text-black text-xl font-bold">
                <span>TOTAL</span>
                <span>Rp {formatPrice(data?.total_harga || 0)}</span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-4 mt-10 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
            >
              <BiPrinter size={20} /> Print Invoice
            </button>

            <button
              onClick={handleClose}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
            >
              <IoCloseCircle size={20} /> Close
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
