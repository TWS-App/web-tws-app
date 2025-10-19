import { notification } from "antd";

const duration = 15;

export const notifySuccess = (message: string, description?: string) => {
  notification.success({
    message: message,
    description: description,
    placement: "bottomRight",
    closable: true,
    type: "success",
    duration: duration,
  });
};

export const notifyError = (message: string, description?: string) => {
  console.log("Errors: ", message, description);
  notification.error({
    message: message,
    description: description,
    placement: "bottomRight",
    closable: true,
    type: "error",
    duration: duration,
  });
};

export const notifyWarning = (message: string, description?: string) => {
  notification.warning({
    message: message,
    description: description,
    placement: "top",
    closable: true,
    type: "warning",
    duration: duration,
  });
};