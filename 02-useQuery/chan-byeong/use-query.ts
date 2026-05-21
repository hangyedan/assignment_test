import { type DependencyList, useState, useEffect, useRef } from "react";

type AsyncState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export default function useQuery<T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" });
  const isReTriggered = useRef<boolean>(false);

  useEffect(() => {
    let isProcessing = true;
    if (isReTriggered.current) setState({ status: "loading" });

    fn()
      .then((data: T) => {
        if (isProcessing) setState({ status: "success", data });
      })
      .catch((error: Error) => {
        if (isProcessing) setState({ status: "error", error });
      });

    return () => {
      isReTriggered.current = true;
      isProcessing = false;
    };
  }, deps);

  return state;
}
