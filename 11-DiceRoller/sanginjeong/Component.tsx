import { useState } from "react";
import Dice from "./Dice";

const DICERAW_STYLE = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 72px)",
  gap: 16,
  listStyle: "none",
  padding: 0,
};

export type DiceValueType = 1 | 2 | 3 | 4 | 5 | 6;

const getRandomDiceValue = (): DiceValueType => {
  return (Math.floor(Math.random() * 6) + 1) as DiceValueType;
};

const Component = () => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [diceValues, setDiceValues] = useState<DiceValueType[]>([]);

  const handleRoll = (e) => {
    e.preventDefault();

    const newDiceValues = Array.from(
      { length: inputValue },
      getRandomDiceValue,
    );

    setDiceValues(newDiceValues);
  };

  return (
    <>
      <form onSubmit={handleRoll}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          type="number"
          min={1}
          max={12}
          style={{ width: "100px" }}
        />
        <button>Roll</button>
      </form>

      <ul style={DICERAW_STYLE}>
        {diceValues.map((value, index) => (
          <Dice value={value} key={index} />
        ))}
      </ul>
    </>
  );
};

export default Component;
