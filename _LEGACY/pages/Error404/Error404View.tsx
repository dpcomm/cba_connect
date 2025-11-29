import SvgIcon from "@components/SvgIcon";
import { Body, Container, TitleSubText, TitleText } from "./styles";

const Error404View = () => {
  return (
    <Container>
      <SvgIcon name={"cba_logo"} width={188} height={188} fill={""} />
      <TitleText>CBA Connect</TitleText>
      <TitleSubText>수련회 등록관리 서비스</TitleSubText>
      <Body>404 Not Found<br/>페이지를 찾을 수 없습니다.</Body>
    </Container>
  );
};

export default Error404View;