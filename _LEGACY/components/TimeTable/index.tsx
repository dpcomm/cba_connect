import React from 'react';
import { Container, DayTitle, EventList, EventItem, EventTime, EventActivity } from './TimeTable.styled';

type Event = {
  startTime: number;
  endTime: number;
  activity: string;
};

type DayScheduleProps = {
  day: string;
  events: Event[];
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const TimeTableComponent = ({ day, events }: DayScheduleProps) => (
  <Container>
    <DayTitle>{day}</DayTitle>
    <EventList>
      {events.map((event, index) => (
        <EventItem key={index}>
          <EventTime>{`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}</EventTime>
          <EventActivity>{event.activity}</EventActivity>
        </EventItem>
      ))}
    </EventList>
  </Container>
);

export default TimeTableComponent;
