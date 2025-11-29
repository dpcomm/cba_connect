import React, { ReactNode } from 'react';
import { Container, Left, Right } from './HeaderBar.styled';

type HeaderBarComponentProps = {
	left: ReactNode;
	right?: ReactNode;
	onClickLeft?: () => void;
	onClickRight?: () => void;
}

export const HeaderBar = ({ left, right, onClickLeft, onClickRight }: HeaderBarComponentProps) => {
  return (
    <Container>
			<Left onClick={onClickLeft}>
				{left}
			</Left>
			<Right onClick={onClickRight}>
				{right}
			</Right>
		</Container>
  );
};
