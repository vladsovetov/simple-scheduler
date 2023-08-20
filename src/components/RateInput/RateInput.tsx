import styled from "styled-components";
import { getRateColorByLevel } from "../Behaviors/utils";

const RateInputWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const RateIcon = styled.span<{ active: boolean; backgroundColor: string }>`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  opacity: ${({ active }) => (active ? "1" : "0.3")};
  background-color: ${({ backgroundColor }) => backgroundColor};

  &:hover {
    opacity: 0.8;
  }
`;

interface RateInputProps {
  value?: number;
  onChange: (value: number) => void;
}

export const RateInput = ({ value, onChange }: RateInputProps) => {
  const rates = [-2, -1, 0, 1, 2];
  return (
    <RateInputWrapper>
      {rates.map((rate) => {
        const color = getRateColorByLevel(rate);
        return (
          <RateIcon
            key={rate}
            active={rate === value}
            backgroundColor={color}
            onClick={() => onChange(rate)}
          />
        );
      })}
    </RateInputWrapper>
  );
};
