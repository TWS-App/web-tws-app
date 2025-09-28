"use client";

import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export default function SalesChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

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
      markers: {
        size: 5,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        labels: {
          style: { colors: "#03a9f4" }, 
        },
      },
      yaxis: {
        labels: {
          style: { colors: "#03a9f4" },
        },
      },
      legend: {
        position: "top",
        labels: {
          colors: "#ffffff",
        },
      },
      colors: ["#3b82f6", "#10b981"], // blue-500, green-500
      grid: {
        borderColor: "#e5e7eb",
      },
      tooltip: {
        theme: "dark"
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-white dark:text-yellow-300">
        Sales Overview
      </h2>
      <div ref={chartRef} />
    </div>
  );
}
