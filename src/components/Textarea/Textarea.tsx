import styled from "styled-components";

const TextareaStyled = styled.textarea`
  border: 1px solid black;
  padding: 8px;
`;

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

export const Textarea = ({ value, onChange }: TextareaProps) => {
  return (
    <TextareaStyled
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};
