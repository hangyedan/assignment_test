# No 2. useQuery

## 문제 링크

- [GreatFrontEnd - useQuery](https://www.greatfrontend.com/questions/javascript/use-query?language=js&tab=coding)

<br />

## 문제 설명

데이터 페칭 등에 사용할 수 있으며, 프로미스(Promise)의 상태 변화를 관리하는 `useQuery` 커스텀 훅을 구현하세요.

### 사용 예시

```javascript
export default function Component({ param }) {
  const request = useQuery(async () => {
    const response = await getDataFromServer(param);
    return response.data;
  }, [param]);

  if (request.status === 'loading') {
    return <p>Loading...</p>;
  }

  if (request.status === 'error') {
    return <p>Error: {request.error.message}</p>;
  }

  return <p>Data: {request.data}</p>;
}
```

<br />

## 인자 (Arguments)

- **`fn`**: `() => Promise`
  - 프로미스를 반환하는 함수입니다.
- **`deps`**: `DependencyList` (기본값: `[]`)
  - `useEffect`의 두 번째 인자와 유사한 의존성 배열입니다. `useEffect`와 달리 기본값은 빈 배열(`[]`)입니다.

<br />

## 반환 값 (Returns)

프로미스의 상태에 따라 서로 다른 프로퍼티를 가진 객체를 반환해야 합니다.

- **Pending (대기 상태)**
  - `status`: `'loading'`
- **Fulfilled (성공 상태)**
  - `status`: `'success'`
  - `data`: `fn`이 반환한 프로미스가 이행(resolve)되었을 때의 결과 데이터
- **Rejected (실패 상태)**
  - `status`: `'error'`
  - `error`: 프로미스가 거부(reject)되었을 때의 에러(`Error`) 객체

<br />

## 제공된 기본 코드

```typescript
/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {import("react").DependencyList} deps
 */
export default function useQuery(fn, deps = []) {
  throw 'Not implemented';
}
```

<br />

## 테스트 케이스 (Test Cases)

GreatFrontEnd 플랫폼에서 [Run] 버튼을 클릭할 때 실행되는 테스트 케이스입니다. 아래 코드를 참고하여 요구사항을 만족하도록 구현하세요.

- **참고:** 로컬 환경에 테스트 세팅이 되어있지 않다면, 해당 코드를 통해 요구사항(상태 변화 및 반환 값 구조)을 파악한 후 웹사이트에서 코드를 실행해 검증하는 것을 권장합니다.

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import useQuery from './use-query';

describe('useQuery', () => {
  test('return values', () => {
    const { result } = renderHook(() => useQuery(async () => true));

    expect(typeof result.current).toBe('object');
    expect(result.current).toHaveProperty('status');
  });

  test('loading state', () => {
    const { result } = renderHook(() => useQuery(async () => true));

    expect(result.current.status).toBe('loading');
  });

  test('success state', async () => {
    const { result } = renderHook(() => useQuery(async () => 10));

    await waitFor(() => {
      expect(result.current).toEqual({
        status: 'success',
        data: 10,
      });
    });
  });

  test('error state', async () => {
    const error = new Error('error');

    const { result } = renderHook(() =>
      useQuery(async () => {
        throw error;
      }),
    );

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        status: 'error',
        error,
      });
    });
  });
});
```
