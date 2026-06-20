# 한계단 과제 테스트 스터디 🪜

> 프론트엔드 개발자 6명이 모여, 실제 기업 과제 테스트 수준의 문제를 각자 설계하고 구현한 뒤,
> 서로의 코드를 리뷰하며 **"왜 이렇게 설계했는가"를 설명하는 능력**을 기르기 위해 만든 스터디입니다.
> 스터디원은 모두 프론트엔드 신입 개발자입니다.

<br />

## 📌 스터디를 시작한 이유

채용 과제 테스트는 정답이 하나가 아닙니다. 같은 요구사항이라도 상태 관리 방식, 컴포넌트 분리 기준, 예외 처리 방식에 따라 결과물의 완성도가 크게 달라집니다. 저희는 이 점에 주목해 다음 두 가지 큰 동기로 스터디를 시작했습니다.

**1. 스스로 설계하는 능력을 기르기 위해**

1-1. **AI에 의존하지 않고 나만의 설계를 하는 연습:** AI에게 코드를 받아 적용하면 빠르게 결과물을 만들 수 있지만, 그 코드가 "왜" 그렇게 짜였는지에 대한 고민은 생략되기 쉽습니다. AI 사용을 번역이나 개념 학습 보조로 제한하고, 구조와 로직은 직접 고민해서 짜는 것을 원칙으로 삼았습니다.

1-2. **의사결정을 반복하며 나만의 설계 기준을 쌓는 것:** 같은 문제라도 상태를 어디에 둘지, 컴포넌트를 어떻게 나눌지, 예외 상황을 어떻게 처리할지는 매번 새로운 의사결정의 연속입니다. 이런 의사결정을 매주 반복적으로 직접 해보며 "내 설계 기준"을 쌓아가는 것을 목표로 했습니다.

**2. 다양한 코드를 읽는 능력을 기르기 위해**

2-1. **다른 사람의 코드에서 새로운 인사이트를 얻는 것:** 같은 문제를 6명이 각자 풀면, 한 사람의 머릿속에서는 절대 나오지 않았을 접근 방식들을 마주하게 됩니다. 매주 라이브 리뷰에서 서로의 설계 의도를 듣고 질문을 주고받으며, 혼자 풀었을 때는 발견하지 못했을 관점을 얻고자 했습니다.

2-2. **낯선 코드를 빠르게 파악하는 능력을 기르는 것:** 실무에서는 내가 짠 코드보다 남이 짠 코드를 읽는 시간이 훨씬 많습니다. 6가지의 서로 다른 구현체를 매주 리뷰하면서, 낯선 코드의 의도를 빠르게 파악하고 피드백하는 능력을 함께 길렀습니다.

리뷰에서 나온 논의는 Discussions 탭에 기록하여 누적된 학습 자산으로 관리합니다.

<br />

## 👥 스터디원

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/k0nghaa.png" width="100px;" alt="이경하"/><br />
      <b>이경하</b><br />
      <a href="https://github.com/k0nghaa">@k0nghaa</a>
    </td>
    <td align="center">
      <img src="https://github.com/hyun-june.png" width="100px;" alt="이현준"/><br />
      <b>이현준</b><br />
      <a href="https://github.com/hyun-june">@hyun-june</a>
    </td>
    <td align="center">
      <img src="https://github.com/join0life.png" width="100px;" alt="조인영"/><br />
      <b>조인영</b><br />
      <a href="https://github.com/join0life">@join0life</a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/SanginJeong.png" width="100px;" alt="정상인"/><br />
      <b>정상인</b><br />
      <a href="https://github.com/SanginJeong">@SanginJeong</a>
    </td>
    <td align="center">
      <img src="https://github.com/le2yunji.png" width="100px;" alt="이윤지"/><br />
      <b>이윤지</b><br />
      <a href="https://github.com/le2yunji">@le2yunji</a>
    </td>
    <td align="center">
      <img src="https://github.com/chan-byeong.png" width="100px;" alt="최병찬"/><br />
      <b>최병찬</b><br />
      <a href="https://github.com/chan-byeong">@chan-byeong</a>
    </td>
  </tr>
</table>

<br />

## 🧩 풀어본 문제들

[GreatFrontEnd (Medium)](https://www.greatfrontend.com/questions/javascript-interview-questions?framework=React&difficulty=Medium)에서 출제되는 React/TypeScript 기반 실전형 과제 테스트 문제를 매주 1개씩 풀이했습니다. 단순 알고리즘 문제가 아니라, **UI 상태 관리, 비동기 처리, 재사용 가능한 컴포넌트 설계** 등 실무에서 자주 마주치는 유형의 문제들입니다.

| 주차                             | 문제          | 핵심 주제                                    |
| -------------------------------- | ------------- | -------------------------------------------- |
| [01-TodoList](./01-TodoList)     | Todo List     | 상태 관리, CRUD 로직 설계                    |
| [02-useQuery](./02-useQuery)     | useQuery 구현 | 비동기 데이터 페칭, 커스텀 훅 설계           |
| [03-JobBoard](./03-JobBoard)     | Job Board     | 데이터 필터링/렌더링, 컴포넌트 분리          |
| [04-Tabs](./04-Tabs)             | Tabs          | 접근성을 고려한 UI 컴포넌트 설계             |
| [05-useArray](./05-useArray)     | useArray 구현 | 배열 상태를 다루는 커스텀 훅 설계            |
| [06-StarRating](./06-StarRating) | Star Rating   | 사용자 인터랙션 처리, 재사용 가능한 컴포넌트 |

> 각 폴더의 README에서 문제 요구사항을, 폴더 내부에서 스터디원별 구현 코드를 확인할 수 있습니다.

<br />

## 💡 스터디를 통해 얻은 것

- 매주 라이브 리뷰에서 본인의 설계를 직접 발표하고 질의응답을 진행하며, **코드를 말로 설명하는 연습**을 했습니다.
- 동일 문제에 대한 6가지의 다른 구현을 비교하며, 가독성·재사용성·성능 측면의 **트레이드오프를 판단하는 기준**을 쌓았습니다.

<br />

## 🗂 진행 운영 (참고)

- 매주 1문제, 월요일 PR 마감 → 같은 날 저녁 라이브 코드 리뷰 → 리뷰 후 `main` 머지
- 운영 프로세스에 대한 자세한 내용은 [`CONTRIBUTING.md`](./CONTRIBUTING.md)에서 확인할 수 있습니다.
