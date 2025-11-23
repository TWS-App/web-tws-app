// Antd Components
import { IoBagCheck } from "react-icons/io5";

// Import Page Components
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableOrderFinish from "@/app/components/tables/orders/finish/Table";

// CODE
export default function OrderFinishedPage() {
  return (
    <div>
      <Breadcrumb
        items={["Orders", "Finished"]}
        path={["/orders", "/orders/finished"]}
      />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <IoBagCheck />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          ORDER FINISHED
        </span>
      </h1>

      <TableOrderFinish />
    </div>
  );
}
