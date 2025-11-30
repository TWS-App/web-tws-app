// METADATA
export const metadata = {
  title: "Track Order",
  alternates: {
    canonical: "https://yhusan-digital.com/tracking",
  },
};

// PAGE COMPONENTS
import TrackingClientLayout from "./layout.client";

// CODE
export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TrackingClientLayout>{children}</TrackingClientLayout>;
}
