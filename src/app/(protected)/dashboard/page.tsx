import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumb items={["Dashboard"]} />

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Example cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow">Card 1</div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">Card 2</div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">Card 3</div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">Card 4</div>
      </div>

      {/* Example table */}
      <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-700">
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">$999.99</td>
              <td className="px-6 py-4 text-green-400">Success</td>
              <td className="px-6 py-4">2025-09-20</td>
            </tr>
            <tr className="border-t border-gray-700">
              <td className="px-6 py-4">Jane Smith</td>
              <td className="px-6 py-4">$500.00</td>
              <td className="px-6 py-4 text-red-400">Failed</td>
              <td className="px-6 py-4">2025-09-19</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
