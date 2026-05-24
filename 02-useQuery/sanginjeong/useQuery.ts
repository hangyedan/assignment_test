import { useEffect, useState, type DependencyList } from "react";

type ResponseType<T> =
  | { status: "loading"; data: null }
  | { status: "success"; data: T }
  | { status: "error"; error: unknown };

export const useQuery = <T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
): ResponseType<T> => {
  const [response, setResponse] = useState<ResponseType<T>>({
    status: "loading",
    data: null,
  });

  useEffect(() => {
    setResponse({ status: "loading", data: null });
    fn()
      .then((res) => {
        setResponse({ status: "success", data: res });
      })

      .catch((rej) => {
        setResponse({ status: "error", error: rej });
      });
  }, deps);

  return response;
};
