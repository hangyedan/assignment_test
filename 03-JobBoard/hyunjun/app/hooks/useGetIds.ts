import { useQuery } from "@tanstack/react-query";
import { getJobIds } from "../api/api";

export const useGetIds = (initialIds?: number[]) => {
  return useQuery({
    queryKey: ["jobIds"],
    queryFn: getJobIds,
    initialData: initialIds,
  });
};
