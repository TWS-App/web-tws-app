"use client";

import { useEffect, useRef } from "react";

export default function SalesChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || typeof window === "undefined") return;

    async function loadChart() {
      const ApexCharts = (await import("apexcharts")).default;

      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "line",
          height: 350,
          toolbar: { show: false },
        },
        series: [
          {
            name: "Products",
            data: [120, 200, 150, 220, 300, 250, 400],
          },
          {
            name: "Services",
            data: [80, 100, 90, 140, 180, 160, 200],
          },
        ],
        stroke: {
          curve: "smooth",
          width: 3,
        },
        markers: { size: 5 },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          labels: { style: { colors: "#6b7280" } },
        },
        yaxis: {
          labels: { style: { colors: "#6b7280" } },
        },
        legend: {
          position: "top",
          labels: { colors: "#ffffff" }, // gray-700
        },
        colors: ["#3b82f6", "#10b981"],
        grid: { borderColor: "#e5e7eb" },
        tooltip: { theme: "dark" },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }

    loadChart();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-yellow-300">
        Sales Overview
      </h2>
      <div ref={chartRef} />
    </div>
  );
}
