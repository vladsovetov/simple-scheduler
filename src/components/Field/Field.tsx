import styled from "styled-components";

const FieldStyled = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #3d3d3d;
`;

interface FieldProps {
  children: React.ReactNode;
  label?: string;
}

export const Field = ({ children, label }: FieldProps) => {
  return (
    <FieldStyled>
      {label && <Label>{label}</Label>}
      {children}
    </FieldStyled>
  );
};
