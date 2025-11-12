"use client";

// Reacts
import Link from "next/link";

// Antd Components
import { Button, Result } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { IoHome } from "react-icons/io5";

// CODE
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center text-white bg-gray-900">
      <div className="container flex flex-col justify-center items-center border-2 w-3/4 h-3/4 m-auto bg-amber-50 rounded-2xl">
        <Result
          status={"500"}
          title="404 - Page Not Found"
          subTitle={
            <p className="text-gray-900 mt-2">
              The page you're looking for doesn’t exist or has been moved.
            </p>
          }
          extra={[
            <Link key="home" href="/" className="mt-6">
              <Button icon={<IoHome size={24} />} type="primary">
                Go Back Home
              </Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
}
