import { HTMLAttributes, InputHTMLAttributes } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  border: 1px solid #3d3d3d;
  padding: 8px;
  border-radius: 4px;
`;

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}

export const Input = ({ value, onChange, ...rest }: InputProps) => {
  return (
    <InputStyled
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      {...rest}
    />
  );
};
