"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Props {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onContinue: () => void;
  disabled?: boolean;
}

export default function CheckoutSection({
  title,
  children,
  isActive,
  onContinue,
  disabled,
}: Props) {
  const [open, setOpen] = useState(isActive);

  return (
    <div className="bg-gray-800 text-white rounded-lg mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full px-6 py-4 font-semibold text-left bg-gray-700 hover:bg-gray-600 transition rounded-t-lg"
      >
        {title}
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {open && (
        <div className="p-6 space-y-4 border-t border-gray-600">
          {children}

          <button
            onClick={onContinue}
            disabled={disabled}
            className={`w-full mt-4 py-2 rounded-md transition ${
              disabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
