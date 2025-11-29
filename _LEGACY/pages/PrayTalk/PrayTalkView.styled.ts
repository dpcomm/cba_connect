import styled from "styled-components";
import { EColor } from "@styles/color";
import { body2, body4 } from "@styles/font";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100dvh;
  background-color: ${EColor.COLOR_PRIMARY_SUB2};
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  overflow-y: auto;
  flex-grow: 1;
`;

export const MyMessage = styled.div`
  align-self: flex-end;
  background-color: ${EColor.COLOR_PRIMARY_SUB1};
  color: white;
  padding: 10px;
  border-radius: 14px 14px 0 14px;
  margin-bottom: 10px;
  max-width: 60%;
  position: relative;
`;

export const OtherMessage = styled.div`
  align-self: flex-start;
  background-color: ${EColor.TEXT_200};
  color: ${EColor.TEXT_900};
  padding: 10px;
  border-radius: 14px 14px 14px 0;
  margin-bottom: 10px;
  max-width: 60%;
  position: relative;
`;

export const MessageBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const OtherTimestamp = styled.div`
  ${body4}
  color: ${EColor.TEXT_600};
  text-align: right;
  margin-top: 4px;
`;

export const MyTimestamp = styled.div`
  ${body4}
  color: ${EColor.TEXT_300};
  margin-top: 4px;
`;

export const OtherMessageName = styled.div`
  ${body4}
  color: ${EColor.TEXT_600};
  margin-bottom: 4px;
`;

export const MyMessageName = styled.div`
  font-size: 12px;
  color: ${EColor.TEXT_300};
  text-align: right;
  margin-top: 4px;
`;

export const DateBar = styled.div`
  align-self: center;
  background-color: ${EColor.TEXT_200};
  color: ${EColor.TEXT_900};
  padding: 5px 10px;
  border-radius: 12px;
  margin: 20px 0;
  font-size: 12px;
`;

export const InputContainer = styled.div`
  display: flex;
  position: sticky;
  bottom: 12px;
  width: 100%;
  border: none;
  padding: 8px;
  gap: 12px;
  background-color: ${EColor.COLOR_PRIMARY_SUB2};
`;

export const Input = styled.input`
  display: flex;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  ${body2};
`;
