// REACTS
import { LiaShippingFastSolid } from "react-icons/lia";

// Page Components
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableShipments from "@/app/components/tables/master/shipment/Table";

// CODE
export default function CategoryProductPage() {
  return (
    <div>
      <Breadcrumb
        items={["Settings", "Master Data", "Shipment List"]}
        path={["/settings", "/settings/master", "settings/master/shipments"]}
      />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <LiaShippingFastSolid />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          SHIPMENT LIST
        </span>
      </h1>

      <TableShipments />
    </div>
  );
}
