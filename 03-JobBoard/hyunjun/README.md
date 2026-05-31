## 📝 과제 요약

- **과제명:** JobBoard구현
- **소요 시간:** 4시간

</br>

## 💡 설계 및 고민한 부분

> AI 없이 스스로 설계하며 가장 신경 쓴 핵심 로직이나 아키텍처(컴포넌트 구조, 상태 관리 등), 혹은 사용자 경험(UX) 개선 사항을 적어주세요.

### 초기 설계

1. API 호출 함수 구현
2. SSG를 통한 초기 데이터 렌더링
3. UI 구현
4. useQuery hook 구현
5. TanStack Query 캐싱

### 구현 과정

**데이터**

단순히 클라이언트에서 API를 호출해 데이터를 보여주는 방식이 아니라, Next.js의 서버 컴포넌트를 활용해 초기 데이터를 먼저 가져오고 이후 클라이언트에서 데이터를 관리하는 구조를 고민했다.

처음에는 `JobBoard` 컴포넌트에서 `useGetIds`, `useGetDetails` 훅을 사용해 모든 데이터를 클라이언트에서 가져오는 방식으로 구현했다. 하지만 이 경우 초기 화면에서 로딩 상태가 보였고, 서버에서 초기 데이터를 렌더링하려는 설계 의도와 맞지 않는다고 생각했다.

그래서 `page.tsx` 서버 컴포넌트에서 초기 job id 목록과 첫 화면에 필요한 상세 데이터를 미리 가져온 뒤, 이를 `initialIds`, `initialJobs` props로 클라이언트 컴포넌트에 전달하는 방식으로 변경했다.

이후 TanStack Query의 `initialData` 옵션을 사용해 초기 데이터로 설정했다.

이를 통해 첫 화면에서는 로딩 UI 없이 데이터를 바로 표시할 수 있었고, 이후 데이터는 TanStack Query의 캐시를 활용해 관리할 수 있었다.

**버튼 처리 방식**

첫 번째는 클라이언트 컴포넌트에서 `useState`로 `limit`을 관리하는 방식이다. 구현은 간단하지만, 데이터 개수 제어가 클라이언트 상태에 의존하게 된다.

두 번째는 URL의 `Query String`으로 `limit` 값을 관리하는 방식이다. 예를 들어 `?limit=6`, `?limit=12`처럼 URL을 변경하면 서버 컴포넌트에서 해당 값을 기준으로 데이터를 다시 가져올 수 있다.

이번 구현에서는 서버 컴포넌트에서 초기 데이터를 제어하는 흐름을 유지하고 싶었기 때문에, `useState`보다 URL 기반으로 `limit`을 관리하는 방식이 더 적절하다고 판단했다.

</br>

## 📖 학습한 내용 및 어려웠던 점 (선택)

> 문제를 풀며 새롭게 알게 된 개념이나, 구현 중 막혔던 부분이 있다면 공유해 주세요.

### 1. App Router에서는 getStaticProps를 사용하지 않는다는 점

처음에는 SSG를 적용하려면 `getStaticProps`를 사용해야 한다고 생각했다. 하지만 Next.js App Router에서는 `getStaticProps`를 사용하지 않고, 서버 컴포넌트에서 직접 비동기 함수를 실행해 데이터를 가져올 수 있다는 것을 알게 되었다.

### 2. 서버 컴포넌트와 클라이언트 컴포넌트의 역할 분리

- `page.tsx`: 초기 데이터 요청
- `JobBoard`: 클라이언트에서 TanStack Query 캐싱 활용
- `JobBoardItem`: 각 job 상세 데이터 표시

서버 컴포넌트는 초기 데이터 렌더링을 담당하고, 클라이언트 컴포넌트는 이후 상태와 캐싱을 담당하도록 구조를 나눴다.
</br>

## ❓ 질문 사항 (선택)

> 라이브 리뷰 때 팀원들과 함께 토론하고 싶거나 의견이 궁금한 부분이 있다면 남겨주세요.

</br>

## 📸 스크린샷 (선택)

> UI 관련 과제인 경우 결과 화면 캡처나 GIF를 첨부해 주세요.

</br>

## 📚 참고 자료

- [Next.js 공식 문서 - Fetching Data (App Router)](https://nextjs.org/docs/app/getting-started/fetching-data?utm_source=chatgpt.com)

- [Next.js 공식 문서 - page.js](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional)
- [TanStack Query 공식 문서 - Initial Query Data](https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data#staletime-and-initialdataupdatedat)
