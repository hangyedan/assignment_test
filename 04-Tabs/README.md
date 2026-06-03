# No 3. Tabs

## 문제 링크

- [GreatFrontEnd - Tabs](https://www.greatfrontend.com/questions/user-interface/tabs?language=js&tab=coding)

<br />

## 문제 설명

활성화된 탭 요소에 따라 한 번에 하나의 콘텐츠 패널을 표시하는 탭 구성 요소를 만드세요. 예시 콘텐츠로 사용할 HTML 코드가 제공됩니다.

<br />

## 요구 사항

- 탭을 클릭하면 해당 탭이 활성화됩니다. 활성화된 탭과 비활성화된 탭을 구분하기 위해 시각적 표시(예: 파란색 텍스트)를 추가해야 합니다.
- 항상 활성화된 탭에 해당하는 패널의 내용만 표시되어야 합니다.

<br />

## 참고

- 이 질문의 핵심은 스타일링이 아닌 기능에 있습니다. 활성화된 탭을 강조 표시하는 부분을 제외하고는 사용자 지정 CSS를 작성할 필요가 없습니다.
- 마크업을 수정(예: ID 추가, 데이터 속성 추가, 일부 태그 교체 등)하고 클라이언트 측 렌더링을 사용할 수 있습니다.
- 앱의 사용자 경험을 개선할 방법을 생각해 보고 구현해 보세요(면접 시 가산점이 부여됩니다).

<br />

## 제공된 기본 코드

```javascript
export default function Tabs() {
  return (
    <div>
      <div>
        <button>HTML</button>
        <button>CSS</button>
        <button>JavaScript</button>
      </div>
      <div>
        <p>
          The HyperText Markup Language or HTML is the standard markup language
          for documents designed to be displayed in a web browser.
        </p>
        <p>
          Cascading Style Sheets is a style sheet language used for describing
          the presentation of a document written in a markup language such as
          HTML or XML.
        </p>
        <p>
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS.
        </p>
      </div>
    </div>
  );
}
```
