// Antd Components
import { FaSyncAlt } from "react-icons/fa";

// Import Page Components
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableOrders from "@/app/components/tables/orders/table";

// CODE
export default function OrderOngoingPage() {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 overflow-x-hidden">
      <Breadcrumb
        items={["Orders", "Ongoing"]}
        path={["/orders", "/orders/ongoing"]}
      />

      <div className="w-full">
        <h1
          className="w-full flex flex-col sm:flex-row items-center 
          justify-center sm:justify-start gap-2 sm:gap-3 
                 text-lg sm:text-2xl font-semibold border rounded-lg 
                 p-4 sm:p-6 mb-4 sm:mb-6 
                 text-gray-800 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 text-center sm:text-left shadow-sm"
        >
          <div className="text-blue-500 dark:text-blue-500 text-2xl sm:text-3xl">
            <FaSyncAlt />
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-200">
            ORDER ACTIVE
          </span>
        </h1>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <TableOrders />
      </div>
    </div>
  );
}
