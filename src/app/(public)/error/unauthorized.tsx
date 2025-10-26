"use client";

// REACT
import Link from "next/link";

// Antd Components
import { Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { IoHome } from "react-icons/io5";

// Code
export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center text-white bg-gray-900">
      <LockOutlined style={{ fontSize: 60, color: "#faad14" }} />
      <h1 className="text-3xl font-bold mt-4">401 - Unauthorized</h1>
      <p className="text-gray-400 mt-2">
        You don’t have permission to access this page.
      </p>
      <Link href="/" className="mt-6">
        <Button icon={<IoHome size={24} />} type="primary">Homepage</Button>
      </Link>
    </div>
  );
}
