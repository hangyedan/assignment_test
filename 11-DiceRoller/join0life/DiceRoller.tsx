import DiceController from "./DiceController";
import Dices from "./Dices";
import "./DiceRoller.css";
import { useState } from "react";

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiceCount(value === "" ? 1 : Number(value));
  };

  return (
    <div className="dice-roller">
      <DiceController
        diceCount={diceCount}
        onChange={handleInputChange}
        // onRoll={}
      />
      <Dices diceCount={diceCount} />
    </div>
  );
}
