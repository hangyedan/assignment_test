> 11번째 과제는 DiceRoller 와 UseMediatedState 중 한 가지를 선택해 풀어주세요.

# No 11. UseMediatedState

## 문제 링크

- [GreatFrontEnd - UseMediatedState](https://www.greatfrontend.com/questions/javascript/use-mediated-state?language=js&tab=coding)

<br />

## 문제 설명

useState와 유사하지만, 상태가 업데이트될 때마다 실행되는 매개자(mediator) 함수를 지원하는 useMediatedState 훅을 구현하십시오. 이 매개자 함수는 상태 업데이트를 변환하거나 가로채는 데 사용할 수 있습니다.

## 예시

```
const replaceMultipleSpaces = (s) => s.replace(/[\s]+/g, ' ');

export default function Component() {
  const [state, setState] = useMediatedState(replaceMultipleSpaces, '');

  return (
    <div>
      <div>You will not be able to enter more than one space</div>
      <input
        type="text"
        min="0"
        max="10"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}

```


## 인수

- `중개자(mediator)`: 새로운 상태를 받아 변환된 상태를 반환하는 함수입니다. 이 함수는 다음 두 가지 형태를 가질 수 있습니다:

  - `(newState: T) => T`: setState에 의해 전달된 새로운 상태(new state)라는 하나의 인자를 받아 최종 상태를 반환하는 형태, 또는

  - `(newState: T, dispatch) => void`: `setState`에 의해 전달된 새로운 상태와 상태 업데이트를 실제로 실행할 `dispatch` 함수라는 두 개의 인자를 받는 형태입니다. 반환값은 없습니다.

- `initialState`: 초기 상태 값

**참고**: `매개자(mediator)`는 다른 함수로 변경되더라도 동일하게 유지되어야 합니다.

## 반품

이 훅은 두 개의 요소를 가진 배열을 반환합니다:

- 현재 상태

- 상태를 업데이트하는 `setState` 함수. 이 함수는 `useState`가 반환하는 배열의 두 번째 요소와 동일한 값 및 업데이트 함수 형식을 받아들입니다.

기본적으로 이 훅은 `useState`와 동일한 값을 반환합니다.

## 참고 사항

- setState에 전달된 업데이트 함수는 가장 최근의 이전 상태를 기준으로 평가되어야 합니다.

- 훅에 전달된 첫 번째 매개자 함수는, 이후 렌더링에서 다른 함수가 전달되더라도 계속 활성화된 상태를 유지해야 합니다.

- 인자가 하나인 매개자는 요청된 상태를 변환하여 최종 상태를 반환합니다.

- 인자가 두 개인 매개자는 제공된 디스패치 함수를 호출하여 업데이트를 제어합니다.

<br />

## 기본 제공 코드

```
import { Dispatch, SetStateAction } from 'react';

interface StateMediator<S = unknown> {
  (newState: S): S;
  (newState: S, dispatch: Dispatch<SetStateAction<S>>): void;
}

export default function useMediatedState<S = unknown>(
  mediator: StateMediator<S>,
  initialState?: S,
): [S, Dispatch<SetStateAction<S>>] {
  throw 'Not implemented';
}
```

