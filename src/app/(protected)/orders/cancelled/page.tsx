import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableOrders from "@/app/components/tables/orders/table";
import { GiCancel } from "react-icons/gi";

export default function OrderCancelPage() {
  return (
    <div>
      <Breadcrumb
        items={["Orders", "Cancelled"]}
        path={["/orders", "/orders/cancelled"]}
      />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <GiCancel />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          ORDER CANCELLED
        </span>
      </h1>

      <TableOrders />
    </div>
  );
}
