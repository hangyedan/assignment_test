type DicesProps = {
  diceCount: number;
};

export default function Dices({ diceCount }: DicesProps) {
  return (
    <div className="dices">
      {Array.from({ length: diceCount }, (_, index) => (
        <Dice key={index} />
      ))}
    </div>
  );
}

export function Dice() {
  return <div className="dice"></div>;
}
