import React from 'react';
import { Content, LabelItem, StyledIconButton, SvgItem } from './Button.styled';

interface IIconButtonComponentProps {
  label: string;
  svg?: React.ReactElement<SVGAElement>;
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  tintColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  padding?: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  width,
  height,
  color,
  backgroundColor,
  tintColor,
  borderWidth,
  borderRadius,
  padding,
  svg,
  onClick,
}: IIconButtonComponentProps) => {
  return (
    <StyledIconButton
      width={width}
      height={height}
      color={color}
      $backgroundcolor={backgroundColor}
      tintcolor={tintColor}
      $borderwidth={borderWidth}
      borderradius={borderRadius}
      padding={padding}
      onClick={(e) => onClick(e)}
    >
      <Content>
        <LabelItem>{label.toUpperCase()}</LabelItem>
        {svg ? <SvgItem>{svg}</SvgItem> : <></>}
      </Content>
    </StyledIconButton>
  );
};

export default Button;