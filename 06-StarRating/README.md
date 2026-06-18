# No 6. Star Rating

## 문제 링크

- [GreatFrontEnd - Star Rating](https://www.greatfrontend.com/questions/user-interface/star-rating?practice=practice&tab=coding)

<br />

## 문제 설명

사용자가 평점을 선택할 수 있는 별점 평가 위젯을 만드세요.

<br />

## 요구 사항

- 위젯은 최대 별 수와 현재 채워진 별 수 두 가지 매개변수를 수용합니다.
- 별을 클릭하면 왼쪽의 모든 별들과 함께 채워집니다.
- 별 위에 마우스를 올리면 그 별과 그 별의 왼쪽 모든 별이 채워집니다.
  - 마우스 커서를 올렸을 때 채워야 하는 별은 이미 채워진 상태보다 우선순위가 높습니다.
  - 커서가 위젯에서 벗어나고 새로운 선택이 이루어지지 않으면 해당 별들은 마우스 커서를 올리기 전의 채워진 상태로 되돌아갑니다.
- 별점 위젯을 재사용 가능하게 만들어 같은 페이지 내에 여러 인스턴스를 렌더링할 수 있게 하세요.

<br />

## 참고

별 아이콘은 빈 것과 채워진 것 모두 SVG 형태로 제공됩니다.

StarRating.js 스켈레톤 컴포넌트가 생성되었습니다. `<StarRating />` 컴포넌트의 props는 자유롭게 결정할 수 있습니다.

<br />

## 기본 제공 코드

```
// StarRating.js
export default function StarRating() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="star-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="star-icon star-icon-filled"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </div>
  );
}

```

```
// App.js
import StarRating from './StarRating';

export default function App() {
  return (
    <div>
      <StarRating />
    </div>
  );
}

```
