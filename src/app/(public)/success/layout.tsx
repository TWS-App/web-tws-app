// METADATA
export const metadata = {
  title: "Success Order",
  alternates: {
    canonical: "https://yhusan-digital.com/success",
  },
};

// PAGE COMPONENTS
import SuccessClientLayout from "./layout.client";

// CODE
export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuccessClientLayout>{children}</SuccessClientLayout>;
}
