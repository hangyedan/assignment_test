import { useEffect, useState, type DependencyList } from 'react';

// 소요시간: 2시간(1차) + ...
/**
 * 해결해야할 것
 * 1. useEffect내부 setState
 * 2. data를 어떻게 가져올 수 있을지?
 * 3. deps 미사용
 */

type useQueryProps = {
  fn: () => void;
  deps: DependencyList;
};

export default function useQuery({ fn, deps = [] }: useQueryProps) {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState('');
  const [error, setError] = useState({});

  useEffect(() => {
    fn();
    try {
      setStatus('success');
      setData();
    } catch {
      setStatus('error');
      setError(Error);
    } finally {
      setStatus('loading');
      setData('');
      setError({});
    }
  }, [fn]);

  return { status, data, error };
}
