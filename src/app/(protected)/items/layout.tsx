// METADATA
export const metadata = {
  title: "Admins | Items",
  alternates: {
    canonical: "https://yhusan-digital.com/items",
  },
};

// PAGE COMPONENTS
import ItemsClientLayout from "./layout.client";

// CODE
export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ItemsClientLayout>{children}</ItemsClientLayout>;
}
