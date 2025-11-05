"use client";

// REACTS
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Antd Components
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Image,
  Input,
  Result,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import { BiCheckCircle, BiPrinter } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { RiPrinterFill } from "react-icons/ri";

// Services
import { orderHeaderService } from "@/api/services/orders/serviceHeader";
import { notifyWarning } from "@/utils/notification/notifications";
import { orderDetailsService } from "@/api/services/orders/serviceDetails";
import { GoXCircleFill } from "react-icons/go";
import { formatPrice } from "@/utils/function/price";
import { formatTime } from "@/utils/function/time";

// CODE
export default function TrackingPage() {
  // STATE
  const router = useRouter();
  const params = useSearchParams();
  const orderId = params.get("orderId");

  // DATA STATE
  const [orderData, setOrderData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [details, setDetails] = useState<any>([]);
  const [discount, setDiscount] = useState(0);

  // BOOLEAN
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  // Form
  const [form] = Form.useForm();

  // Handle Search
  const handleTracking = async (values: any) => {
    setLoading(true);
    setNoData(false);
    setOrderData(null);

    try {
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // STATUS
  const getStatusColor = (status: any) => {
    const _status = status ? status : null;

    switch (_status) {
      case "ordered":
        return "green";
      case "on packaging":
        return "gold";
      case "on shipping":
        return "blue";
      case "pending":
        return "magenta";
      case "completed":
        return "cyan";
      case "refunded":
        return "volcano";
      case "cancelled":
        return "red";

      default:
        return "default";
    }
  };

  // Handle Print
  const handlePrint = () => {
    router.push(`/invoice/${orderData.id}`);
  };

  // Use effects
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await orderHeaderService.getAll();

      console.log("Res: ", res);

      setData(res);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  // Fetch Data Order
  const fetchOrder = async (value: any) => {
    try {
      const res = await orderDetailsService.getAll();

      const filtering = res.filter((items: any) => {
        return items.header_id == value?.id;
      });

      console.log("Details: ", res, filtering);

      const disc: Record<number, any> = filtering.reduce(
        (init: any, current: any) => {
          init = current?.discount > 0 ? current.discount : 0;

          return init;
        },
        0
      );

      setDiscount(Number(disc));

      setOrderData(value);
      setDetails(filtering);

      setTimeout(() => {
        setIsSearch(true);
      }, 1000);
    } catch (error) {
      setNoData(true);
      setDetails([]);
      //
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  // Finish
  const onFinish = async (value: any) => {
    setIsLoading(true);
    const _data = value;

    console.log("Search: ", _data);

    if (_data?.email && _data?.order_no) {
      notifyWarning("Incomplete", "Please, Input E-Mail or Order Number!");
    }

    const result = handleSearch({
      email: _data?.email,
      phone_number: _data.last_phone_digits,
      order_number: _data?.order_no,
    });

    console.log("Res Search: ", result);

    if (result.length > 0) {
      await fetchOrder(result[0]);
      setNoData(false);
    } else {
      setNoData(true);

      setTimeout(() => {
        setIsSearch(true);
        setIsLoading(false);
      }, 1500);
    }
  };

  // Finish Failed
  const onFinishFailed = (value: any) => {
    const _data = value;
    console.log("Failed: ", _data);

    notifyWarning("Incomplete", _data.errorFields[0].errors);
  };

  // Handle Return
  const handleReturn = () => {
    setLoading(true);

    setIsSearch(false);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Handle Search
  const handleSearch = (value: any) => {
    const phone = value?.phone_number ?? null;
    const mail = value?.email ?? null;
    const ordo = value?.order_number.toLowerCase() ?? null;

    const filter = (data ?? []).filter((items: any) => {
      let _email = items?.email ? items.email.toLowerCase() : null;
      let _hp = items?.phone_number ? items.phone_number : "";
      let _order = items?.order_number ? items.order_number.toLowerCase() : "";

      //   console.log("Email: ", _email);
      //   console.log("HP: ", _hp);
      //   console.log("ORDER: ", _order);

      //   console.log("Values phone: ", phone, _hp, _hp.includes(phone));
      //   console.log("Values email: ", mail, _email, _email.includes(mail));
      //   console.log("Values ordo: ", ordo, _order.includes(ordo));

      if (phone) {
        if (mail) {
          return _hp.includes(phone) && _email === mail;
        } else {
          return _hp.includes(phone) && _order === ordo;
        }
      }
    });

    console.log("Filter: ", filter);

    return filter;
  };

  // Loading
  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
        <Spin size="large" />
      </div>
    );
  }

  if (isSearch) {
    return (
      <div className="container flex justify-center h-full m-auto mt-8 w-full">
        {noData ? (
          <div className="w-full h-full m-auto bg-amber-50">
            <Result
              status="404"
              title="ORDER NOT FOUND!"
              subTitle="Sorry, Order is not Exist! Please, Check your Input search again!"
              extra={
                <Button
                  onClick={handleReturn}
                  icon={<GoXCircleFill />}
                  type="primary"
                  variant="solid"
                  color="green"
                >
                  Return
                </Button>
              }
            />
          </div>
        ) : orderData ? (
          <Card
            title={`ORDER FOUND`}
            loading={isLoading}
            className="w-10/12 h-full shadow-md border border-gray-200 dark:border-gray-700"
          >
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
                  Invoice {`Order #${orderData?.order_number || " - "}`}
                </p>
                <p className="text-gray-500">
                  {formatTime(
                    orderData?.order_date ||
                      new Date().toLocaleDateString("id-ID")
                  )}
                </p>
              </div>
            </div>

            <Form
              name="tracking-form"
              key="tracking-form"
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
              <h2 className="font-semibold mb-2">Buyer Information</h2>

              <Divider
                className="divider-form"
                style={{ margin: "10px 0px 5px", backgroundColor: "#000000" }}
              />

              <Row justify="space-between">
                <Col
                  xs={{ flex: "100%" }}
                  sm={{ flex: "50%" }}
                  md={{ flex: "50%" }}
                  lg={{ flex: "50%" }}
                  xl={{ flex: "50%" }}
                >
                  <p>
                    <strong>Customer Name: </strong>
                    {`    ${orderData?.customer_name ?? " - "}`}
                  </p>
                  <p>
                    <strong>E-Mail: </strong>{" "}
                    {`    ${orderData?.email ?? " - "}`}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {`    ${orderData.address}`}
                  </p>
                  <p>
                    <strong>Status Shipment: </strong>
                    <Tag color={getStatusColor(orderData?.shipment ?? "")}>
                      {orderData?.shipment ? orderData.shipment : " - "}
                    </Tag>
                  </p>
                  <p>
                    <strong>Shipment: </strong>
                    {`   ${orderData?.shipment_name ?? ""} - ${
                      orderData?.shipment_id ?? ""
                    }`}
                  </p>
                </Col>

                <Col
                  xs={{ flex: "100%" }}
                  sm={{ flex: "50%" }}
                  md={{ flex: "50%" }}
                  lg={{ flex: "50%" }}
                  xl={{ flex: "50%" }}
                >
                  <p>
                    <strong>Payment: </strong>
                    {orderData?.payment_name ?? " - "}
                  </p>
                  <p>
                    <strong>Payment Date: </strong>{" "}
                    {formatTime(orderData?.payment_date) ?? " - "}
                  </p>
                  <p>
                    <strong>Paymnet Status: </strong>{" "}
                    {orderData?.payment_status}
                  </p>
                  <p>
                    <strong>Status Order: </strong>
                    <Tag color={getStatusColor(orderData.status_order ?? "")}>
                      {orderData.status_order ? orderData.status_order : " - "}
                    </Tag>
                  </p>
                </Col>
              </Row>
            </Form>

            <hr className="border-gray-900 my-6" />

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2">Items</th>
                  <th className="py-2">Detail</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2">
                      {item?.product_name} / {item.colors}
                    </td>
                    <td className="py-2">
                      {item?.variants}{" "}
                      {item?.versions ? ", " + item.versions : null}
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

            <div className="text-right mt-6">
              <div className="flex justify-between text-black text-lg font-semibold">
                <span>Subtotal</span>
                <span>Rp {formatPrice(Number(orderData?.total_harga))}</span>
              </div>

              <div className="flex justify-between text-black text-lg font-semibold">
                <span>Discount</span>
                <span>Rp {formatPrice(discount)}</span>
              </div>

              <div className="border-t border-gray-700 my-4" />

              <div className="flex justify-between text-black text-xl font-bold">
                <span>TOTAL</span>
                <span>Rp {formatPrice(orderData?.total_harga || 0)}</span>
              </div>
            </div>

            <Divider
              className="divider-form"
              style={{ margin: "10px 0px 5px", backgroundColor: "#000000" }}
            />

            <div className="flex justify-center gap-4 mt-10 print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
              >
                <BiPrinter size={20} /> Print Invoice
              </button>

              <button
                onClick={handleReturn}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
              >
                <GoXCircleFill size={20} /> Close
              </button>
            </div>
          </Card>
        ) : (
          <div className="w-full h-full m-auto bg-amber-50">
            <Result
              status="404"
              title="ORDER NOT FOUND!"
              subTitle="Sorry, Order is not Exist! Please, Check your Input search again!"
              extra={
                <Button
                  onClick={handleReturn}
                  icon={<GoXCircleFill />}
                  type="primary"
                  variant="solid"
                  color="green"
                >
                  Return
                </Button>
              }
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <Card
        title="🔍 Tracking Order"
        className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nomor Order"
            name="order_no"
            // rules={[{ required: true, message: "Masukkan nomor order!" }]}
          >
            <Input placeholder="Contoh: YHSN25110001" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              //   { required: true, message: "Masukkan email!" },
              { type: "email", message: "Format email tidak valid!" },
            ]}
          >
            <Input placeholder="contoh@email.com" />
          </Form.Item>

          <Form.Item
            label="4 Digit Terakhir Nomor HP"
            name="last_phone_digits"
            rules={[
              {
                required: true,
                message: "Masukkan 4 digit terakhir nomor HP!",
              },
              {
                pattern: /^[0-9]{4}$/,
                message: "Harus 4 digit angka!",
              },
            ]}
          >
            <Input placeholder="1234" maxLength={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? "Finding Order..." : "Track Order"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
