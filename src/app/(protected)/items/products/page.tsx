import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableProducts from "@/app/components/tables/products/Table";
import { FiShoppingBag } from "react-icons/fi";

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumb items={["Items", "Product"]} />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <FiShoppingBag />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          PRODUCT LIST
        </span>
      </h1>

      <TableProducts />
    </div>
  );
}
