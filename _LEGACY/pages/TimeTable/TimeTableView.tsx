import React from 'react';
import TimeTableComponent from '@components/TimeTable';
import { Container, Title } from './TimeTable.styled';
import { schedule } from './dummy';

const TimeTableView = () => {
  return (
    <Container>
      <Title>The grace</Title>
      <TimeTableComponent day="첫째날" events={schedule.day1} />
      <TimeTableComponent day="둘째날" events={schedule.day2} />
      <TimeTableComponent day="셋째날" events={schedule.day3} />
    </Container>
  );
};

export default TimeTableView;
