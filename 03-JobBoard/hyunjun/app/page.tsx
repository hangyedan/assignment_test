import { getJobDetails, getJobIds } from "./api/api";
import JobBoard from "./components/JobBoard";
import LoadMoreButton from "./components/LoadMoreButton";

export default async function App({
  searchParams,
}: {
  searchParams: Promise<{ limit?: number }>;
}) {
  const { limit = 6 } = await searchParams;
  const ids = await getJobIds();
  const initialIds = ids.slice(0, limit);
  const initialJobs = await Promise.all(
    initialIds.map((id: number) => getJobDetails(id)),
  );

  return (
    <div className=" bg-yellow-50 h-screen mx-auto max-w-3xl">
      <h1 className="text-orange-500 font-bold text-3xl py-4">
        Hacker News Jobs Board
      </h1>
      <JobBoard initialIds={ids} initialJobs={initialJobs} />
      <LoadMoreButton totalCount={ids.length} />
    </div>
  );
}
