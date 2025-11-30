// METADATA
export const metadata = {
  title: "Dashboard",
  alternates: {
    canonical: "https://yhusan-digital.com/dashboard",
  },
};

// PAGE COMPONENTS
import DashboardClientLayout from "./layout.client";

// CODE
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
