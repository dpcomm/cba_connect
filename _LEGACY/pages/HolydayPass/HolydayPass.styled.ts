import { EColor } from '@styles/color';
import { Title3, Title4_2,body2, body3 } from '@styles/font';
import styled from 'styled-components';


export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;

  align-items: center;
`;
export const MainTitle = styled.section`
  width: 100%;
  font-size: 24px;
  text-align: start;
  padding: 10px 30px;
`;
export const ProgressBarBox = styled.section`
  width: 100%;
  margin-top: 50px;
  padding: 0 30px;
  .progressNum {
    width: 70px;
    margin: 16px auto;
    border-radius: 20px;
    text-align: center;
    color: ${EColor.TEXT_200};
    background: ${EColor.COLOR_PRIMARY_SUB1};
  }
`;
export const QuestioBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 30px;
`;

export const Title = styled.article<{ isDone: boolean }>`
  width: 100%;
  font-size: ${(props) => (props.isDone ? '32px' : '22px')};
  font-weight: ${(props) => (props.isDone ? 800 : 'normal')};
  text-align: ${(props) => (props.isDone ? 'center' : 'start')};
  white-space: pre-line;
`;
export const ButtonGroup = styled.article`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const Bible = styled.article`
  ${body3}
  width: 100%;
  margin-top: -10px;
  color: ${EColor.TEXT_600};
  white-space: pre-line;
`;
export const AnswerBox = styled.article`
  display: flex;
  flex-direction: column;
`;
export const Textarea = styled.textarea`
  ${body2}
  width: 100%;
  height: 150px;
  margin: 20px auto;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid ${EColor.COLOR_PRIMARY_SUB2};
  text-align: left;
  resize: none;
  overflow-wrap: break-word;
  word-break: break-word;
  &::placeholder {
    opacity: 1;
    color: ${EColor.TEXT_600};
  }
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    opacity: 0;
    transition: all 0.3s;
  }
`;

export const Button = styled.button`
  ${Title3}
  width: 160px;
  height: fit-content;
  padding: 10px 14px;
  margin: 30px auto 20px auto; /* 위쪽 여백 추가 */
  border: none;
  border-radius: 16px;
  background: ${(props) =>
    props.type === 'submit' ? 'linear-gradient(to right, #1f9edd, #a4b6ff )' : `${EColor.TEXT_400}`};
  color: ${(props) => (props.type === 'submit' ? `${EColor.TEXT_200}` : '#000')};
  align-items: center;
`;

export const TicketIssued = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const Ticket = styled.div`
  width: 170px;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: translateY(100px);
  animation: slideIn 0.8s ease-out forwards;
  @keyframes slideIn {
    0% {
      /* scale: 0.8; */
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      /* scale: 1; */
      opacity: 1;
      transform: translateY(0);
    }
  }
`;




export const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 100%;
  gap: 15px;
`;

export const SvgBox = styled.div`
	padding-right: 52px;
	width: 54px;
	/* padding: 4px;
	margin-right: 14px; */
`;

export const GroupInputView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const TextForm = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 118px;
	margin-right: 12px;
	${Title4_2}
	letter-spacing: 2px;
	user-select: none;
	gap: 8px;
`;

export const MealButton = styled.button`
  width: 68px;
  padding: 5px;
  margin-bottom: 5px;
  ${body2};
  color: ${EColor.TEXT_200};
  background-color: ${EColor.COLOR_PRIMARY_SUB1};
  border: none;
  border-radius: 8px;
`;

export const MealButtonFalse = styled.button`
  width: 68px;
  padding: 5px;
  margin-bottom: 5px;
  ${body2};
  color: ${EColor.TEXT_200};
  background-color: ${EColor.COLOR_PRIMARY_SUB2};
  border: none;
  border-radius: 8px;
`;

export const Callout = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 12px 16px;
  background-color: #f0f4ff;
  color: #1f3f71;
  border-radius: 12px;
  font-size: 20px;
  line-height: 1.4;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const GradientText = styled.span`
  font-weight: 700;
  background: linear-gradient(to right, #1f9edd, #a4b6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;