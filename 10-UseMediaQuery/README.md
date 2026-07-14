# No 10. UseMediaQuery

## 문제 링크

- [GreatFrontEnd - UseMediaQuery](https://www.greatfrontend.com/questions/javascript/use-media-query?practice=practice&tab=coding)

<br />

## 문제 설명

미디어 쿼리(예: 화면 크기, 해상도, 화면 방향 등)의 변경 사항을 수신하고 이에 대응하는 useMediaQuery 훅을 구현하십시오.

## 예시

 export default function Component() {   const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');
   return <div>{isSmallDevice && <a href="#">Menu</a>}</div>; }
힌트: [window.matchMedia API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)가 도움이 됩니다.

## 인수

- query: string: 일치할 미디어 쿼리입니다. [유효한 CSS 미디어 쿼리 문자열](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)이어야 합니다.

## 반품

이 훅은 미디어 쿼리가 일치하는지 여부를 나타내는 부울 값을 반환합니다.

## 참고 사항

- 초기 반환 값은 window.matchMedia(query).matches에서 가져와야 합니다.

- 현재 쿼리의 변경 이벤트를 구독하고, 변경될 때 상태를 업데이트합니다.

- 쿼리가 변경되면 기존 MediaQueryList에 대한 구독을 취소하고 새로운 MediaQueryList에 구독해야 합니다.

- 별도의 크기 조정 리스너는 필요하지 않습니다.

<br />

## 기본 제공 코드

(사이트 코드 에디터에서 직접 확인해주세요)
