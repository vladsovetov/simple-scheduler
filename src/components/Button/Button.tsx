import styled, { css } from "styled-components";

const ButtonPrimary = css`
  background-color: green;
  color: white;

  &:hover {
    background-color: #01b101;
  }
`;

const ButtonSecondary = css`
  background-color: white;
  color: green;

  &:hover {
    background-color: #ececec;
  }
`;

const ButtonStyled = styled.button<Pick<ButtonProps, "variant">>`
  cursor: pointer;
  border: 1px solid green;
  padding: 8px;
  color: white;
  background-color: green;
  border-radius: 8px;
  ${({ variant }) => (variant === "primary" ? ButtonPrimary : ButtonSecondary)}
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary";
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} variant={variant}>
      {children}
    </ButtonStyled>
  );
};
