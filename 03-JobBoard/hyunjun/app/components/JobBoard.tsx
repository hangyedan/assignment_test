"use client";

import { useSearchParams } from "next/navigation";
import { useGetDetails } from "../hooks/useGetDetails";
import { useGetIds } from "../hooks/useGetIds";

export interface JobItem {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
}

const JobBoard = ({
  initialIds,
  initialJobs,
}: {
  initialIds: number[];
  initialJobs: JobItem[];
}) => {
  const { data } = useGetIds(initialIds);
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 6;

  return (
    <div>
      {data?.slice(0, limit).map((id: number) => {
        const initialJob = initialJobs.find((job) => job.id === id);
        return <JobBoardItem key={id} id={id} initialJob={initialJob} />;
      })}
    </div>
  );
};

export default JobBoard;

function JobBoardItem({
  id,
  initialJob,
}: {
  id: number;
  initialJob?: JobItem;
}) {
  const { data, isLoading } = useGetDetails(id, initialJob);

  const date = data?.time
    ? new Date(data.time * 1000).toLocaleString("en-US", {
        timeZone: "UTC",
      })
    : "";
  const href = data?.url ?? "#";

  if (isLoading) {
    return <div>Loading.....</div>;
  }
  return (
    <a href={href} target="_blank">
      <div className="border-gray-400 border rounded-lg p-4 bg-white my-4">
        <h3 className="text-xl font-bold">{data?.title}</h3>
        <p className="text-gray-800">
          By {data?.by} {date}
        </p>
      </div>
    </a>
  );
}
