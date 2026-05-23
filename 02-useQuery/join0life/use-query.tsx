/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {import("react").DependencyList} deps
 */

import { useEffect, useState } from "react";

type FnType<T> = () => Promise<T>;
type DepsType = import("react").DependencyList;

type ResultType = {
  status: "loading" | "success" | "error";
  data?: number | null;
  error?: Error | null;
};

export default function useQuery<T>(
  fn: FnType<T>,
  deps: DepsType = [],
): ResultType {
  const [result, setResult] = useState<ResultType>({
    status: "loading",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fn();
        setResult({
          status: "success",
          data: null,
        });

        return data;
      } catch (error) {
        setResult({
          status: "error",
          error: error as Error,
        });
      }
    };
    fetch();
  }, [...deps]);

  return result;
}
