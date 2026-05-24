import { useEffect, useState, type DependencyList } from "react";

type ResponseType<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: unknown };

const useQuery = <T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
): ResponseType<T> => {
  const [response, setResponse] = useState<ResponseType<T>>({
    status: "loading",
  });

  useEffect(() => {
    setResponse({ status: "loading" });
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

export default useQuery;
