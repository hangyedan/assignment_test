> 11번째 과제는 DiceRoller 와 UseMediatedState 중 한 가지를 선택해 풀어주세요.

# No 11. DiceRoller


## 문제 링크

- [GreatFrontEnd - DiceRoller](https://www.greatfrontend.com/questions/user-interface/dice-roller?language=js&tab=coding)

<br />

## 문제 설명

지정된 개수의 6면 주사위를 굴렸을 때의 결과를 시뮬레이션하는 주사위 굴리기 앱을 만들어 보세요.

## 요구 사항

- 사용자는 입력 필드를 통해 굴릴 주사위 개수를 지정할 수 있으며, 값은 1부터 12까지(1과 12 포함)의 정수여야 합니다.

- “굴리기” 버튼을 클릭하면 주사위 굴리기가 시뮬레이션되고 결과가 표시됩니다.

- 주사위 굴림 결과는 3개씩 한 행으로 표시되어야 합니다.

아래 예시는 주사위 6개를 굴렸을 때 나올 수 있는 결과 중 하나를 보여줍니다.
<img width="1029" height="874" alt="image" src="https://github.com/user-attachments/assets/a193e817-22e7-42c4-9dfc-845e8c527f6f" />


## 출처

이 문제는 [FrontendEval의 ‘주사위 굴리기’ 문제](https://frontendeval.com/questions/rolling-dice)를 각색한 것입니다.

<br />

## 기본 제공 코드

```
import { useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('Hello World!');

  return <div>{message}</div>;
}
```
