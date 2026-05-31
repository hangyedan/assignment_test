import { useEffect, useState } from "react";
import JobList from "./JobList";
import { getJob } from "./getJob";

const Component = () => {
  const [ids, setIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    const nextCursor = cursor + 6;

    if (nextCursor >= ids.length) {
      setHasNext(false);
    }

    setIsLoading(true);
    setCursor(nextCursor);
    const slicedIds = ids.slice(cursor, cursor + 6);
    const response = await Promise.all(slicedIds.map((id) => getJob(id)));
    setJobs((prev) => [...prev, ...response]);
    setIsLoading(false);
  };

  useEffect(() => {
    const getIds = async () => {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json",
      );

      const data = await response.json();
      setIds(data);
    };
    getIds();
  }, []);

  useEffect(() => {
    if (ids.length === 0) return;
    if (ids.length <= 6) {
      setHasNext(false);
    }
    const getInitialJobList = async () => {
      setIsLoading(true);
      const initialIds = ids.slice(0, 6);
      const response = await Promise.all(initialIds.map((id) => getJob(id)));
      setJobs(response);
      setIsLoading(false);
    };
    getInitialJobList();
  }, [ids]);

  return (
    <div>
      <JobList data={jobs} />
      {hasNext && (
        <button onClick={handleFetch} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load more jobs"}
        </button>
      )}
    </div>
  );
};

export default Component;
