"use client";

// REACT COMPONENTS
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NextResponse } from "next/server";

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
  message,
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
  PiFileFill,
  PiPlus,
  PiPlusCircle,
  PiTrash,
  PiUploadDuotone,
  PiXCircle,
} from "react-icons/pi";

// SERVICE
import { Services, servicesService } from "@/api/services/service/service";
import { imageServices } from "@/api/services/image/service";

// Master
import MasterCategoryService from "@/app/components/masters/category/categoryService";

// Utils
import { formatPrice } from "@/utils/function/price";
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";

// Notifications
import { notifyWarning } from "@/utils/notification/notifications";

interface CustomUploadFile extends UploadFile {
  order_view?: number;
}

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
export default function EditService() {
  // React
  const { id } = useParams();
  const router = useRouter();

  // STATE
  const [data, setData] = useState<Services>();
  const [fileList, setFileList] = useState<CustomUploadFile[]>([]);

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
      const result = await servicesService.getById(_id);
      await fetchImage(id);

      console.log("Edit: ", result);

      if (!result) {
        NextResponse.rewrite(new URL("/errorpage/not-found"));
      }

      setData(result);

      form.setFieldsValue({
        category: result?.category,
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
        service_name: result?.service_name,
      });
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
          console.log("Image: ", resImg, items, id);
          return items?.service_id == id;
        });

        console.log("MAPPED: ", map);
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
    try {
      const body: Services = {
        category: values?.category_id || values?.category,
        code: values?.code,
        description: values?.description,
        details: values?.details,
        discount: values?.discount,
        // is_colors: values?.colors?.length > 0 ? true : false,
        is_ready: values?.is_ready,
        is_variants: values?.variants?.length > 0 ? true : false,
        price: values.price,
        service_name: values?.service_name,
        // variants: values?.variants?.length > 0 ? values.variants : [],
        // colors: values?.colors?.length > 0 ? values.colors : [],
      };

      const result = await servicesService.update(values.id, body);

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
      title: `Are you sure want to update Data "${
        values?.service_name || " - "
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

  // Handle Delete
  const handleBeforeDelete = async (value: any) => {
    console.log("Delete: ", value);

    return new Promise<boolean>((resolve) => {
      confirm({
        title: "Are you sure want to Delete this Image?",
        // content: "This image will be removed.",
        okText: "Delete",
        cancelText: "Cancel",
        centered: true,
        onOk: () => {
          handleDelete(value);
        },
        onCancel: () => resolve(false),
      });
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
    router.push("/items/services");
  };

  const handleUploadChange = ({
    fileList,
  }: {
    fileList: CustomUploadFile[];
  }) => {
    setFileList(fileList);
  };

  // Handle Update
  const handleUpdateSingleImage = async (file: any) => {
    setLoading(true);
    const img_id = file.id;
    const product_id = Number(id) > 0 ? Number(id) : data?.id;
    const payload = {
      id: file?.id,
      file_name: file?.file_name,
      file_path: file?.file_path,
      mime_type: file?.mime_type,
      order_view: file?.order_view,
      product_id: file?.product_id,
      service_id: file?.service_id,
      uploaded_at: file?.uploaded_at,
      url: file?.url,
    };

    console.log("File: ", file);
    console.log("Body Upload: ", payload);

    if (img_id) {
      try {
        await imageServices.update(img_id, payload);
        fetchImage(product_id);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle upload to API
  const handleUpload = async () => {
    setUploading(true);
    try {
      const product_id = Number(id) > 0 ? Number(id) : data?.id;

      for (const file of fileList) {
        if (file.originFileObj) {
          await imageServices.uploadService(
            file.originFileObj as File,
            Number(product_id),
            file?.order_view || 0
          );
        }
      }

      fetchImage(product_id);
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (file: any) => {
    console.log("Files: ", file);

    try {
      if (file?.id > 0) {
        await imageServices.delete(file.id);
      }

      return true;
    } catch (err) {
      console.error("Delete error:", err);
      message.error("Failed to delete image. Please try again!");
      return false;
    }
  };

  // Preview Image
  const handlePreview = async (file: CustomUploadFile) => {
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
        items={["Items", "Service", "Edit"]}
        path={["/items", "/items/services", "/items/services/edit"]}
      />

      <h1 className="text-2xl font-semibold mb-6">Edit Service</h1>
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

          {/* <Row justify="space-around" gutter={30}>
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
                                  message: "Please input color name!",
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
          </Row> */}

          <Form.Item
            label="Service Ready?"
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
            {`Service's Images`}
          </Divider>

          <Form.Item label="Image">
            <Upload
              multiple
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onPreview={handlePreview}
              onChange={handleUploadChange}
              onRemove={handleBeforeDelete}
              itemRender={(originNode, file: any) => {
                let error = false;
                const isDuplicate = fileList.some(
                  (f) => f.uid !== file.uid && f.order_view === file.order_view
                );

                return (
                  <div className="flex flex-col items-center">
                    {originNode}

                    <Typography.Text type="secondary" style={{ fontSize: 10 }}>
                      Order View
                    </Typography.Text>

                    <InputNumber
                      min={0}
                      max={10000}
                      size="small"
                      value={file.order_view ?? 0}
                      onChange={(value) => {
                        if (value === null || value === undefined) {
                          setFileList((prev) =>
                            prev.map((f) =>
                              f.uid === file.uid
                                ? { ...f, order_view: value }
                                : f
                            )
                          );
                          return;
                        }

                        // Cek apakah value sudah dipakai image lain
                        const duplicate = fileList.some(
                          (f) => f.uid !== file.uid && f.order_view === value
                        );

                        if (duplicate) {
                          error = true;
                          message.error(
                            `Order ${value} sudah digunakan gambar lain.`
                          );
                          return;
                        }

                        // Jika aman → update normal
                        setFileList((prev) =>
                          prev.map((f) =>
                            f.uid === file.uid ? { ...f, order_view: value } : f
                          )
                        );
                      }}
                      style={{ marginTop: 6, width: 70 }}
                    />

                    {isDuplicate && (
                      <Typography.Text
                        type="danger"
                        style={{ fontSize: 10, marginTop: 4 }}
                      >
                        Order sudah digunakan
                      </Typography.Text>
                    )}

                    {file?.originFileObj ? null : (
                      <Button
                        onClick={() => handleUpdateSingleImage(file)}
                        variant="solid"
                        color="volcano"
                        disabled={error}
                        style={{
                          marginTop: 6,
                        }}
                      >
                        Update
                      </Button>
                    )}
                  </div>
                );
              }}
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
                marginTop: 100,
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
              icon={<PiPlusCircle />}
            >
              Update
            </Button>
          </Row>
        </Col>
      </Form>
    </div>
  );
}
