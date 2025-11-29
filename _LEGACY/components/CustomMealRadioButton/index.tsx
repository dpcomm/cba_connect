import React from 'react';
import { DateLabel, MealButton, MealColumn, MealGrid } from './CustomMealRadioButton.styled';

interface IRadioGridProps {
  rowLabels: string[];                  // 예: ['7/11', '7/12', '7/13']
  columnLabels: string[];               // 예: ['아침', '점심', '저녁']
  data: number[][];                     // 예: [[1,0,0], [0,1,0], [1,1,0]]
  disabled: boolean[][];                // 같은 구조
  onChange: (data: number[][]) => void; // 상태 업데이트 함수
    /** 버튼 상태별 텍스트 설정 */
  labelOn?: string;   // 기본값: '식사 O'
  labelOff?: string;  // 기본값: '식사 X'
}

const CustomRadioGrid = ({
  rowLabels,
  columnLabels,
  data,
  disabled,
  onChange,
  labelOn,
  labelOff
}: IRadioGridProps) => {
  const handleSelect = (rowIndex: number, colIndex: number) => {
    if (!disabled[rowIndex][colIndex]) {
      const newData = [...data];
      newData[rowIndex] = [...newData[rowIndex]];
      newData[rowIndex][colIndex] = newData[rowIndex][colIndex] === 0 ? 1 : 0;
      onChange(newData);
    }
  };

  return (
    <MealGrid>
      {rowLabels.map((row, rowIndex) => (
        <MealColumn key={row}>
          <DateLabel>{row}</DateLabel>
          {columnLabels.map((col, colIndex) => {
            const isActive = data[rowIndex][colIndex] === 1;
            const isDisabled = disabled[rowIndex][colIndex];
            const buttonLabel = isActive ? labelOn : labelOff;

            return (
              <MealButton
                type="button"
                key={col}
                $active={isActive}
                $disabled={isDisabled}
                onClick={() => handleSelect(rowIndex, colIndex)}
              >
                {buttonLabel}
              </MealButton>
            );
          })}
        </MealColumn>
      ))}
    </MealGrid>
  );
};


export default CustomRadioGrid;
