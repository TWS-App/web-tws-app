import { notification } from "antd";

export const notifySuccess = (message: string, description?: string) => {
  notification.success({
    message,
    description,
    placement: "bottomRight",
  });
};

export const notifyError = (message: string, description?: string) => {
  notification.error({
    message,
    description,
    placement: "bottomRight",
  });
};

export const notifyWarning = (message: string, description?: string) => {
  notification.warning({
    message,
    description,
    placement: "top",
  });
};

export const handleApiError = (
  error: any,
  defaultMessage = "Request failed"
) => {
  console.error(error);
  const message =
    error?.response?.data?.message || error.message || defaultMessage;
    
  notification.error({
    message: "Error",
    description: message,
  });
};
