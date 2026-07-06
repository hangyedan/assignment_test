# No 9. UseDebounce

## 문제 링크

- [GreatFrontEnd - UseDebounce](https://www.greatfrontend.com/questions/javascript/use-debounce?practice=practice&tab=coding)

<br />

## 문제 설명

제공된 값에 더 이상 변경 사항이 없는 상태에서 지정된 지연 시간이 경과할 때까지 상태 업데이트를 지연시키는 useDebounce 훅을 구현합니다.

## 예시

 export default function Component() {   const [keyword, setKeyword] = useState('');   const debouncedKeyword = useDebounce(keyword, 1000);
   return (     <div> <input value={keyword} onChange={(e) => setKeyword(e.target.value)} /> <p>디바운스된 키워드: {debouncedKeyword}</p>     </div>   ); }
useDebounce를 사용했을 때 관찰할 수 있는 결과는 React의 [useDeferredValue](https://react.dev/reference/react/useDeferredValue)와 매우 유사합니다. 전자는 정해진 시간이 지난 후 업데이트된 값을 반환하는 반면, 후자는 항상 업데이트된 값을 반환하지만 DOM 업데이트에 있어 React의 우선순위 체계를 따릅니다.

## 인수

- value: 디바운싱할 값

- delay: 숫자: 지연 시간(밀리초 단위)

## 반품

이 훅은 바운스 제거가 적용된 값을 반환합니다.

## 참고 사항

- 반환 값은 입력 값과 동일하게 시작해야 합니다.

- 값이 변경되면, 새로운 값을 게시하기 전에 밀리초 동안 대기해야 합니다.

- 대기 시간이 만료되기 전에 값이 다시 변경되면, 이전 타임아웃을 취소하고 대기를 다시 시작해야 합니다.

- 후크가 마운트 해제될 때 보류 중인 타임아웃을 정리해야 합니다.

<br />

## 기본 제공 코드

(사이트 코드 에디터에서 직접 확인해주세요)
