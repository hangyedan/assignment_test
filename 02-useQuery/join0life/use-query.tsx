/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {import("react").DependencyList} deps
 */

import { useEffect, useState, type DependencyList } from "react";

type FnType<T> = () => Promise<T>;
type DepsType = DependencyList;

type ResultType<T> = {
  status: "loading" | "success" | "error";
  data?: T;
  error?: Error;
};

export default function useQuery<T>(
  fn: FnType<T>,
  deps: DepsType = [],
): ResultType<T> {
  const [result, setResult] = useState<ResultType<T>>({
    status: "loading",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fn();
        setResult({
          status: "success",
          data: data,
        });

        return data;
      } catch (error) {
        setResult({
          status: "error",
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    };
    fetch();
  }, [...deps]);

  return result;
}
