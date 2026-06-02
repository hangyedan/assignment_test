import { useQuery } from "@tanstack/react-query";
import { getJobDetails } from "../api/api";
import { JobItem } from "../components/JobBoard";

export const useGetDetails = (id: number, initialJob?: JobItem) => {
  return useQuery({
    queryKey: ["jobDetails", id],
    queryFn: () => getJobDetails(id),
    initialData: initialJob,
  });
};
