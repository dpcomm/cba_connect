import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  position: relative;
  background: white;
  padding: 26px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;

  .title{
    padding-bottom: 26px;
    }
`;

export const CloseIconButton = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;