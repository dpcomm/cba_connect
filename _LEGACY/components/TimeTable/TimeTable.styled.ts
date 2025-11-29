import { EColor } from '@styles/color';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 18px;
  background-color: ${EColor.TEXT_200};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DayTitle = styled.h2`
  margin: 0;
  padding: 8px 0;
  color: #333;
  border-bottom: 2px solid ${EColor.TEXT_400};
  user-select: none;
`;

export const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const EventItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 10px;
  background-color: ${EColor.TEXT_300};
  border-left: 4px solid ${EColor.COLOR_PRIMARY};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const EventTime = styled.span`
  font-weight: bold;
  color: ${EColor.COLOR_PRIMARY};
  margin-bottom: 5px;
`;

export const EventActivity = styled.span`
  color: ${EColor.TEXT_800};
`;
