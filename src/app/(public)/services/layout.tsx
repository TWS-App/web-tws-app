// METADATA
export const metadata = {
  title: "Services",
  description: "Solusi perbaikan TWS anda untuk berbagai kerusakan.",
  alternates: {
    canonical: "https://yhusan-digital.com/services",
  },
};

// PAGE COMPONENTS
import ServicesClientLayout from "./layout.client";

// CODE
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServicesClientLayout>{children}</ServicesClientLayout>;
}
