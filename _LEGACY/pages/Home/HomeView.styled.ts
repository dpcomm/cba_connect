import styled from 'styled-components';
import { EColor } from '@styles/color';
import { Title3, Title5, Title6, body1, body2, body3, body4, body5 } from '@styles/font';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  align-items: center;
  padding: 34px 24px;
  background-color: ${EColor.TEXT_400};
`;

export const HeaderView = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${EColor.TEXT_200};
  border-radius: 16px;
  padding: 16px 12px;
  gap: 6px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  margin-bottom: 12px;
`;

export const ApplicationView = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 10px 12px;
  background-color: ${EColor.TEXT_200};
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    background-color: ${EColor.TEXT_300};
  }

  &:active {
    transform: translateY(2px) scale(0.995);
  }
`;

export const ApplicationViewText = styled.div`
  margin-top: 12px;
  font-size: 18px;
  color: ${EColor.COLOR_PRIMARY};
  user-select: none;
  ${Title3};
  font-size: 35px;
`;

export const SvgView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 148px;
  height: 148px;
`;

export const HeaderCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  margin-right: auto;
`;

export const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &:active {
    background-color: ${EColor.TEXT_500};
    border-radius: 12px;
  }
`;

export const HeaderGroupText = styled.div`
  ${body3};
  font-size: 14px;
  color: ${EColor.TEXT_600};
  user-select: none;
`;

export const HeaderNameText = styled.div`
  ${Title5}
  font-size: 20px;
  user-select: none;
`;

export const LoginInputView = styled.div`
  width: 100%;
  margin-top: 24px;
`;

export const TextButtonView = styled.div`
  width: 100%;
  margin-top: 36px;
`;

export const TextButton = styled.div`
  display: flex;
  width: 100%;
  margin: 8px;
  ${body3};
  color: ${EColor.TEXT_600};
  justify-content: center;
  align-items: center;
`;

export const NameText = styled.div`
  ${body1};
  font-size: 20px;
  color: ${EColor.TEXT_800};
  letter-spacing: 1px;
  padding-top: 6%;
  padding-bottom: 6%;
`;

export const DDayView = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 10px 12px;
  background-color: ${EColor.COLOR_PRIMARY_SUB2_2};
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
`;

export const DDayText = styled.div`
  display: flex;
  align-items: center;
  ${body4};
  gap: 20px;
  font-size: 28px;
  letter-spacing: 1px;
  color: ${EColor.TEXT_200};
  user-select: none;
  .bible {
    border-left: 3px solid ${EColor.TEXT_200};
    padding-left: 14px;
    font-size: 15px;
    color: ${EColor.TEXT_200};
  }
`;

export const BarTextView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const BarTextMain = styled.div`
  ${Title5};
  color: ${EColor.COLOR_PRIMARY_SUB2};
  width: 96px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarTextSubRight = styled.div`
  ${Title6};
  color: ${EColor.COLOR_PRIMARY_SUB2};
  width: 96px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarTextSubLeft = styled.div`
  ${Title6};
  color: ${EColor.COLOR_PRIMARY_SUB2};
  width: 96px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3px;
  background-image: linear-gradient(to right, ${EColor.COLOR_PRIMARY} 50%, ${EColor.TEXT_500} 50%);
`;

export const Dot = styled.div<{ color: string }>`
  display: flex;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const Left = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  ${body2}
  color: ${EColor.TEXT_700};
  margin-bottom: 48px;
  padding: 4px;
  user-select: none;
  margin-left: auto;
  &:active {
    background-color: ${EColor.TEXT_400};
    color: ${EColor.TEXT_600};
    border-radius: 8px;
  }
`;

export const NoticeView = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 16px 24px;
  background-color: ${EColor.TEXT_200};
  border-radius: 8px;
`;
export const NoticeTop = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  h3 {
    position: absolute;
    top: -2px;
    left: 30px;
    ${body1}
    font-weight:bold;
  }
`;
export const NoticeBottom = styled.div``;

export const MenuView = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  gap: 10px;
`;

export const ItemView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
`;

export const ItemText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  ${body3};
  word-break: break-all;
  color: ${EColor.TEXT_600};
  margin-top: 10px;
  text-align: center;
  user-select: none;
`;

export const Line = styled.div`
  display: flex;
  background-color: ${EColor.TEXT_500};
  width: 1px;
  height: 64px;
  border-radius: 12px;
`;

export const ButtonView = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
`;

export const TextLight = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${body5};
  color: ${EColor.TEXT_600};
  margin-top: 12px;
  text-decoration: underline;
  user-select: none;
`;
