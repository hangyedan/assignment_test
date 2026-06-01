import { useEffect, useState } from "react";
import { fetchJobIds, fetchJobDetail } from "./api/getJob";

const PAGE_SIZE = 6;

type Job = {
  id: number;
  by: string;
  time: number;
  title: string;
  url?: string;
  type: string;
  score?: number;
};

export default function JobBoard() {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    const ids = await fetchJobIds();
    setJobIds(ids);
    loadMore(ids, 0);
  }

  async function loadMore(ids: number[] = jobIds, currentPage: number = page) {
    setLoading(true);

    try {
      const start = currentPage * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      const pageIds = ids.slice(start, end);

      const jobsData = await Promise.all(
        pageIds.map((id) => fetchJobDetail(id)),
      );

      setJobs((prev) => [...prev, ...jobsData]);
      setPage((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                {job.title}
              </a>
            ) : (
              <span>{job.title}</span>
            )}
            <div style={{ display: "flex", gap: "5px", color: "gray" }}>
              <div>By {job.by}</div>/
              <div>{new Date(job.time * 1000).toLocaleDateString()}</div>
            </div>
          </li>
        ))}
      </ul>

      {jobs.length < jobIds.length && (
        <button disabled={loading} onClick={() => loadMore()}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
