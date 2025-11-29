import React, { useState, useEffect } from 'react';
import { CustomLabel, RadioView, RadioWrap } from './RadioButton.styled';
import SvgIcon from '@components/SvgIcon';
import { EColor } from '@styles/color';
import { RadioItem } from '@type/index';

interface RadioButtonProps {
  items: RadioItem[];
  initialValue?: number;
  onChange: (newValue: number | undefined) => void;
  toggleable?: boolean; // ✅ 선택 해제 허용 여부
}

const RadioButton = ({ items, initialValue, onChange, toggleable = false }: RadioButtonProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(initialValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleClick = (value: number) => {
    if (toggleable) {
      if (selectedValue === value) {
        setSelectedValue(undefined);
        onChange(undefined);
      } else {
        setSelectedValue(value);
        onChange(value);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <RadioWrap>
      {items.map((item) => (
        toggleable ? (
          <CustomLabel key={item.value} onClick={() => handleClick(item.value)}>
            <RadioView isSelected={item.value === selectedValue}>
              <SvgIcon
                name={'check'}
                width={28}
                height={28}
                fill={item.value === selectedValue ? EColor.COLOR_PRIMARY : EColor.TEXT_500}
              />
              {item.text}
            </RadioView>
          </CustomLabel>
        ) : (
          <CustomLabel key={item.value}>
            <input
              type="radio"
              name="customRadio"
              value={item.value}
              onChange={handleChange}
              checked={item.value === selectedValue}
            />
            <RadioView isSelected={item.value === selectedValue}>
              <SvgIcon
                name={'check'}
                width={28}
                height={28}
                fill={item.value === selectedValue ? EColor.COLOR_PRIMARY : EColor.TEXT_500}
              />
              {item.text}
            </RadioView>
          </CustomLabel>
        )
      ))}
    </RadioWrap>
  );
};

export default RadioButton;
