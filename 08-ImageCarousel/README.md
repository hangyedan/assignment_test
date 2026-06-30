# No 8. ImageCarousel

## 문제 링크

- [GreatFrontEnd - ImageCarousel](https://www.greatfrontend.com/questions/user-interface/image-carousel?practice=practice&tab=coding)

<br />

## 문제 설명

일련의 이미지를 순차적으로 표시하는 이미지 캐러셀을 만드세요.

## 요구 사항

- 이미지 캐러셀 컴포넌트는 이미지 URL 배열을 입력으로 받습니다. 예시 이미지 URL은 스켈레톤 코드에 포함되어 있습니다.

- 레이아웃 및 배치:

  - 이미지 캐러셀은 화면 중앙에 배치되어야 하며, 최대 크기는 600px × 400px입니다.

  - 이미지는 전체가 보이도록 캐러셀 크기에 맞춰 축소되어야 합니다. 캐러셀의 빈 공간은 검은색으로 채울 수 있습니다.

  - 화면 너비가 이미지보다 좁은 경우, 캐러셀은 사용 가능한 가로 공간에 맞도록 크기가 조정되어야 합니다.

- 탐색:

  - 사용자가 이미지를 탐색할 수 있도록 좌/우 이동 버튼을 추가하십시오. 버튼은 순환 기능을 지원해야 합니다. 즉, 마지막 이미지를 본 후 첫 번째 이미지로 다시 돌아가도록 해야 합니다.

  - 하단에 특정 이미지로 바로 이동할 수 있는 페이지 버튼을 추가하십시오. 이미지 수는 10개 미만이라고 가정해도 됩니다.

- 이 문제에서는 애니메이션과 전환 효과가 필요하지 않습니다. 이에 대해서는 [이미지 캐러셀 II](/questions/user-interface/image-carousel-ii)와 [이미지 캐러셀 III](/questions/user-interface/image-carousel-iii)에서 다룰 예정입니다.

이 문제에는 언제든지 DOM에 하나의 이미지 요소만 존재해야 한다는 기술적 제약이 있습니다.

<br />

## 기본 제공 코드

```
// App.tsx
import { useState } from 'react';

import ImageCarousel from './ImageCarousel';

const images = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];

export default function App() {
  const [message, setMessage] = useState('Image Carousel');

  return (
    <div>
      <h1>{message}</h1>
      <ImageCarousel images={images} />
    </div>
  );
}

```
```
// Image Carousel.tsx
export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  return (
    <div>
      {images.map(({ alt, src }) => (
        <img key={src} alt={alt} src={src} width="100%" />
      ))}
    </div>
  );
}

```
