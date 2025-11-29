import React from 'react';
import { DateLabel, MealButton, MealColumn, MealGrid } from './MealRadioButton.styled';

interface IMealRadioButtonProps {
  dates: string[];
  mealData: number[][];
  disabled: boolean[][];
  onMealChange: (mealData: number[][]) => void;
}

const MealRadioButton = ({ dates, mealData, disabled, onMealChange }: IMealRadioButtonProps) => {
   const handleMealSelect = (dayIndex: number, mealIndex: number) => {
    if (!disabled[dayIndex][mealIndex]) {
      const newMealData = [...mealData];
      newMealData[dayIndex] = [...newMealData[dayIndex]];  // 내부 배열도 복사하여 불변성 유지
      newMealData[dayIndex][mealIndex] = newMealData[dayIndex][mealIndex] === 0 ? 1 : 0;
      onMealChange(newMealData);
    }
  };

  return (
    <MealGrid>
      {dates.map((date, dayIndex) => (
        <MealColumn key={date}>
          <DateLabel>{date}</DateLabel>
          {['아침', '점심', '저녁'].map((meal, mealIndex) => (
            <MealButton
              key={meal}
              $active={mealData[dayIndex][mealIndex] === 1}
              $disabled={disabled[dayIndex][mealIndex]}
              onClick={() => handleMealSelect(dayIndex, mealIndex)}
            >
              {meal}
            </MealButton>
          ))}
        </MealColumn>
      ))}
    </MealGrid>
  );
};

export default MealRadioButton;
