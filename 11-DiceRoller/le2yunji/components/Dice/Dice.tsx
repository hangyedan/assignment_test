import { diceDotPositions, type DiceValue } from "./dice.constants";
import "./dice.style.css";

type DiceProps = {
  value: DiceValue;
};

export function Dice({ value }: DiceProps) {
  const positions = diceDotPositions[value];
  return (
    <div className="dice">
      {positions.map((position) => (
        <div key={position} className={position}></div>
      ))}
    </div>
  );
}
