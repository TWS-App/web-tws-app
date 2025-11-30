// REACTS
import { ThemeProvider } from "@/context/themes/ThemeContext";

// Page Components
import Navbar from "@/app/components/navbar/navbar";
import Sidebar from "@/app/components/sidebar/sidebar";
import SalesChart from "@/app/components/charts/sales";
import TableProducts from "@/app/components/tables/products/Table";

// CODE
export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <ThemeProvider>
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </ThemeProvider>
    </div>
  );
}
