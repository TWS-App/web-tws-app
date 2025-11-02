"use client";

// REACT COMPONENTS
import React, { useEffect, useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";

// Antd Componetns
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import {
  PiArrowsClockwiseBold,
  PiCheckCircle,
  PiFileFill,
  PiPlus,
  PiPlusCircle,
  PiTrash,
  PiUploadDuotone,
  PiXCircle,
} from "react-icons/pi";

// SERVICE
import { Products, productServices } from "@/api/services/product/product";
import { imageServices } from "@/api/services/image/service";

// Master
import MasterCategoryProduct from "@/app/components/masters/category/categoryProduct";

// Utils
import { formatPrice } from "@/utils/function/price";

// Notifications
import { notifyWarning } from "@/utils/notification/notifications";
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Modals
const { confirm } = Modal;

// CODE
export default function EditProduct() {
  // React
  const { id } = useParams();
  const router = useRouter();

  // STATE
  const [data, setData] = useState<Products>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Boolean
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  // FORMS
  const [form] = Form.useForm();

  // USE EFFECTS
  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  // FETCH DETAILS
  const fetchDetails = async (values: any) => {
    setLoading(true);

    console.log("ID: ", values, id);
    const _id = values > 0 ? values : id;

    try {
      const result = await productServices.getById(_id);
      await fetchImage(id);

      console.log("Edit: ", result);

      if (!result) {
        redirect("/error/not-found");
      } else {
        setData(result);

        form.setFieldsValue({
          category: result?.category_name,
          category_id: result?.category_id,
          code: result?.code,
          colors: result?.colors?.length > 0 ? result.colors : [],
          variants: result?.variants?.length > 0 ? result.variants : [],
          description: result?.description,
          details: result?.details,
          discount: result?.discount,
          is_colors: result.is_color,
          is_ready: result.is_ready,
          is_variants: result.is_variants,
          price: result.price,
          product_name: result?.product_name,
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Fetch Images
  const fetchImage = async (id: any) => {
    try {
      const resImg: [] = await imageServices.getAll();

      if (resImg) {
        const map = resImg.filter((items: any) => {
          // console.log("Image: ", resImg, items, id);
          return items?.product_id == id;
        });

        // console.log("MAPPED: ", map);
        setFileList(map);
      } else {
        setFileList([]);
      }
    } catch (error) {}
  };

  // GET CATEGORY
  const getCategory = (value: any) => {
    console.log("Category: ", value);

    form.setFieldsValue({
      category_id: value.id,
      category: value?.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (values: any) => {
    const _id = values?.id ? values.id : id;

    try {
      const body: Products = {
        category: values?.category_id || data?.category,
        code: values?.code,
        description: values?.description,
        details: values?.details,
        discount: values?.discount,
        is_colors: values?.colors?.length > 0 ? true : false,
        is_ready: values?.is_ready,
        is_variants: values?.variants?.length > 0 ? true : false,
        price: values.price,
        product_name: values?.product_name,
        variants: values?.variants?.length > 0 ? values.variants : [],
        colors: values?.colors?.length > 0 ? values.colors : [],
        versions: values?.versions?.length > 0 ? values.versions : [],
      };

      const result = await productServices.update(_id, body);

      console.log("Update Result: ", result);

      handleClose();
      // if (onRefresh) {
      //   onRefresh(true);
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBtn(false);
    }
  };

  // SHOW MODALS
  const showModalConfirm = async (values: any) => {
    setLoadingBtn(true);

    confirm({
      className: "modals-confirm",
      title: `Are you sure want to update category "${
        values?.product_name || " - "
      }"?`,
      okText: "Confirm",
      cancelText: "Cancel",
      centered: true,
      onOk() {
        handleSubmit(values);
      },
      onCancel() {
        setLoadingBtn(false);
      },
      okButtonProps: { className: "submit-btn", type: "primary" },
      cancelButtonProps: { className: "cancel-btn", type: "default" },
      width: 700,
    });
  };

  // Handle Close
  const handleClose = () => {
    form.resetFields();

    router.push("/items/products");
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

    notifyWarning("Incomplete!", errors);
  };

  // Handle Cancel
  const handleCancel = () => {
    router.push("/items/products");
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  // Handle upload to API
  const handleUpload = async () => {
    setUploading(true);
    try {
      const product_id = Number(id) > 0 ? Number(id) : data?.id;

      for (const file of fileList) {
        if (file.originFileObj) {
          await imageServices.upload(
            file.originFileObj as File,
            Number(product_id)
          );
        }
      }

      fetchImage(product_id);
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  // Preview Image
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Breadcrumb
        items={["Items", "Product", "Edit"]}
        path={["/items", "/items/products", "/items/products/edit"]}
      />

      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
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
            name="product_name"
            label="Product Name"
            rules={[
              { required: true, message: "Please input Product's Name!" },
            ]}
          >
            <Input placeholder="Product's Name" />
          </Form.Item>

          <Form.Item
            name="code"
            label="Code"
            rules={[
              { required: true, message: "Please input Product's Code!" },
            ]}
          >
            <Input placeholder="Code" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input category!" }]}
          >
            <MasterCategoryProduct
              category={String(data?.category)}
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

          <Divider
            className="form-divider"
            style={{ margin: "15px 0px", background: "#EBEDF3" }}
          />

          <Row justify="space-around" gutter={30}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item label="Colors">
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
                        <Row key={key} style={{ display: "flex" }} gutter={30}>
                          <Col span={12}>
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
                              <Input placeholder="Color's name" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Button
                              shape="circle"
                              color="danger"
                              variant="solid"
                              icon={<PiTrash onClick={() => remove(name)} />}
                            />
                          </Col>
                        </Row>
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
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item label="Variants">
                <Form.List name="variants">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Row key={key} style={{ display: "flex" }} gutter={30}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={name}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input variants name!",
                                },
                              ]}
                            >
                              <Input placeholder="Color name" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Button
                              shape="circle"
                              color="danger"
                              variant="solid"
                              icon={<PiTrash onClick={() => remove(name)} />}
                            />
                          </Col>
                        </Row>
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
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Product Ready?"
            name="is_ready"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Divider
            className="form-divider"
            orientation="left"
            orientationMargin={1}
            style={{ margin: "15px 0px", borderColor: "#EBEDF3" }}
          >
            {`Product's Images`}
          </Divider>

          <Form.Item label="Image">
            <Upload
              multiple
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onPreview={handlePreview}
              onChange={handleUploadChange}
            >
              <div className="flex flex-col items-center justify-center h-full hover:text-blue-700">
                <PiUploadDuotone
                  size={24}
                  className="mt-5 text-blue-500 hover:text-blue-700"
                />
                <div className="mt-2">Upload</div>
              </div>
            </Upload>

            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}

            <Button
              type="primary"
              color="geekblue"
              variant="solid"
              loading={uploading}
              onClick={handleUpload}
              disabled={fileList.length === 0}
              style={{
                marginTop: 12,
              }}
            >
              {uploading ? "Uploading..." : "Upload to Server"}
            </Button>
          </Form.Item>

          <Divider
            className="form-divider"
            style={{ margin: "15px 0px", background: "#EBEDF3" }}
          />

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
              onClick={fetchDetails}
              variant="solid"
              color="cyan"
              icon={<PiArrowsClockwiseBold />}
            >
              Refresh
            </Button>

            <Button
              loading={loadingBtn}
              htmlType="submit"
              type="primary"
              icon={<PiCheckCircle />}
            >
              Update
            </Button>
          </Row>
        </Col>
      </Form>
    </div>
  );
}
