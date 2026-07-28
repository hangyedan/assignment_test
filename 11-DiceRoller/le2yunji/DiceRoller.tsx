import { useState } from "react";
import { Dice } from "./components/Dice/Dice";
import type { DiceValue } from "./components/Dice/dice.constants";
import "./components/Dice/dice.style.css";

const randomNumber = (): DiceValue => {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue;
};

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState("1"); // 1~12
  const [diceResults, setDiceResults] = useState<DiceValue[]>([]);

  const handleRoll = () => {
    const count = Number(diceCount);
    if (!Number.isInteger(count)) return;
    if (count < 1 || count > 12) return;

    const results = Array.from({ length: count }, () => randomNumber());

    setDiceResults(results);
  };

  return (
    <div>
      <div>
        <label>
          Number of Dice:
          <input
            type="number"
            min={1}
            max={12}
            value={diceCount}
            onChange={(event) => {
              setDiceCount(event.target.value);
            }}
          />
        </label>

        <button type="button" onClick={handleRoll}>
          Roll
        </button>
      </div>
      <div
        className="dices"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gap: "12px",
        }}
      >
        {diceResults.map((value, index) => {
          return <Dice key={index} value={value} />;
        })}
      </div>
    </div>
  );
}
