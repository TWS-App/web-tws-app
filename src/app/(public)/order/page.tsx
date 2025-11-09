"use client";

// REACT
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useRouter } from "next/navigation";
import { clearCart } from "@/stores/cart/cart";

// Antd Components
import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Result,
  Row,
} from "antd";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Utils
import { formatPrice } from "@/utils/function/price";
import MasterPaymentList from "@/app/components/masters/payment/payment";

// Notifications
import { notifyWarning } from "@/utils/notification/notifications";
import { orderHeaderService } from "@/api/services/orders/serviceHeader";
import { orderDetailsService } from "@/api/services/orders/serviceDetails";
import MasterProvince from "@/app/components/masters/region/province";
import { RiHeadphoneFill } from "react-icons/ri";
import Link from "next/link";

// CONST
const { confirm } = Modal;

// CODE
export default function CheckoutPage() {
  // STATE
  const router = useRouter();

  // DISPATCH
  const dispatch = useDispatch();

  // Data
  const [submitData, setSubmitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const cart = useSelector((state: RootState) => state.cart.items);
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    address: "",
    phone_number: "",
    payment: "",
  });

  // State collapse
  const [open, setOpen] = useState({
    email: true,
    delivery: false,
    payment: false,
    review: false,
  });
  const [step, setStep] = useState(1);

  // TOTALING
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = cart.reduce(
    (current, init) => current + (init.discount || 0) * init.quantity,
    0
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // FORMS
  const [form] = Form.useForm();

  // TOGGLE
  const toggle = (key: keyof typeof open) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle Payment
  const getPayment = (value: any) => {
    console.log(value);

    form.setFieldsValue({
      payment_type: value.id,
    });
  };

  // Handle Province
  const getProvince = (value: any) => {
    console.log(value);

    form.setFieldsValue({
      province: value.id,
    });
  };

  // Validations
  const validateFields = (fields: string[]) => {
    const newErrors: { [key: string]: string } = {};
    fields.forEach((f) => {
      if (!formData[f as keyof typeof formData]) {
        newErrors[f] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (fields: string[], nextStep: number) => {
    if (validateFields(fields)) {
      setStep(nextStep);
    }
  };

  // SHOW MODAL CONFIRM
  const showModalConfirm = (value: any) => {
    const _data = value;

    console.log("Submit: ", _data);

    confirm({
      className: "modals-confirm",
      title: `Are you sure want to Create a new Order?`,
      okText: "Confirm",
      cancelText: "Cancel",
      centered: true,

      onOk() {
        handleSubmit(_data);
      },

      onCancel() {
        setLoadingBtn(false);
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
    });
  };

  // On Finish
  const onFinish = (value: any) => {
    setLoadingBtn(true);

    console.log("CART: ", cart);
    showModalConfirm(value);
  };

  // On Finish Failed
  const onFinishFailed = (value: any) => {
    console.log(value);
    notifyWarning("Incomplete", value.errorFields[0].errors);
  };

  // Handle Submit
  const handleSubmit = async (values: any) => {
    const _body = values;
    console.log("Submit: ", _body);

    const body = {
      address: _body?.address,
      customer_name: _body.customer_name,
      email: _body.email,
      payment_status: 0,
      payment_type: _body.payment_type,
      phone_number: _body.phone_number,
      total_harga: subtotal,
      total_order: cart.length,
      // status_order: 1,
      // shipment: 0,
    };

    try {
      const res = await orderHeaderService.create(body);

      console.log("Res Create: ", res);

      if (res?.id) {
        for (let i = 0; i < cart.length; i++) {
          const details = {
            colors: cart[i].color,
            discount: cart[i]?.discount || 0,
            header_id: res?.id,
            price: cart[i].price,
            product_id: cart[i].type === "product" ? cart[i].id : null,
            service_id: cart[i].type === "service" ? cart[i].id : null,
            qty: cart[i].quantity,
            total: cart[i].price * cart[i].quantity,
            variants: cart[i].variant,
          };

          console.log("Details: ", details);
          try {
            const results = await orderDetailsService.create(details);

            console.log("Res details: ", results);

            dispatch(clearCart());
            router.push(`/success?orderId=${res.id}`);
          } catch (error: any) {}
        }
      }
    } catch (error) {}

    setLoadingBtn(false);
  };

  if (cart.length === 0) {
    return (
      <div className="container w-full flex justify-center items-center mt-28">
        <Result
          status="404"
          className="w-3/4 bg-white p-5 rounded-2xl"
          title="Cart Empty"
          subTitle="Sorry, Your Cart is Empty! Please, add a Product and try again later!"
          extra={
            <Link href="/products">
              <Button
                icon={<RiHeadphoneFill />}
                color="geekblue"
                variant="solid"
              >
                Products
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white justify-center">
      {/* Left: Form */}
      <h1 className="text-center text-2xl font-bold p-5 text-black">
        Create Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 mt-10 ">
        <div className="space-y-2">
          <Form
            form={form}
            layout="vertical"
            size="middle"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="p-7 bg-gray-800 rounded-lg shadow-x"
            scrollToFirstError
            labelCol={{ style: { color: "#FFFFFF" } }}
          >
            <Col span={24} style={{ padding: "10px 20px" }}>
              <Form.Item
                name="email"
                label={<span className="text-white">E-Mail</span>}
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
                style={{
                  color: "#FFFFFF",
                }}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="customer_name"
                label={<span className="text-white">Full Name</span>}
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your Full NameF!",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>

              <Form.Item
                name="phone_number"
                label={<span className="text-white">Phone Number</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Phone Number" style={{ width: "100%" }} />
              </Form.Item>

              <Divider
                className="form-divider"
                style={{ margin: "15px 0px", borderColor: "#EBEDF3" }}
              >
                {`Address`}
              </Divider>

              {/* <Form.Item
                name="province"
                label={<span className="text-white">Province</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select a Province!",
                  },
                ]}
              >
                <MasterProvince getProvince={getProvince} prov="" />
              </Form.Item> */}

              <Form.Item
                name="address"
                label={<span className="text-white">Address</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your Full Address!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Address" rows={2} showCount />
              </Form.Item>

              <Divider
                className="form-divider"
                style={{ margin: "15px 0px", background: "#EBEDF3" }}
              />

              <Form.Item
                name="payment_type"
                label={<span className="text-white">Payment</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your Payment Type!",
                  },
                ]}
              >
                <MasterPaymentList getPayment={getPayment} pay="" />
              </Form.Item>

              <Divider
                className="form-divider"
                style={{ margin: "15px 0px", background: "#EBEDF3" }}
              />

              <p className="text-gray-300 text-sm">
                Please review your order before proceeding to payment.
              </p>

              <Row justify="end">
                <Button
                  htmlType="submit"
                  variant="solid"
                  color="green"
                  loading={loadingBtn}
                >{`Confirm Purchase`}</Button>
              </Row>
            </Col>

            {/* <div className=" bg-gray-800 rounded-lg shadow-xl">
              <div
                className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
                onClick={() => toggle("email")}
              >
                <h2 className="text-lg font-semibold">Buyers Data</h2>
                {open.email ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            
              {open.email && (
                <div className="p-6 space-y-4">
                  <label className="block mb-1 text-sm font-medium">
                    Email Address:
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    onChange={handleChange}
                    className={`w-full border p-2 rounded ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}

                  <label className="block mb-1 text-sm font-medium mt-4">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className={`w-full border p-2 rounded ${
                      errors.fullname ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.fullname}</p>
                  )}

                  <label className="block mb-1 text-sm font-medium mt-4">
                    Phone Number:
                  </label>
                  <input
                    placeholder="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    className={`w-full border p-2 rounded ${
                      errors.phone_number ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.phone_number}
                    </p>
                  )}
                </div>
              )}
            </div> */}

            {/* <div className="bg-gray-800 rounded-lg shadow-xl">
              <div
                className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
                onClick={() => toggle("delivery")}
              >
                <h2 className="text-lg font-semibold">Delivery Address</h2>
                {open.delivery ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {open.delivery && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <label className="block mb-1 text-sm font-medium">
                      Full Address:
                    </label>
                    <textarea
                      placeholder="Full Address"
                      name="address"
                      onChange={handleChange}
                      className={`w-full border p-2 rounded ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />

                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}
              </div> */}

            {/*
            <div className="bg-gray-800 rounded-lg shadow-xl">
              <div
                className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
                onClick={() => toggle("payment")}
              >
                <h2 className="text-lg font-semibold">Payment</h2>
                {open.payment ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {open.payment && (
                <div className="relative w-full max-w-md p-6 space-y-4">
                  <MasterPaymentList getPayment={getPayment} pay="" />
                   <select
                    name="payment"
                    value={formData.payment}
                    onChange={handleChange}
                    required
                    className={`w-full bg-gray-700 border ${
                      errors.payment ? "border-red-500" : "border-gray-300"
                    } rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 truncate`}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="gopay">GoPay</option>
                    <option value="ovo">OVO</option>
                    <option value="cash">Cash on Delivery</option>
                  </select> 

                  {errors.payment && (
                    <p className="text-red-500 text-sm">{errors.payment}</p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl">
              <div
                className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
                onClick={() => toggle("review")}
              >
                <h2 className="text-lg font-semibold">Review & Purchase</h2>
                {open.review ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {open.review && (
                <div className="p-6 space-y-4">
                  <p className="text-gray-300 text-sm">
                    Please review your order before proceeding to payment.
                  </p>

                  {/* <Link href="/success" className="hover:underline">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold cursor-pointer"
                  >
                    Confirm Purchase
                  </button>
                </div>
              )}
            </div>
              */}
          </Form>
        </div>

        {/* Right: Order Summary */}
        <div className="border border-blue-600 bg-gray-800 p-6 rounded-lg lg:sticky lg:top-20 self-start h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item: any) => (
              <div
                key={`${item?.name}-${item?.variant}`}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item?.image || "error"}
                    alt={item?.name || ""}
                    className="w-14 h-14 object-cover"
                    fallback="data:image/png;base64,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"
                    preview={false}
                    height={100}
                  />
                  <div>
                    <p>
                      {item.name} / {item?.color}
                    </p>
                    {item?.variant ? (
                      <p className="text-sm text-gray-500">
                        Variants: {item.variant}
                      </p>
                    ) : null}
                    {item?.version ? (
                      <p className="text-sm text-gray-500">
                        Versions: {item.version}
                      </p>
                    ) : null}
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {item.discount && (
                  <span className="line-through mr-3">
                    {formatPrice(Number(item.price))}
                  </span>
                )}
                <p>
                  {formatPrice(
                    item.price * item.quantity -
                      (item.discount || 0) * item.quantity
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 my-4" />

          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="border-t border-gray-700 my-4" />

            {/* <div className="flex justify-between">
            <span>Tax</span>
            <span>$0.00</span>
          </div> */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Discount</span>
              <span>{formatPrice(discount)}</span>
            </div>

            <div className="border-t border-gray-700 my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="border-t border-gray-700 my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
