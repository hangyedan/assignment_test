import { useEffect, useState, type DependencyList } from "react";

type ResultType<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export default function useQuery<T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
) {
  const [result, setResult] = useState<ResultType<T>>({
    status: "loading",
  });

  useEffect(() => {
    setResult({ status: "loading" });

    fn()
      .then((data: T) => {
        setResult({ status: "success", data });
      })
      .catch((error) => setResult({ status: "error", error }));
  }, deps);

  return result;
}
