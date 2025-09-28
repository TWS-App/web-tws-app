import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableServiceCategory from "@/app/components/tables/master/category/service/table";

import Link from "next/link";
import { FaBox, FaTags, FaTools } from "react-icons/fa";

export default function CategoryProductPage() {
  return (
    <div>
      <Breadcrumb items={["Settings", "Master Data", "Category Service"]} />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <FaTags />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          SERVICE CATEGORY
        </span>
      </h1>

      <TableServiceCategory />
    </div>
  );
}
