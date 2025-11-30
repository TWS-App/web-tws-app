// METADATA
export const metadata = {
  title: "Admins | Orders",
  alternates: {
    canonical: "https://yhusan-digital.com/orders",
  },
};

// PAGE COMPONENTS
import OrderClientLayout from "@/app/(public)/order/layout.client";

// CODE
export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrderClientLayout>{children}</OrderClientLayout>;
}
