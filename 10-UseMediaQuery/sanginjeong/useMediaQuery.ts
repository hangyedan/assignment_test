import { useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const changeEvent = (e: MediaQueryListEvent) => setMatches(e.matches);
    const matchMediaQuery = window.matchMedia(query);
    matchMediaQuery.addEventListener("change", changeEvent);

    return () => matchMediaQuery.removeEventListener("change", changeEvent);
  }, [query]);

  return matches;
}
