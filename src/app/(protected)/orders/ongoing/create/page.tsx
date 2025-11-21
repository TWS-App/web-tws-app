"use client";

// REACT COMPONENTS
import { useState } from "react";
import { useRouter } from "next/navigation";

// SERVICES
import { orderDetailsService } from "@/api/services/orders/serviceDetails";
import { orderHeaderService } from "@/api/services/orders/serviceHeader";

// ANTD Components
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
} from "antd";
import { TiPlusOutline } from "react-icons/ti";
import {
  PiMinus,
  PiPlus,
  PiPlusCircle,
  PiTrash,
  PiX,
  PiXCircle,
} from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";

// Appe Components
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import MasterCategoryProduct from "@/app/components/masters/category/categoryProduct";

// Page Components
import ServiceItemsModal from "@/app/components/modals/items/service/modal";
import MasterProvince from "@/app/components/masters/region/province";
import MasterCity from "@/app/components/masters/region/city";
import MasterPaymentList from "@/app/components/masters/payment/payment";
import MasterKecamatan from "@/app/components/masters/region/kecamatan";
import MasterVillage from "@/app/components/masters/region/village";

// Utils
import { formatPrice } from "@/utils/function/price";

// Interface
type Form = {
  category: number;
  code: string;
  product_name: string;
  description: string;
  details: string;
  discount: number;
  is_colors: boolean;
  is_ready: boolean;
  is_variants: boolean;
  price: number;
  colors: string[]; // final payload
  variants: string[]; // final payload
};

const initialForm: Form = {
  category: 0,
  code: "",
  product_name: "",
  description: "",
  details: "",
  discount: 0,
  is_colors: true,
  is_ready: true,
  is_variants: true,
  price: 0,
  colors: [],
  variants: [],
};

// Confirm Modal
const { confirm } = Modal;

// CODE
export default function CreateOrderPage() {
  const router = useRouter();

  // STATE
  const [dataSubmit, setDataSubmit] = useState(null);
  const [cart, setCart] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState({
    province: null,
    city: null,
    camat: null,
    village: null,
  });

  const [open, setOpen] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  // FORM
  const [form] = Form.useForm();

  // Handle Payment
  const getPayment = (value: any) => {
    console.log(value);

    form.setFieldsValue({
      payment_type: value.id,
    });
  };

  const handleSubmit = async (values: any) => {
    const _body = values;
    const _address =
      _body?.address +
      ", " +
      _body.village +
      ", " +
      _body.camat +
      ", " +
      _body.city +
      ", " +
      _body.province;

    const body = {
      address: _address,
      customer_name: _body.customer_name,
      email: _body.email,
      payment_status: 0,
      payment_type: _body.payment_type,
      phone_number: _body.phone_number,
      total_harga: subtotal,
      total_order: cart.length,
      status_order: 1,
      shipment: 0,
      is_service: true,
    };

    console.log("Submitting product payload:", body);

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

          try {
            const results = await orderDetailsService.create(details);

            console.log("Res details: ", results);

            const encoded = btoa(JSON.stringify(res));
            router.push(`/success?d=${encoded}`);
          } catch (error: any) {
            console.log(error);
          } finally {
            setTimeout(() => {
              setLoadingBtn(false);
            }, 1000);
          }
        }
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoadingBtn(false);
      }, 1000);
    }
  };

  // Handle Province
  const getProvince = (value: any) => {
    console.log(value);

    setAddress({
      province: value?.id,
      city: address.city,
      camat: address.camat,
      village: address.village,
    });

    form.setFieldsValue({
      province: value.value,
    });
  };

  // Handle City
  const getCity = (value: any) => {
    console.log(value);

    setAddress({
      province: address.province,
      city: value.id,
      camat: address.camat,
      village: address.village,
    });

    form.setFieldsValue({
      city: value.value,
    });
  };

  // Handle Camat
  const getCamat = (value: any) => {
    console.log(value);

    setAddress({
      province: address.province,
      city: address.city,
      camat: value.id,
      village: address.village,
    });

    form.setFieldsValue({
      camat: value.value,
    });
  };

  // Handle Village
  const getVillage = (value: any) => {
    console.log(value);

    setAddress({
      province: address.province,
      city: address.city,
      camat: address.camat,
      village: value.id,
    });

    form.setFieldsValue({
      village: value.value,
    });
  };

  // Handle Open
  const handleOpen = () => {
    setOpen(true);
  };

  // Handle Close
  const handleClose = () => {
    setOpen(false);
  };

  // Handle Cancel
  const handleCancel = () => {
    router.push("/orders/ongoing");
  };

  // Handle Selected
  const handleSelected = (value: any) => {
    const _data = value;

    console.log("Any: ", _data);

    const subtotal = (_data ?? []).reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0
    );
    const discount = _data.reduce(
      (current: any, init: any) =>
        current + (init.discount || 0) * init.quantity,
      0
    );
    setCart(_data);
    setDiscount(discount);
    setSubtotal(subtotal);
    setTotal(subtotal - discount);

    form.setFieldsValue({
      total_harga: subtotal,
      total_order: _data?.length ?? 0,
      discount: discount,
    });
  };

  // ON FINISH
  const onFinish = (data: any) => {
    console.log("Finish: ", data);

    setLoadingBtn(true);
    showModalConfirm(data);
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
      title: `Are you sure want to Create a New Service Order?`,
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

  return (
    <div className="p-6">
      <Breadcrumb
        items={["Orders", "Ongoing", "Create"]}
        path={["/orders", "/orders/ongoing", "/orders/ongoing/create"]}
      />

      <h1 className="text-2xl font-semibold mb-6">Creates New Orders</h1>

      <Form
        className="space-y-4 bg-white p-6 rounded-lg text-black"
        layout="vertical"
        form={form}
        scrollToFirstError
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: "20px 10px" }}
      >
        <Col
          span={24}
          style={{
            padding: "10px 15px",
          }}
        >
          <Row gutter={30} justify="space-around">
            <Col span={12}>
              <Form.Item
                name="customer_name"
                label="Customer Name"
                rules={[
                  { required: true, message: "Please, input Customer Name!" },
                ]}
              >
                <Input placeholder="Customer Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="email"
                label="E-Mail"
                rules={[{ required: true, message: "Please, input E-Mail!" }]}
              >
                <Input placeholder="E-Mail" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={30} justify="space-around">
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please, input Phone Number!" },
                ]}
              >
                <Input placeholder="Phone Number" style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="payment_type"
                label={"Payment"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Payment Type!",
                  },
                ]}
              >
                <MasterPaymentList getPayment={getPayment} pay="" />
              </Form.Item>

              <Form.Item name="payment_id" label="Payment ID" hidden>
                <InputNumber className="w-full" placeholder="Payment ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="start" gutter={30}>
            <Col span={12}>
              <Form.Item
                name="province"
                label={<span className="text-black">Province</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select a Province!",
                  },
                ]}
              >
                <MasterProvince getProvince={getProvince} prov="" />
              </Form.Item>

              <Form.Item
                name="city"
                label={<span className="text-black">Kabupaten/Kota</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select a Kabupaten/Kota!",
                  },
                ]}
              >
                <MasterCity
                  prov_id={address.province}
                  getCity={getCity}
                  prov=""
                />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Full Address!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={2}
                  allowClear
                  showCount
                  placeholder="Address"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="camat"
                label={<span className="text-black">Kecamatan</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select a Kecamatan!",
                  },
                ]}
              >
                <MasterKecamatan
                  city_id={address.city}
                  getCamat={getCamat}
                  prov=""
                />
              </Form.Item>

              <Form.Item
                name="village"
                label={<span className="text-black">Kelurahan/Desa</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select a Kelurahan/Desa!",
                  },
                ]}
              >
                <MasterVillage
                  camat_id={address.camat}
                  getVillage={getVillage}
                  prov=""
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" gutter={30}>
            <Col span={8}>
              <Form.Item name="total_order" label="Total Item">
                <InputNumber
                  min={0}
                  formatter={(value: any) => {
                    return formatPrice(value);
                  }}
                  readOnly
                  placeholder="Price"
                  addonBefore={"Rp"}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="total_harga" label="Total Price">
                <InputNumber
                  min={0}
                  formatter={(value: any) => {
                    return formatPrice(value);
                  }}
                  readOnly
                  placeholder="Price"
                  addonBefore={"Rp"}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="discount" label="Discount">
                <InputNumber
                  min={0}
                  placeholder="Discount"
                  addonBefore={"Rp"}
                  formatter={(value: any) => {
                    return formatPrice(value);
                  }}
                  readOnly
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider
            className="form-divider"
            orientation="center"
            orientationMargin={0}
            style={{ margin: "15px 0px", borderColor: "#000000" }}
          >
            Service
          </Divider>

          <div className="w-full">
            <div className="flex justify-end items-center mb-4 gap-4">
              <button
                onClick={handleOpen}
                className="flex items-center gap-2 px-3 py-2 text-white bg-green-700 rounded hover:bg-green-600  transition cursor-pointer"
              >
                <FiPlusCircle /> Add Service
              </button>
            </div>
          </div>

          <div className="border border-gray-600 bg-gray-100 p-6 rounded-lg lg:sticky lg:top-20 self-start h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item: any) => (
                <div
                  key={`${item?.name}-${item?.variant}`}
                  className="flex justify-between items-center"
                >
                  <div className="w-[450px] flex items-center gap-3">
                    <Image
                      src={item?.image || "error"}
                      alt={item?.name || ""}
                      className="w-14 h-14 object-cover"
                      fallback="data:image/png;base64,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"
                      preview={false}
                      height={70}
                    />
                    <div>
                      <p>{item.name}</p>

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

              <div className="flex justify-between">
                <span>Discount</span>
                <span>{formatPrice(discount)}</span>
              </div>

              <div className="border-t border-gray-700 my-4" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="border-t border-gray-700 my-4" />
            </div>
          </div>

          <Divider
            className="form-divider"
            style={{ margin: "15px 0px", background: "#000000" }}
          />

          <Row
            justify="end"
            className="flex items-center justify-end gap-3 pt-2"
          >
            <Button onClick={handleCancel} type="default" icon={<PiXCircle />}>
              Cancel
            </Button>

            <Button
              loading={loadingBtn}
              htmlType="submit"
              type="primary"
              color="green"
              variant="solid"
              icon={<PiPlusCircle />}
            >
              Create
            </Button>
          </Row>
        </Col>
      </Form>

      <ServiceItemsModal
        isClose={handleClose}
        isOpen={open}
        dataSelected={handleSelected}
        initialSelected={cart}
      />
    </div>
  );
}
