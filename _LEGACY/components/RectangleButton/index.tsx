import React, { useState } from 'react';
import { RectSelectorWrapper, RectButton } from './RectangleButton.styled';

const RectangleButton = () => {
    const [rect, setRect] = useState({
        '8/23': false,
        '8/24': false,
        '8/25': false
    });

    const handleMealClick = (date) => {
        const updatedrect = { ...rect, [date]: !rect[date] };
        setRect(updatedrect);
    };

    const handleAllClick = () => {
        const allSelected = Object.values(rect).every(Boolean);
        const updatedrect = Object.keys(rect).reduce((acc, date) => {
            acc[date] = !allSelected;
            return acc;
        }, {});
        setRect(updatedrect);
    };

    return (
        <RectSelectorWrapper>
            <RectButton onClick={handleAllClick}>ALL</RectButton>
            {Object.keys(rect).map((date) => (
                <RectButton
                    key={date}
                    onClick={() => handleMealClick(date)}
                    isActive={rect[date]}
                    disabled={date === '8/23'} // Example for disabling a date
                >
                    {date}
                </RectButton>
            ))}
        </RectSelectorWrapper>
    );
};

export default RectangleButton;
