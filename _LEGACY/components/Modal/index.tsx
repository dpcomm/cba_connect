import { ModalBody, ModalBottom, ModalContent, ModalHeader, ModalWrapper } from './Modal.styled';
import { ScrollBar } from '@components/ScrollBar';

interface IModal {
  header: string;
  body: any;
  bottom: any;
}

export const Modal = ({ header, body, bottom }: IModal) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>
          <ScrollBar>{body}</ScrollBar>
        </ModalBody>
        <ModalBottom>{bottom}</ModalBottom>
      </ModalContent>
    </ModalWrapper>
  );
};
