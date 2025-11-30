// METADATA
export const metadata = {
  title: "Invoice",
  description: "Invoice hasil pembelian atau jasa service dari Yhusan Digital.",
  alternates: {
    canonical: "https://yhusan-digital.com/invoice",
  },
};

// PAGE COMPONENTS
import InvoiceClientLayout from "./layout.client";

// CODE
export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InvoiceClientLayout>{children}</InvoiceClientLayout>;
}
