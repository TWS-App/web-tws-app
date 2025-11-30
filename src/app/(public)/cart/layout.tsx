// METADATA
export const metadata = {
  title: "Carts",
  alternates: {
    canonical: "https://yhusan-digital.com/cart",
  },
};

// PAGE COMPONENTS
import CartClientLayout from "./layout.client";

// CODE
export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartClientLayout>{children}</CartClientLayout>;
}
