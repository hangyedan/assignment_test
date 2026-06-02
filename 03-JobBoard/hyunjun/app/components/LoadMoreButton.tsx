"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoadMoreButton = ({ totalCount }: { totalCount: number }) => {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 6;

  const hasMore = limit < totalCount;

  if (!hasMore) {
    return null;
  }

  const nextLimit = Math.min(limit + 6, totalCount);

  return (
    <Link
      href={`/?limit=${nextLimit}`}
      scroll={false}
      className="bg-orange-500 text-white p-2 rounded-lg cursor-pointer hover:bg-amber-600"
    >
      Load more jobs
    </Link>
  );
};

export default LoadMoreButton;
