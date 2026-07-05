import ImageCarousel from "../08-ImageCarousel/hyunjun/ImageCarousel";
import "./App.css";

const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

function App() {
  return (
    <div>
      {/* 아래 본인의 코드를 붙여넣어 테스트 해보세요 */}
      <ImageCarousel images={images} />
    </div>
  );
}

export default App;
