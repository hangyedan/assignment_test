import { useEffect, useState, type DependencyList } from 'react';

// 소요시간: 2시간(1차) + 40분(2차)

type useQueryProps = {
  fn: () => Promise<null>;
  deps: DependencyList;
};

export default function useQuery({ fn, deps = [] }: useQueryProps) {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      setData(null);
      setError({});
      try {
        const result = await fn();

        setData(result);
        setStatus('success');
      } catch {
        setStatus('error');
        setError(Error);
      }
    };

    fetchData();
  }, [...deps]);

  return { status, data, error };
}
