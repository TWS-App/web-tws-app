// REACT
import React, { useEffect, useState } from "react";

// ANTD Components
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Typography,
} from "antd";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { PiFileFill } from "react-icons/pi";

// SERVICES
import { Shipment } from "@/app/components/tables/master/shipment/types/types";
import { masterShipmentServices } from "@/api/services/master/shipment";

// UTILS

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
export default function ModalMasterShipment({
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
  const [data, setData] = useState<Shipment>();

  // FORMS
  const [form] = Form.useForm();

  // USE EFFECTS
  useEffect(() => {
    if (isOpen) {
      console.log("Data Edit: ", dataEdit);

      if (dataEdit?.id > 0) {
        fetchDetails(dataEdit);
      } else {
        setOpen(true);
      }
    } else {
      setOpen(false);
    }
  }, [isOpen, dataEdit?.name]);

  // FETCH DATA DETAILS
  const fetchDetails = async (value: any) => {
    setOpen(true);
    setLoading(true);

    try {
      const result = await masterShipmentServices.getById(value?.id);

      console.log("Fetch res: ", result);

      setData(result);

      if (value?.name) {
        handleFormField(value);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Fields
  const handleFormField = (value: any) => {
    form.setFieldsValue({
      name: value?.name,
      shipment_number: value?.shipment_number,
      description: value.description,
      id: value?.id,
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
      title: `Are you sure want to ${
        isEdit ? "Update" : "Create a new Data"
      } Master Shipment ${_data?.name ?? " - - - "}?`,
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

  // Handle Close
  const handleClose = () => {
    form.resetFields();
    setLoadingBtn(false);

    setOpen(false);
    isClose(false);
  };

  // Handle Submit
  const handleSubmit = async (value: any) => {
    if (isEdit) {
      try {
        const body = value;
        const id = Number(data?.id);
        delete body["id"];

        const result = await masterShipmentServices.update(id, body);

        console.log("Update res: ", result);

        handleClose();
        onRefresh(true);
      } catch (err) {
      } finally {
        setLoadingBtn(false);
      }
    } else {
      try {
        const result = await masterShipmentServices.create(value);

        console.log("Create res: ", result);

        handleClose();
        onRefresh(true);
      } catch (err) {
      } finally {
        setLoadingBtn(false);
      }
    }
  };

  return (
    <>
      <Modal
        title={
          <>
            <Row className="modal-title-row" justify="start" align="middle">
              <PiFileFill
                className="modal-icon"
                style={{
                  color: "#3699FF",
                  fontSize: 24,
                }}
              />
              <Typography style={{ marginLeft: 15 }}>
                {isEdit ? "EDIT SHIPMENT" : "ADD NEW SHIPMENT"}
              </Typography>
            </Row>
          </>
        }
        centered
        open={open}
        onCancel={handleClose}
        loading={loading}
        closable
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
          <Form.Item
            name="name"
            label="Shipment's Name"
            rules={[
              {
                required: true,
                message: "Please, Input Shipment's Name!",
              },
            ]}
          >
            <Input placeholder="Shipment's Name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea showCount placeholder="Descriptions" rows={3} />
          </Form.Item>

          <Form.Item name="id" label="ID" hidden>
            <InputNumber placeholder="ID" />
          </Form.Item>

          <Divider
            className="divider-form"
            style={{ margin: "15px 0px 10px", background: "#EBEDF3" }}
          />

          <Row justify="end" align="middle">
            <Button
              icon={<IoCloseCircle />}
              type="primary"
              danger
              onClick={handleClose}
              style={{
                marginRight: 15,
              }}
            >
              {`Cancel`}
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loadingBtn}
              icon={<IoCheckmarkCircle />}
            >
              {`Submit`}
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
