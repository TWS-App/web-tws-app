// METADATA
export const metadata = {
  title: "Admins | Settings",
  alternates: {
    canonical: "https://yhusan-digital.com/settings",
  },
};

// PAGE COMPONENTS
import MasterClientLayout from "./layout.client";

// CODE
export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MasterClientLayout>{children}</MasterClientLayout>;
}
