# No 5. useArray

## 문제 링크

- [GreatFrontEnd - useArray](https://www.greatfrontend.com/questions/javascript/use-array?language=js&tab=coding)

<br />

## 문제 설명

추가 유틸리티 메서드를 제공하는 배열 관리용 `useArray` 훅을 구현하세요.

일반적인 `useState`를 사용하는 것보다 `useArray`를 사용하는 것이 더 편리합니다. `useState`를 사용할 경우, 항상 새로운 배열을 생성하고, 변경한 다음, 새 배열을 사용하도록 상태를 설정해야 하므로 상당히 번거롭습니다.

이 훅은 모든 유형의 배열에서 범용적으로 작동해야 합니다.

### 사용 예시

```typescript
const defaultValue = ['apple', 'banana'];

export default function Component() {
  const { array, push, update, remove, filter, set, clear } =
    useArray(defaultValue);

  return (
    <div>
      <p>Fruits: {array.join(', ')}</p>
      <button onClick={() => push('orange')}>Add orange</button>
      <button onClick={() => update(1, 'grape')}>
        Change second item to grape
      </button>
      <button onClick={() => remove(0)}>Remove first</button>
      <button onClick={() => filter((fruit) => fruit.includes('a'))}>
        Keep fruits containing 'a'
      </button>
      <button onClick={() => set(defaultValue)}>Reset</button>
      <button onClick={clear}>Clear list</button>
    </div>
  );
}
```

<br />

## 인수 (Arguments)

- 기본값: 초기 항목 배열

<br />

## 반환값 (Returns)

이 훅은 다음과 같은 속성을 가진 객체를 반환합니다.

- `array`: 현재 항목 배열
- `set: (newArray) => void`: 항목 배열을 설정하는 함수입니다. `useState`의 setter 함수와 동일한 유형이어야 합니다.
- `push: (item) => void`: 배열의 끝에 항목을 추가하는 함수
- `remove: (index: number) => void`: `index`를 사용하여 배열에서 항목을 제거하는 함수
- `filter: (predicate) => void`: 조건 함수를 기반으로 배열을 필터링하는 함수입니다. `predicate`는 `Array.prototype.filter`의 인수와 동일한 유형이어야 합니다.
- `update: (index: number, newItem) => void`: `index`의 배열 항목을 새 항목으로 바꾸는 함수
- `clear: () => void`: 배열을 비우는 함수

<br />

## 기본 제공 코드

```typescript
import { Dispatch, SetStateAction } from 'react';

interface UseArrayReturn<T> {
  array: T[];
  set: Dispatch<SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export default function useArray<T>(defaultValue: T[]): UseArrayReturn<T> {
  throw 'Not implemented';
}
```

<br />

## 테스트 코드

```
import { act, renderHook } from '@testing-library/react';

import useArray from './use-array';

describe('useArray', () => {
  test('return types', () => {
    const { result } = renderHook(() => useArray([]));

    expect(result.current.array).toBeInstanceOf(Array);
    expect(typeof result.current.set).toBe('function');
    expect(typeof result.current.push).toBe('function');
    expect(typeof result.current.filter).toBe('function');
    expect(typeof result.current.update).toBe('function');
    expect(typeof result.current.remove).toBe('function');
    expect(typeof result.current.clear).toBe('function');
  });

  test('initial state', () => {
    const initialValue = [1, 2, 3];

    const { result } = renderHook(() => useArray(initialValue));

    expect(result.current.array).toEqual(initialValue);
  });

  test('push element', () => {
    const initialValue = [1, 2, 3];

    const { result } = renderHook(() => useArray(initialValue));

    act(() => {
      result.current.push(4);
    });

    expect(result.current.array).toEqual(initialValue.concat(4));
  });

  test('filter elements', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4]));

    act(() => {
      result.current.filter((n) => n % 2 === 0);
    });

    expect(result.current.array).toEqual([2, 4]);
  });

  test('update element', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.update(1, 4);
    });

    expect(result.current.array).toEqual([1, 4, 3]);
  });

  test('remove element', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.array).toEqual([1, 3]);
  });

  test('clear array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.clear();
    });

    expect(result.current.array).toEqual([]);
  });
});
```
