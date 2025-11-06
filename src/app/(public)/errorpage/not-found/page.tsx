"use client";

// Reacts
import Link from "next/link";

// Antd Components
import { Button } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { IoHome } from "react-icons/io5";

// CODE
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center text-white bg-gray-900">
      <FrownOutlined style={{ fontSize: 60, color: "#ff4d4f" }} />
      <h1 className="text-3xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-gray-400 mt-2">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className="mt-6">
        <Button icon={<IoHome size={24} />} type="primary">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
