// METADATA
export const metadata = {
  title: "Products | Yhusan Digital",
  description: "Semua produk TWS terbaik dari Yhusan Digital.",
  alternates: {
    canonical: "https://yhusan-digital.com/products",
  },
};

// PAGE COMPONENTS
import ProductsClientLayout from "./layout.client";

// CODE
export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductsClientLayout>{children}</ProductsClientLayout>;
}
