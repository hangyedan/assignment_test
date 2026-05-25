import { useEffect, useState, type DependencyList } from 'react';

// 소요시간: 2시간(1차) + 40분(2차)
// 수정: 30분

type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

export default function useQuery<T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fn();
        setState({ status: 'success', data: result });
      } catch (error) {
        if (error instanceof Error) {
          setState({ status: 'error', error });
          return;
        }

        setState({
          status: 'error',
          error: new Error('알 수 없는 에러가 발생했습니다.'),
        });
      }
    };

    fetchData();
  }, [...deps]);

  return state;
}
