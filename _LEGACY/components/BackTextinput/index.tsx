import SvgIcon from "@components/SvgIcon";
import { Container, StyledInput } from "./BackTextinput.styles";
import { EColor } from "@styles/color";

type BackTextInputComponentProps = {
  placeHolder: string;
  getter: string
  setter: () => void;
}

const BackTextInput = ({ placeHolder, getter, setter }: BackTextInputComponentProps) => {
  return (
    <Container>
      <SvgIcon name={'search'} width={20} height={20} fill={EColor.TEXT_600} />
      <StyledInput type="text" placeholder={placeHolder} value={getter} onChange={(e) => setter(e.target.value)} />
    </Container>
  );
};

export default BackTextInput;