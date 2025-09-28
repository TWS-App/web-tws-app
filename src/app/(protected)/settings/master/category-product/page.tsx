import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableProductCategory from "@/app/components/tables/master/category/product/table";
import { FaBox, FaTools } from "react-icons/fa";

export default function CategoryProductPage() {
  return (
    <div>
      <Breadcrumb items={["Settings", "Master Data", "Category Product"]} />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <FaBox />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          CATEGORY PRODUCT
        </span>
      </h1>

      <TableProductCategory />
    </div>
  );
}
