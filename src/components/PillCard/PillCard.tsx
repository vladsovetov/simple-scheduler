import styled, { CSSProperties } from "styled-components";

const PillStyled = styled.div`
  cursor: pointer;
  &:hover {
    filter: brightness(1.5);
  }
`;

interface PillCardProps {
  id: number;
  name: string;
  quantity: number;
  color?: CSSProperties["color"];
  onClick: (id: number) => void;
}

export const PillCard = ({
  id,
  name,
  quantity,
  color,
  onClick,
}: PillCardProps) => {
  const pillColor = color || colorBasedOnName(name);
  return (
    <PillStyled
      style={{
        padding: "8px",
        backgroundColor: pillColor,
        color: textColorBasedOnBackgroundColor(pillColor),
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
    >
      {name} ({quantity})
    </PillStyled>
  );
};

// convert string to number by hashing
const hash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

// convert number to rgb
const intToRGB = (i: number) => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};

// convert string to rgb
const colorBasedOnName = (name: string) => {
  const hashValue = hash(name);
  const rgb = intToRGB(hashValue);
  return `#${rgb}`;
};

// calculate text color based on background color
const textColorBasedOnBackgroundColor = (backgroundColor: string) => {
  const r = parseInt(backgroundColor.substr(1, 2), 16);
  const g = parseInt(backgroundColor.substr(3, 2), 16);
  const b = parseInt(backgroundColor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};
