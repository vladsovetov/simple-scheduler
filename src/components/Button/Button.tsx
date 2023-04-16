import styled, { css } from "styled-components";

const ButtonPrimary = css`
  background-color: green;
  color: white;

  &:hover {
    background-color: #01b101;
  }
`;

type ButtonStyleProps = Pick<ButtonProps, "variant" | "color">;

const ButtonSecondary = css<ButtonStyleProps>`
  background-color: white;

  ${({ color = "primary" }) => {
    switch (color) {
      case "primary":
        return css`
          color: green;
        `;
      case "error":
        return css`
          color: red;
          border-color: red;
        `;
    }
  }}

  &:hover {
    filter: brightness(0.9);
  }
`;

const ButtonStyled = styled.button<ButtonStyleProps>`
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
  color?: "primary" | "error";
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  color = "primary",
}: ButtonProps) => {
  return (
    <ButtonStyled color={color} onClick={onClick} variant={variant}>
      {children}
    </ButtonStyled>
  );
};
