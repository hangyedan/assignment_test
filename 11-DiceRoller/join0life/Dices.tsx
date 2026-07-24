type DicesProps = {
  dices: number[];
};

const RANDOM_DICES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function Dices({ dices }: DicesProps) {
  return (
    <div className="dices">
      {dices.map((dice, index) => (
        <Dice key={index} value={dice} />
      ))}
    </div>
  );
}

export function Dice({ value }: { value: number }) {
  return <div className="dice">{RANDOM_DICES[value]}</div>;
}
