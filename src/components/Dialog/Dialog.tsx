import styled from "styled-components";

const DialogOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DialogContainer = styled.div`
  max-height: 80vh;
  max-width: 600px;
  width: 100%;
  background-color: white;
  border: 1px solid black;
  padding: 0 16px;
  border-radius: 8px;
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

const CloseIcon = styled.span`
  cursor: pointer;
  font-family: system-ui;
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

interface DialogProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  buttons: React.ReactNode;
}

export const Dialog = ({ title, children, onClose, buttons }: DialogProps) => {
  return (
    <DialogOverlay onMouseDown={onClose}>
      <DialogContainer onMouseDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <span>{title}</span>
          <CloseIcon onClick={onClose}>X</CloseIcon>
        </DialogHeader>
        {children}
        <DialogFooter>{buttons}</DialogFooter>
      </DialogContainer>
    </DialogOverlay>
  );
};
