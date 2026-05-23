# 📝 과제 요약

- 과제명: useQuery 훅 구현
- 소요 시간: 5시간

</br>

# 💡 설계 및 고민한 부분

> AI 없이 스스로 설계하며 가장 신경 쓴 핵심 로직이나 아키텍처(컴포넌트 구조, 상태 관리 등), 혹은 사용자 경험(UX) 개선 사항을 적어주세요.

- dependency array 처리 방식
  - `[deps]`와 `deps`의 동작 차이 비교
  - 발생하는 lint 경고 확인 및 원인 분석

</br>

# 📖 학습한 내용 및 어려웠던 점 (선택)

> 문제를 풀며 새롭게 알게 된 개념이나, 구현 중 막혔던 부분이 있다면 공유해 주세요.

- 문제에서 deps를 useEffect의 dependency array처럼 사용한다고 되어 있었기 때문에, 전달받은 deps를 그대로 useEffect의 두 번째 인자로 사용하였습니다.

- 구현 과정에서 ESLint 경고를 해결하기 위해 `useEffect`의 dependency array를 `[deps]` 형태로 변경해보았습니다.
  - 이 경우 `deps` 배열 내부 원소가 아니라 배열 객체 자체가 의존성으로 등록되었습니다. 그 결과 렌더링마다 새로 생성되는 배열 참조값이 변경된 것으로 판단되어 effect가 반복 실행되는 문제가 발생했습니다.

- React의 실제 dependency 비교 방식과 ESLint의 dependency 검사 방식은 서로 다를 수 있다는 점을 알게 되었습니다.

- 특히 커스텀 Hook처럼 dependency를 외부에서 전달받는 구조에서는 lint 경고를 해결하려다 실제 React 동작이 의도와 다르게 변경될 수 있었고, 반대로 실제 동작을 우선하면 lint 경고가 남을 수 있다는 점을 경험할 수 있었습니다.

</br>

# ❓ 질문 사항 (선택)

> 라이브 리뷰 때 팀원들과 함께 토론하고 싶거나 의견이 궁금한 부분이 있다면 남겨주세요.

- 의존성 배열을 `deps`가 아닌 다른 형태로 넣으신 분들은 왜 그렇게 구현하셨는지 궁금합니다.

</br>

# 📸 스크린샷 (선택)

> UI 관련 과제인 경우 결과 화면 캡처나 GIF를 첨부해 주세요.

</br>

## 📚 참고 자료

- [React 공식 문서 - useEffect](https://react.dev/reference/react/useEffect)
- [React 공식 문서 - exhaustive-deps](https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps)
- [React 공식 문서 - Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
