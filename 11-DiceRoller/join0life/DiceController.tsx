type DiceControllerProps = {
  diceCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoll: () => void;
};

export default function DiceController({
  diceCount,
  onChange,
  onRoll,
}: DiceControllerProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRoll();
  };

  return (
    <form onSubmit={handleSubmit} className="dice-controller">
      <label htmlFor="dice-count">Number of Dice</label>
      <input
        type="number"
        min="1"
        max="12"
        placeholder="1에서 12사이의 숫자를 입력하세요."
        value={diceCount}
        onChange={onChange}
      />
      <button type="submit">Roll</button>
    </form>
  );
}
