import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import TableServices from "@/app/components/tables/services/Table";
import Link from "next/link";
import { FaTools } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumb items={["Items", "Service"]} />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <FaTools />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          SERVICE LIST
        </span>
      </h1>

      <div className="flex justify-end items-center mb-6">
        <Link
          href="/items/services/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          + Add New Service
        </Link>
      </div>

      <TableServices />
    </div>
  );
}
