import { useState } from "react";

/**
 * @template T
 * @param {Function} mediator
 * @param {T | undefined} initialState
 */
export default function useMediatedState<T>(
  mediator: Function,
  initialState: T | undefined,
) {
  const [state, setState] = useState<T | undefined>(initialState);

  const update = (newState: T | ((prev: T) => T)) => {
    const nextState =
      typeof newState === "function" ? (newState as Function)(state) : newState;
    const mediatedState = mediator(nextState, setState);

    if (mediatedState !== undefined) {
      setState(mediatedState);
    }
  };

  return [state, update] as const;
}
