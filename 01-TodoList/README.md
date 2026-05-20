# No 1. TodoList

## 문제 링크

- [GreatFrontEnd - TodoList](https://www.greatfrontend.com/questions/user-interface/todo-list?language=js&tab=coding)

<br />

## 문제 설명

###원본
You're given some existing HTML for a Todo List app. Add the following functionality to the app:

1. Add new tasks on clicking the "Submit" button.
   - The `<input>` field should be cleared upon successful addition.
2. Remove tasks from the Todo List upon clicking the "Delete" button.

####Notes

- The focus of this question is on functionality, not styling. There's no need to write any custom CSS.
- You may modify the markup (e.g. adding `id`s, data attributes, replacing some tags, etc.), but the result should remain the same visually.
- You may want to think about ways to improve the user experience of the application and implement them (you get bonus credit for doing that during interviews).

### 번역

Todo List 앱용 기존 HTML이 일부 제공됩니다. 앱에 다음 기능을 추가하세요:

1. "제출" 버튼을 클릭하면 새로운 작업을 추가할 수 있습니다.
   - `<input>` 추가가 성공하면 해당 필드가 정리되어야 합니다.
2. "삭제" 버튼을 클릭하면 할 일 목록에서 작업을 제거할 수 있습니다.

####Notes

- 이 질문의 초점은 스타일링이 아니라 기능성에 있습니다. 커스텀 CSS를 만들 필요는 없습니다.
- 마크업을 수정할 수 있습니다(예: id, 데이터 속성 추가, 태그 교체 등), 결과는 시각적으로 동일해야 합니다
- 애플리케이션 사용자 경험을 개선하고 구현할 방법을 생각해 보세요(면접 시 보너스 점수를 받을 수 있습니다).

## 제공된 기본 코드

```jsx
export default function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="Add your task" />
        <div>
          <button>Submit</button>
        </div>
      </div>
      <ul>
        <li>
          <span>Walk the dog</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Water the plants</span>
          <button>Delete</button>
        </li>
        <li>
          <span>Wash the dishes</span>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
}
```
