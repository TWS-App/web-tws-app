import Link from "next/link";

// INTERFACE
interface Props {
  items: any[];
  path: any[];
  children?: React.ReactNode;
}

// CODE
export default function Breadcrumb({ items, path }: Props) {
  return (
    <nav className="text-sm text-gray-400 mb-4">
      {items.map((item, idx) => (
        <span key={idx}>
          {idx > 0 && " / "}
          {idx === items.length - 1 ? (
            <span className="text-white">{item}</span>
          ) : (
            <Link href={path[idx] ?? "#"} className="hover:underline">
              {item}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
