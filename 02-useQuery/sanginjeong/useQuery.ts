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
    let flag = false;
    setResponse({ status: "loading" });
    fn()
      .then((res) => {
        if (!flag) {
          setResponse({ status: "success", data: res });
        }
      })

      .catch((rej) => {
        if (!flag) {
          setResponse({ status: "error", error: rej });
        }
      });

    return () => {
      flag = true;
    };
  }, deps);

  return response;
};

export default useQuery;
