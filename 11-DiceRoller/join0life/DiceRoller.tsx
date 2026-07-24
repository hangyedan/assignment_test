import DiceController from "./DiceController";
import Dices from "./Dices";
import "./DiceRoller.css";
import { useState } from "react";

export default function DiceRoller() {
  const [inputCount, setInputCount] = useState<number>(1);
  const [dices, setDices] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputCount(value === "" ? 1 : Number(value));
  };

  const handleRoll = () => {
    const randomDices = Array.from({ length: inputCount }, () =>
      Math.floor(Math.random() * 6),
    );

    setDices(randomDices);
  };

  return (
    <div className="dice-roller">
      <DiceController
        diceCount={inputCount}
        onChange={handleInputChange}
        onRoll={handleRoll}
      />
      <Dices dices={dices} />
    </div>
  );
}
