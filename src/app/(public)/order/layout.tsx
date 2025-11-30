// METADATA
export const metadata = {
  title: "Create Order",
  alternates: {
    canonical: "https://yhusan-digital.com/order",
  },
};

// PAGE COMPONENTS
import OrderClientLayout from "./layout.client";

// CODE
export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrderClientLayout>{children}</OrderClientLayout>;
}
