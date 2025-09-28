import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import SalesChart from "@/app/components/charts/sales";
import { FaClock, FaDollarSign, FaShoppingCart, FaUsers } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const dataCard = [
  {
    title: "Clients This Month",
    value: "6,389",
    color: "bg-orange-500",
    icon: <FaUsers />,
  },
  {
    title: "Monthly Revenue",
    value: "46,760,000",
    color: "bg-green-500",
    icon: <FaDollarSign />,
  },
  {
    title: "Ongoing Orders",
    value: "35",
    color: "bg-cyan-500",
    icon: <FaClock />,
  },
  {
    title: "Product Solds",
    value: "376",
    color: "bg-blue-500",
    icon: <FaShoppingCart />,
  },
];

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumb items={["Dashboard"]} />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <IoHome />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          DASHBOARD
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {dataCard.map((item) => (
          <div className="flex items-center gap-4 bg-gray-900 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <div
              key={item.title}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color} text-white`}
            >
              {item.icon}
            </div>

            <div>
              <p key={item.title} className="text-sm text-gray-400">{item.title}</p>
              <h3 key={item.title} className="text-xl font-semibold text-gray-100">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-800 rounded-lg shadow overflow-x-auto mb-6">
        <h2 className="text-lg font-semibold mb-4 text-white dark:text-yellow-300">
          Ongoing Orders
        </h2>

        <table className="w-full text-left">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Amount (Rp)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-700">
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">250.990</td>
              <td className="px-6 py-4 text-green-400">On Shipping</td>
              <td className="px-6 py-4">2025-09-20</td>
            </tr>
            <tr className="border-t border-gray-700">
              <td className="px-6 py-4">Jane Smith</td>
              <td className="px-6 py-4">500.000</td>
              <td className="px-6 py-4 text-amber-300">Order</td>
              <td className="px-6 py-4">2025-09-19</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <SalesChart />
      </div>
    </div>
  );
}
