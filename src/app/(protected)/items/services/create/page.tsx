"use client";

// REACT COMPONENTS
import { useState } from "react";
import { useRouter } from "next/navigation";

// ANTD Components
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
} from "antd";
import {
  PiMinus,
  PiPlus,
  PiPlusCircle,
  PiTrash,
  PiX,
  PiXCircle,
} from "react-icons/pi";

// SERVICES
import { Services, servicesService } from "@/api/services/service/service";

// Components
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import MasterCategoryService from "@/app/components/masters/category/categoryService";

// Utils
import { formatPrice } from "@/utils/function/price";

type Form = {
  category: number;
  code: string;
  service_name: string;
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
  service_name: "",
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
export default function CreateServicePage() {
  const router = useRouter();
  // STATE
  const [dataSubmit, setDataSubmit] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [colors, setColors] = useState([""]);
  const [variants, setVariants] = useState([""]);

  // helper state for comma-separated inputs
  const [colorsInput, setColorsInput] = useState<string>("");
  const [variantsInput, setVariantsInput] = useState<string>("");

  // FORM
  const [form] = Form.useForm();

  const handleAddColor = () => setColors([...colors, ""]);
  const handleAddVariant = () => setVariants([...variants, ""]);

  // GET CATEGORY
  const getCategory = (value: any) => {
    console.log("Category: ", value);

    form.setFieldsValue({
      category_id: value.id,
      category: value?.value,
    });
  };

  const handleSubmit = async (values: any) => {
    console.log("Submitting product payload:", values);

    try {
      const body: Services = {
        category: values?.category_id,
        code: values?.code,
        // colors: values?.colors?.length > 0 ? values.colors : [],
        description: values?.description,
        details: values?.details,
        discount: values?.discount,
        // is_colors: values?.colors?.length > 0 ? true : false,
        is_ready: values?.is_ready,
        is_variants: values?.variants?.length > 0 ? true : false,
        price: values.price,
        service_name: values?.service_name,
        // variants: values?.variants?.length > 0 ? values.variants : [],
      };

      const res = await servicesService.create(body);

      console.log("Res Create: ", res);
      router.push("/items/services");
    } catch (error) {
    } finally {
      setLoadingBtn(false);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setColorsInput("");
    setVariantsInput("");
    router.push("/items/services");
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
      title: `Are you sure want to Create a new Data Service ${
        _data.service_name || " - "
      }?`,
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
        items={["Items", "Service", "Create"]}
        path={["/items", "/items/services", "/items/services/create"]}
      />

      <h1 className="text-2xl font-semibold mb-6">Creates New Services</h1>

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
          <Form.Item
            name="service_name"
            label="Service Name"
            rules={[
              { required: true, message: "Please input Service's Name!" },
            ]}
          >
            <Input placeholder="Service's Name" />
          </Form.Item>

          <Form.Item
            name="code"
            label="Code"
            rules={[
              { required: true, message: "Please input Service's Code!" },
            ]}
          >
            <Input placeholder="Code" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input category!" }]}
          >
            <MasterCategoryService
              category={""}
              getCategory={getCategory}
              isDisable={false}
            />
          </Form.Item>

          <Form.Item name="category_id" label="Category ID" hidden>
            <InputNumber className="w-full" placeholder="Category ID" />
          </Form.Item>

          <Row justify="center" gutter={30}>
            <Col span={12}>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  rows={2}
                  allowClear
                  showCount
                  placeholder="Description"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="details" label="Details">
                <Input.TextArea
                  rows={2}
                  allowClear
                  showCount
                  placeholder="Details"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" gutter={30}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input Price!" }]}
              >
                <InputNumber
                  min={0}
                  formatter={(value: any) => {
                    return formatPrice(value);
                  }}
                  placeholder="Price"
                  addonBefore={"Rp"}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="discount" label="Discount">
                <InputNumber
                  min={0}
                  placeholder="Discount"
                  addonBefore={"Rp"}
                  formatter={(value: any) => {
                    return formatPrice(value);
                  }}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item label="Colors">
            <Form.List
              name="colors"
              rules={[
                {
                  validator: async (_, colors) => {
                    if (!colors || colors.length === 0) {
                      return Promise.reject(
                        new Error("Please add at least one color!")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: "Please input color name!",
                          },
                        ]}
                      >
                        <Input placeholder="Color name" />
                      </Form.Item>
                      <Button
                        shape="circle"
                        color="danger"
                        variant="solid"
                        icon={<PiTrash onClick={() => remove(name)} />}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      variant="solid"
                      color="green"
                      onClick={() => add()}
                      icon={<PiPlus />}
                      className="text-white border-gray-500"
                    >
                      Add Color
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item label="Variants">
            <Form.List name="variants">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: "Please input color name!",
                          },
                        ]}
                      >
                        <Input placeholder="Color name" />
                      </Form.Item>
                      <Button
                        shape="circle"
                        color="danger"
                        variant="solid"
                        icon={<PiTrash onClick={() => remove(name)} />}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      variant="solid"
                      color="green"
                      onClick={() => add()}
                      icon={<PiPlus />}
                      className="text-white border-gray-500"
                    >
                      Add Variant
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item> */}

          <Form.Item
            label="Service Ready?"
            name="is_ready"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Row
            justify="end"
            className="flex items-center justify-end gap-3 pt-2"
          >
            <Button
              onClick={handleCancel}
              variant="solid"
              color="danger"
              icon={<PiXCircle />}
            >
              Cancel
            </Button>

            <Button
              loading={loadingBtn}
              htmlType="submit"
              type="primary"
              icon={<PiPlusCircle />}
            >
              Create
            </Button>
          </Row>
        </Col>
      </Form>
    </div>
  );
}
