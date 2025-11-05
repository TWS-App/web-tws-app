"use client";

// REACTS
import { useEffect } from "react";
import Link from "next/link";

// Antd Components
import { Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { IoHome } from "react-icons/io5";

// CODE
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("💥 Internal Server Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center text-white bg-gray-900">
      <WarningOutlined style={{ fontSize: 60, color: "#ff7875" }} />
      <h1 className="text-3xl font-bold mt-4">500 - Internal Server Error</h1>
      <p className="text-gray-400 mt-2">
        Something went wrong while loading this page.
      </p>
      <div className="mt-6 flex gap-3">
        <Button type="primary" onClick={() => reset()}>
          Try Again
        </Button>

        <Link href="/">
          <Button icon={<IoHome size={24} />} type="primary">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
