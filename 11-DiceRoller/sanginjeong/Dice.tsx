import type { DiceValueType } from "./Component";

const DICE_STYLE = {
  width: "70px",
  height: "70px",
  border: "2px solid",
  borderRadius: "12px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
};

const DOT_STYLE = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#000000",
  justifySelf: "center",
  alignSelf: "center",
};

const POSITION_STYLE = {
  topLeft: {
    gridColumn: 1,
    gridRow: 1,
  },
  topRight: {
    gridColumn: 3,
    gridRow: 1,
  },
  middleLeft: {
    gridColumn: 1,
    gridRow: 2,
  },
  center: {
    gridColumn: 2,
    gridRow: 2,
  },
  middleRight: {
    gridColumn: 3,
    gridRow: 2,
  },
  bottomLeft: {
    gridColumn: 1,
    gridRow: 3,
  },
  bottomRight: {
    gridColumn: 3,
    gridRow: 3,
  },
};

const DICE_MAP = {
  1: ["center"],
  2: ["topLeft", "bottomRight"],
  3: ["topLeft", "center", "bottomRight"],
  4: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
  5: ["topLeft", "topRight", "center", "bottomLeft", "bottomRight"],
  6: [
    "topLeft",
    "middleLeft",
    "bottomLeft",
    "topRight",
    "middleRight",
    "bottomRight",
  ],
};

type DiceProps = {
  value: DiceValueType;
};

const Dice = ({ value }: DiceProps) => {
  return (
    <div style={DICE_STYLE}>
      {DICE_MAP[value].map((position) => (
        <div
          key={position}
          style={{
            ...DOT_STYLE,
            ...POSITION_STYLE[position],
          }}
        />
      ))}
    </div>
  );
};

export default Dice;
