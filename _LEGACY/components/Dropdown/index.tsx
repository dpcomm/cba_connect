import React, { useState } from 'react';
import { Container, Header, List, ListContainer, ListItem } from './Dropdown.styled';
import SvgIcon from '@components/SvgIcon';
import { EColor } from '@styles/color';

interface DropdownProps {
  options: string[];
  initialValue?: string;
  placeholder?: string;
  onChange?: (data: any) => void;
}

const Dropdown = ({ options, initialValue, placeholder, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Container>
      <Header onClick={onToggle}>
        {selectedOption || placeholder}
        <SvgIcon name={isOpen ? 'chevron_up' : 'chevron_down'} width={24} height={24} fill={EColor.TEXT_600} />
      </Header>
      {isOpen && (
        <ListContainer>
          <List>
            {options.map(option => (
              <ListItem key={option} onClick={onOptionClicked(option)}>
                {option}
              </ListItem>
            ))}
          </List>
        </ListContainer>
      )}
    </Container>
  );
};

export default Dropdown;
