"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoadMoreButton = () => {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 6;

  return (
    <Link
      href={`/?limit=${limit + 6}`}
      className="bg-orange-500 text-white p-2 rounded-lg cursor-pointer hover:bg-amber-600"
    >
      Load more jobs
    </Link>
  );
};

export default LoadMoreButton;
