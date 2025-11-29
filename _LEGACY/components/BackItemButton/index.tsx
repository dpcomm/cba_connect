import React from "react";
import { Button } from "./BackItemButton.styled";

type BackItemButtonProps = {
    label: string;
    onClick: () => void;
    isClicked: boolean;
    children?: React.ReactNode;
}

const BackItemButton = ({ label, onClick, isClicked, children }: BackItemButtonProps) => {
	return (
		<Button clicked={isClicked} onClick={onClick}>
			{children}
			{label}
		</Button>
	);
};

export default BackItemButton;