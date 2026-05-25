import { useEffect, useState, type DependencyList } from 'react';

// 소요시간: 2시간(1차) + 40분(2차)

type useQueryProps = {
  fn: () => Promise<null>;
  deps: DependencyList;
};

export default function useQuery({ fn, deps = [] }: useQueryProps) {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      setData(null);
      setError(undefined);
      try {
        const result = await fn();

        setData(result);
        setStatus('success');
      } catch {
        setStatus('error');
        const error = new Error('error');
        setError(error);
      }
    };

    fetchData();
  }, [...deps]);

  return { status, data, error };
}
