# No 7. Stopwatch

## 문제 링크

- [GreatFrontEnd - Stopwatch](https://www.greatfrontend.com/questions/user-interface/stopwatch?practice=practice&tab=coding)

<br />

## 문제 설명

시간이 얼마나 흘렀는지 측정할 수 있는 스톱워치 위젯을 만들어 보세요. 현재 타이머를 표시하며, 아래에 "시작/중지"와 "리셋" 두 개의 버튼이 있습니다.

<br />

## 요구사항

- 시작/중지 버튼: 타이머가 작동 중인지에 따라 타이머를 시작/중지합니다.
- 리셋: 타이머를 0으로 초기화하고 타이머를 멈춥니다.
- 타이머는 경과 초를 밀리초 단위로 보여줍니다.
  - 타이머를 클릭하면 타이머가 시작/중지됩니다. 시작/중지 버튼의 라벨도 그에 맞게 업데이트되어야 합니다.
  - 시간을 hh:mm:ss:ms 형식으로 표시하는 옵션이 추가되면 좋을 것 같습니다.

스톱워치의 외관을 스타일링하기 위해 창의력을 발휘할 자유가 있습니다. 영감을 얻고 예시를 얻기 위해 [구글의 스톱워치 위젯](https://www.google.com/search?q=stopwatch)을 사용해 보세요.

<br />

## 기본 제공 코드

```
export default function Stopwatch() {
  return (
    <div>
      <p>0s 00ms</p>
      <div>
        <button>Start</button> <button>Reset</button>
      </div>
    </div>
  );
}
```
