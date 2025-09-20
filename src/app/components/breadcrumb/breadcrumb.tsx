import Link from "next/link";

export default function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="text-sm text-gray-400 mb-4">
      {items.map((item, idx) => (
        <span key={idx}>
          {idx > 0 && " / "}
          {idx === items.length - 1 ? (
            <span className="text-white">{item}</span>
          ) : (
            <Link href="#" className="hover:underline">
              {item}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
