import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TablePayments from "@/app/components/tables/master/payment/Table";
import { BsCreditCard2BackFill } from "react-icons/bs";

export default function CategoryProductPage() {
  return (
    <div>
      <Breadcrumb items={["Settings", "Master Data", "Payment List"]} />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <BsCreditCard2BackFill />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          PAYMENT LIST
        </span>
      </h1>

      <TablePayments />
    </div>
  );
}
