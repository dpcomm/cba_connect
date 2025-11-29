import styled from "styled-components";
import { EColor } from "@styles/color";
import { Title3, body4, Title6 } from "@styles/font";


export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding-top: 86px;
	padding-bottom: 86px;
	padding-right: 48px;
	padding-left: 48px;
	overflow-y: scroll;
`;

export const LogoView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

export const LogoLight = styled.div`
	${Title6};
	font-size: 38px;
	color: ${EColor.COLOR_PRIMARY_SUB2};
	letter-spacing: 2px;
	user-select: none;
`;

export const LogoBold = styled.div`
	${Title3}
	font-size: 64px;
	color: ${EColor.COLOR_PRIMARY};
	letter-spacing: 7px;
	margin-top: -16px;
	user-select: none;
`;

export const InputView = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 20px;
	padding-top: 56px;
	padding-bottom: 56px;
`;

export const InputBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const SvgBox = styled.div`
	padding-right: 52px;
	width: 54px;
	/* padding: 4px;
	margin-right: 14px; */
`;

export const EmptyBox = styled.div`
	width: 30px;
	height: 30px;
`;

export const GroupInputView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const TextSub = styled.div`
	text-align: left;
	color: ${EColor.TEXT_500};
	${body4}
`;


export const PrivacyConsentWrapper = styled.div`
  text-align: left;
  ${body4}

  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;

  h6 {
    font-weight: bold;
    margin: 16px 0 8px;
    font-size: 14px;
  }

  ul {
    padding-left: 1.2em;
    margin-bottom: 8px;
  }

  li {
    margin-bottom: 4px;
  }

  strong {
    font-weight: bold;
  }

  button {
	background-color: transparent;
	border: none;
	color: ${EColor.COLOR_PRIMARY};
	cursor: pointer;
	// text-decoration: underline;
  }

  .title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .scrollBox {
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    padding: 16px;
    height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
  }

  .checkboxGroup {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .checkboxGroup input {
    margin-right: 6px;
  }
`;