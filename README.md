# 한계단 과제 테스트 스터디 🪜

> 현 저장소는 FE 개발자 6명이 모여 과제 테스트 문제를 풀고,
> 설계 능력을 기르기 위해 코드 리뷰를 진행하는 스터디 저장소입니다.

<br />

## 스터디 대상 문제

- **[GreatFrontEnd (Medium)](https://www.greatfrontend.com/questions/javascript-interview-questions?framework=React&difficulty=Medium)** 사이트의 React, TypeScript 기반 문제들을 1주에 하나씩 풀이합니다.

<br />

## 진행 방식

- **일시:** 매주 월요일 오후 8시 (온라인 디스코드를 통해 1시간 내외 진행)
- **분량:** 주 1회, 1문제 진행
- **타임라인**
  1. **월요일 15:00까지:** 각자 브랜치에 코드 작성 후 **Pull Request(PR)** 생성 (마감)
  2. **월요일 20:00~:** 디스코드 음성 채널 접속 후 **라이브 리뷰** 진행
     - 본인이 직접 설계한 코드 설명 및 질의응답
     - 풀이 과정에서 알게 된 핵심 개념 공유
  3. **리뷰 종료 후** 각자의 PR을 `main` 브랜치에 머지하고 과제 종료
- **Discussions 활용:** 라이브 리뷰 중 나온 핵심 개념이나 더 생각해 볼 거리에 대해서는 저장소의 **Discussions** 탭을 활용해 아카이브하고 토론합니다.

<br />

## 과제 시 유의사항 (AI 사용 관련)

본 스터디의 가장 큰 목적은 **'스스로 생각하고 구현하는 설계 능력'** 을 기르는 것입니다.

- **권장:** 번역, 단순 개념 질문, 구현하려는 로직의 방향성 힌트 등 '학습 보조' 용도 활용
- **지양:** "코드 짜줘" 식의 결과물 복사 붙여넣기 절대 금지
- **핵심:** 라이브 리뷰 시 본인의 코드를 스스로 설명할 수 있어야 하며, 팀원들의 질문에 답변할 수 있을 만큼 구조와 개념 숙지가 필수입니다.

<br />

## 디렉토리 구조 및 네이밍 컨벤션

### 디렉토리 구조

Vite, React, TypeScript 환경 설정은 최상위 루트(Root)에서 공통으로 관리하며, 문제별 폴더 하위에 각자 이름으로 폴더를 생성해 작업합니다.

```text
assignment_test/
├── package.json          # 최상위 공통 의존성 관리
├── tsconfig.json         # 공통 TypeScript 설정
├── vite.config.ts        # 공통 빌드 및 서버 설정
├── index.html            # 진입점 파일
│
├── 01-TodoList/              # 주차별 문제 폴더
│   ├── README.md         # 문제 요구사항 및 링크
│   ├── userA/            # 스터디원 A의 구현 폴더 (TodoList.tsx 등)
│   ├── userB/            # 스터디원 B의 구현 폴더
│   └── ...
└── 02-useQuery/
    ├── README.md
    └── ...
```

### 네이밍 컨벤션

- **주차별 디렉토리:** `[문제번호]-[문제명-파스칼케이스]`
  - ex) `01-TodoList`, `02-useQuery`

- **개인 작업 폴더:** 문제 폴더 내부에 본인의 **이름** 또는 **GitHub ID**로 폴더 생성
  - ex) `01-TodoList/gildong/`, `01-TodoList/userA/`

- **작업 브랜치 명:** `feat/[문제번호]-[이름]`
  - ex) `feat/01-TodoList-gildong`

<br />

## 사용 및 제출 방법

### 1. 초기 세팅

```bash
git clone [https://github.com/hangyedan/assignment_test.git](https://github.com/hangyedan/assignment_test.git)
cd assignment_test
npm install
```

### 2. 과제 확인 및 작업 브랜치 생성

- 새로 올라온 문제 폴더(ex: `01-TodoList`)의 `README.md` 요구사항 확인
- 본인의 작업 브랜치 생성

```bash
git checkout -b feat/01-TodoList-gildong
```

### 3. 코드 구현 및 로컬 테스트

- 해당 문제 폴더 내부에 본인의 폴더를 만들고 코드 작성 (ex: `01-TodoList/gildong/TodoList.tsx`)
- 로컬 서버 실행하여 구현한 코드 확인

```bash
npm run dev
```

> **화면 테스트 팁:** 최상위 `src/App.tsx` 파일에 본인이 만든 컴포넌트를 불러와 자유롭게 테스트해 볼 수 있습니다.
>
> (※ 주의: 로컬 테스트용 코드이므로 PR 제출 시에는 `src/App.tsx` 수정 내역을 제외하거나 삭제해 주세요!)
>
> ```TypeScript
> // src/App.tsx
> import './App.css';
> import TodoList from '../01-TodoList/gildong/TodoList'; // 예시: 본인 컴포넌트 연결
>
> function App() {
> return (
>    <> {/_ 아래 본인의 코드를 붙여넣어 테스트 해보세요 _/}
>      <TodoList />
>    </>
>   );
>  }
>
> export default App;
> ```

### 4. 제출 및 리뷰 (월요일 15:00 마감)

1. 작업한 내용을 커밋하고 원격 저장소에 푸시

```bash
git add .
git commit -m "feat: 01-TodoList 과제 구현(홍길동)"
git push origin feat/01-TodoList-gildong
```

2. GitHub 레포지토리에서 `main` 브랜치 대상으로 PR 생성

3. 라이브 리뷰 전까지 다른 팀원들의 코드를 미리 살펴보고 리뷰 남김
