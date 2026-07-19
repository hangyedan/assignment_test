import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string): boolean {
  const [mediaQueryMatch, setMediaQueryMatch] = useState<boolean>(
    window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMediaQueryMatch(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return mediaQueryMatch;
}
