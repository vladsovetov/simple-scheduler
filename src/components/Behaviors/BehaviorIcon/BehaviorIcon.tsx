import { BehaviorType } from "@/types";
import styled from "styled-components";
import { BEHAVIOR_TYPES_MAP } from "../constants";
import { getRateColorByLevel } from "../utils";

const BehaviorStyled = styled.button<{ level: number }>`
  cursor: pointer;
  border-radius: 9999px;
  border: none;
  padding: 16px;
  &:hover {
    opacity: 1;
  }

  background-color: ${({ level }) => getRateColorByLevel(level)};
`;

interface BehaviorIconProps {
  type: BehaviorType;
}

export const BehaviorIcon = ({ type }: BehaviorIconProps) => {
  return (
    <BehaviorStyled
      level={type.level}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {BEHAVIOR_TYPES_MAP[type.id]}
    </BehaviorStyled>
  );
};
